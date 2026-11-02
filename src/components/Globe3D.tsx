import { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useLanguage } from '../contexts/LanguageContext';

// GeoJSON types
interface GeoJSONFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

interface GeoJSON {
  type: string;
  features: GeoJSONFeature[];
}

interface LabelData {
  x: number;
  y: number;
  visible: boolean;
  opacity: number;
}

// ── Palette (all synced to SpaceBackground + site theme) ──────────────────
const COLORS = {
  sphereBase:       '#050f20',
  sphereOpacity:    0.82,
  wireframe:        '#1a4a8a',
  wireframeOpacity: 0.18,
  borders:          '#1e6fbf',
  bordersOpacity:   0.7,
  atmoInner:        '#0d47a1',
  atmoInnerOpacity: 0.08,
  atmoOuter:        '#1565c0',
  atmoOuterOpacity: 0.05,
  atmoRim:          '#00b8d9',
  atmoRimOpacity:   0.04,
  arcBrPt:  '#00d4ff',
  arcBrUs:  '#2979ff',
  arcPtUs:  '#00e5ff',
  ptSaoPaulo: '#00d4ff',
  ptLisbon:   '#00e5ff',
  ptOrlando:  '#2979ff',
  cardPortugal: '#00e5ff',
  cardUSA:      '#2979ff',
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments = 80,
  height = 0.45
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t     = i / segments;
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    const elev  = Math.sin(t * Math.PI) * height;
    point.normalize().multiplyScalar(start.length() + elev);
    points.push(point);
  }
  return points;
}

function ringToPoints(ring: number[][], radius: number): THREE.Vector3[] {
  return ring.map(([lng, lat]) => latLngToVector3(lat, lng, radius));
}

// ── Country borders ───────────────────────────────────────────────────────
const CountryBorders = ({ geoData, radius }: { geoData: GeoJSON; radius: number }) => {
  const linesObject = useMemo(() => {
    const group    = new THREE.Group();
    const material = new THREE.LineBasicMaterial({
      color:       new THREE.Color(COLORS.borders),
      transparent: true,
      opacity:     COLORS.bordersOpacity,
    });

    geoData.features.forEach((feature) => {
      const { type, coordinates } = feature.geometry;
      const processRing = (ring: number[][]) => {
        const pts = ringToPoints(ring, radius);
        if (pts.length < 2) return;
        const geo  = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(geo, material);
        group.add(line);
      };
      if (type === 'Polygon') {
        (coordinates as number[][][]).forEach(processRing);
      } else if (type === 'MultiPolygon') {
        (coordinates as number[][][][]).forEach((polygon) =>
          polygon.forEach(processRing)
        );
      }
    });
    return group;
  }, [geoData, radius]);

  return <primitive object={linesObject} />;
};

// ── Animated arc with flowing dash ───────────────────────────────────────
const FlowingArc = ({
  points,
  color,
  speed = 1,
}: {
  points: THREE.Vector3[];
  color: string;
  speed?: number;
}) => {
  const geo = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const mat = useMemo(
    () => new THREE.LineDashedMaterial({
      color,
      transparent: true,
      opacity:     0.9,
      linewidth:   1,
      dashSize:    0.12,
      gapSize:     0.08,
      depthTest:   true,
      depthWrite:  false,
    }),
    [color]
  );

  // Memoize the Line object itself — never recreate it on re-render.
  // Creating a new THREE.Line every frame (inside return) meant renderOrder
  // and computeLineDistances were applied to a throwaway object, not the
  // one actually in the scene, causing arcs to flicker through the globe.
  const line = useMemo(() => {
    const l = new THREE.Line(geo, mat);
    l.computeLineDistances();
    l.renderOrder = 2;
    return l;
  }, [geo, mat]);

  useFrame((state) => {
    (mat as any).dashOffset = -state.clock.elapsedTime * speed * 0.5;
  });

  return <primitive object={line} />;
};

// ── Glowing city dot ─────────────────────────────────────────────────────
const GlowPoint = ({
  position,
  color,
  size = 0.035,
}: {
  position: THREE.Vector3;
  color: string;
  size?: number;
}) => {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (innerRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
      innerRef.current.scale.setScalar(s);
    }
    if (outerRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5 + 1) * 0.35;
      outerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={position}>
      <mesh renderOrder={3}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} depthTest={true} />
      </mesh>
      <mesh ref={innerRef} renderOrder={3}>
        <sphereGeometry args={[size * 2.5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} depthTest={true} depthWrite={false} />
      </mesh>
      <mesh ref={outerRef} renderOrder={3}>
        <sphereGeometry args={[size * 5, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} depthTest={true} depthWrite={false} />
      </mesh>
    </group>
  );
};

// ── Label tracker (projects 3D → 2D screen) ───────────────────────────────
const LabelTracker = ({
  groupRef,
  positions,
  onUpdate,
}: {
  groupRef: React.RefObject<THREE.Group>;
  positions: Record<string, THREE.Vector3>;
  onUpdate: (data: Record<string, LabelData>) => void;
}) => {
  const { size } = useThree();

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    const result: Record<string, LabelData> = {};

    for (const [key, localPos] of Object.entries(positions)) {
      const worldPos = localPos.clone().applyMatrix4(groupRef.current.matrixWorld);
      const toCam    = camera.position.clone().sub(worldPos).normalize();
      const normal   = worldPos.clone().normalize();
      const dot      = normal.dot(toCam);
      const proj     = worldPos.clone().project(camera);
      result[key] = {
        x:       ((proj.x + 1) / 2) * size.width,
        y:       ((1 - proj.y) / 2) * size.height,
        visible: dot > 0.25,
        opacity: Math.max(0, Math.min(1, (dot - 0.25) / 0.25)),
      };
    }
    onUpdate(result);
  });

  return null;
};

// ── Globe scene ───────────────────────────────────────────────────────────
const GlobeScene = ({
  geoData,
  onLabelsUpdate,
}: {
  geoData: GeoJSON;
  onLabelsUpdate: (data: Record<string, LabelData>) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;
  const R = isMobile ? 1.4 : 1.75;

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.0018;
  });

  const espirito = useMemo(() => latLngToVector3(-20.3, -40.3, R), [R]);
  const lisbon   = useMemo(() => latLngToVector3(38.7,  -9.1,  R), [R]);
  const orlando  = useMemo(() => latLngToVector3(28.5, -81.4,  R), [R]);

  const arcBrPt = useMemo(() => createArc(espirito, lisbon,   80, 0.55), [espirito, lisbon]);
  const arcBrUs = useMemo(() => createArc(espirito, orlando,  80, 0.50), [espirito, orlando]);
  const arcPtUs = useMemo(() => createArc(lisbon,   orlando,  80, 0.45), [lisbon,   orlando]);

  const labelPositions = useMemo(
    () => ({ portugal: lisbon, usa: orlando }),
    [lisbon, orlando]
  );

  return (
    <group ref={groupRef}>
      {/* Rim glow */}
      <mesh>
        <sphereGeometry args={[R * 1.22, 64, 64]} />
        <meshBasicMaterial color={COLORS.atmoRim} transparent opacity={COLORS.atmoRimOpacity} side={THREE.BackSide} />
      </mesh>

      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[R * 1.14, 64, 64]} />
        <meshBasicMaterial color={COLORS.atmoOuter} transparent opacity={COLORS.atmoOuterOpacity} side={THREE.BackSide} />
      </mesh>

      {/* Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[R * 1.06, 64, 64]} />
        <meshBasicMaterial color={COLORS.atmoInner} transparent opacity={COLORS.atmoInnerOpacity} side={THREE.BackSide} />
      </mesh>

      {/* Depth mask — invisible sphere that writes to the depth buffer so
          arcs behind the globe are properly occluded. transparent materials
          disable depthWrite by default in Three.js, causing arcs to bleed
          through. This hidden sphere fixes that. */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[R * 0.994, 64, 64]} />
        <meshBasicMaterial colorWrite={false} depthWrite={true} side={THREE.FrontSide} />
      </mesh>

      {/* Globe body — deep navy */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[R * 0.995, 64, 64]} />
        <meshStandardMaterial
          color={COLORS.sphereBase}
          transparent
          opacity={COLORS.sphereOpacity}
          roughness={0.75}
          metalness={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Wireframe grid */}
      <mesh>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color={COLORS.wireframe} wireframe transparent opacity={COLORS.wireframeOpacity} />
      </mesh>

      {/* Country borders */}
      <CountryBorders geoData={geoData} radius={R * 1.001} />

      {/* Connection arcs */}
      <FlowingArc points={arcBrPt} color={COLORS.arcBrPt} speed={1.2} />
      <FlowingArc points={arcBrUs} color={COLORS.arcBrUs} speed={1.0} />
      <FlowingArc points={arcPtUs} color={COLORS.arcPtUs} speed={0.9} />

      {/* City glow points */}
      <GlowPoint position={espirito} color={COLORS.ptSaoPaulo} size={0.038} />
      <GlowPoint position={lisbon}   color={COLORS.ptLisbon}   size={0.038} />
      <GlowPoint position={orlando}  color={COLORS.ptOrlando}  size={0.038} />

      {/* Label tracker */}
      <LabelTracker groupRef={groupRef} positions={labelPositions} onUpdate={onLabelsUpdate} />
    </group>
  );
};

// ── HTML overlay card ─────────────────────────────────────────────────────
const CompanyCard = ({
  label,
  company,
  subtitle,
  accentColor,
  x,
  y,
  xOffset = 0,
  glowIntensity = 1,
  opacity,
  visible,
}: {
  label: string;
  company: string;
  subtitle?: string;
  accentColor: string;
  x: number;
  y: number;
  xOffset?: number;
  glowIntensity?: number;
  opacity: number;
  visible: boolean;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    } else {
      setMounted(false);
    }
  }, [visible]);

  if (!visible && opacity < 0.01) return null;

  return (
    <div
      style={{
        position:      'absolute',
        left:          x + xOffset,
        top:           y,
        transform:     'translate(-50%, -175%)',
        opacity:       opacity * (mounted ? 1 : 0),
        transition:    'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex:        9999,
      }}
    >
      {/* Connector line */}
      <div
        style={{
          position:  'absolute',
          bottom:    -18,
          top:       'auto',
          left:      '50%',
          transform: 'translateX(-50%)',
          width:     1.5,
          height:    18,
          background: `linear-gradient(to bottom, ${accentColor}99, ${accentColor}00)`,
        }}
      />

      {/* Card */}
      <div
        style={{
          background:           'rgba(2, 8, 22, 0.88)',
          backdropFilter:       'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border:               `1px solid ${accentColor}44`,
          borderRadius:         10,
          padding:              '10px 16px',
          minWidth:             170,
          boxShadow:            glowIntensity > 1
            ? `0 4px 32px rgba(0,0,0,0.6), 0 0 40px ${accentColor}66, 0 0 80px ${accentColor}33, inset 0 1px 0 ${accentColor}88`
            : `0 4px 28px rgba(0,0,0,0.5), 0 0 20px ${accentColor}18, inset 0 1px 0 ${accentColor}33`,
          position:             'relative',
          overflow:             'hidden',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position:     'absolute',
            top:          0,
            left:         0,
            right:        0,
            height:       2,
            background:   `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            borderRadius: '10px 10px 0 0',
          }}
        />

        {/* Country label */}
        <div
          style={{
            fontSize:      9,
            fontWeight:    700,
            letterSpacing: '0.18em',
            color:         accentColor,
            textTransform: 'uppercase',
            marginBottom:  5,
            fontFamily:    "'Courier New', monospace",
          }}
        >
          ◆ {label}
        </div>

        {/* Company name */}
        <div
          style={{
            fontSize:      13,
            fontWeight:    700,
            color:         '#c8e8ff',
            lineHeight:    1.3,
            fontFamily:    "'Segoe UI', system-ui, sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          {company}
        </div>

        {subtitle && (
          <div
            style={{
              fontSize:      9.5,
              color:         'rgba(140,190,255,0.6)',
              marginTop:     3,
              fontFamily:    "'Segoe UI', system-ui, sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Root export ───────────────────────────────────────────────────────────
const Globe3D = () => {
  const [geoData, setGeoData] = useState<GeoJSON>({ type: "FeatureCollection", features: [] });
  const [labels,  setLabels]  = useState<Record<string, LabelData>>({});
  const { t } = useLanguage();



  if (!geoData) return <div style={{ position: 'absolute', inset: 0 }} />;

  const portugal = labels['portugal'];
  const usa      = labels['usa'];

  // Cards are portalled to document.body so they escape every
  // stacking context in the page tree (Hero, sections, etc.)
  const cards = (
    <>
      {portugal && (
        <CompanyCard
          label={t('contact.portugal')}
          company="Nexo Data"
          subtitle={t('companiesPage.NEXO.role')}
          accentColor={COLORS.cardPortugal}
          x={portugal.x}
          y={portugal.y + 130}
          xOffset={0}
          glowIntensity={2.5}
          opacity={portugal.opacity}
          visible={portugal.visible}
        />
      )}
      {usa && (
        <CompanyCard
          label={t('contact.usa')}
          company="Vetor Labs"
          subtitle={t('companiesPage.bf2.role')}
          accentColor={COLORS.cardUSA}
          x={usa.x}
          y={usa.y + 130}
          xOffset={110}
          opacity={usa.opacity}
          visible={usa.visible}
        />
      )}
    </>
  );

  return (
    <>
      {/* Globe canvas — untouched, dark theme preserved */}
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 46 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} color="#0d2a4a" />
          <directionalLight position={[5, 3, 5]}   intensity={0.7}  color="#4fc3f7" />
          <pointLight       position={[-4, -2, -4]} intensity={0.35} color="#0d47a1" />
          <pointLight       position={[0,  4,  2]}  intensity={0.2}  color="#00b8d9" />
          <GlobeScene geoData={geoData} onLabelsUpdate={setLabels} />
        </Canvas>
      </div>

      {/* Portal cards to document.body — completely free from any stacking context */}
      {typeof document !== 'undefined' && createPortal(cards, document.body)}
    </>
  );
};

export default Globe3D;
