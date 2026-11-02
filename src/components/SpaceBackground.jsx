import { useEffect, useRef } from 'react';

/**
 * SpaceBackground
 * Canvas-based animated space background with:
 *  - Twinkling stars (multiple size layers)
 *  - Shooting stars / meteors
 *  - Subtle nebula blobs (painted once, very low opacity)
 *  - Solar system color palette: deep navy → black
 */
const SpaceBackground = () => {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* ── resize ─────────────────────────────────────────────────────────── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── helpers ─────────────────────────────────────────────────────────── */
    const rand   = (min, max) => Math.random() * (max - min) + min;
    const randInt = (min, max) => Math.floor(rand(min, max));

    /* ── Stars ───────────────────────────────────────────────────────────── */
    const STAR_COUNT = 320;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:       rand(0, 1),          // stored as 0-1 ratio so resize works
      y:       rand(0, 1),
      r:       rand(0.3, 1.8),
      alpha:   rand(0.3, 1),
      speed:   rand(0.0003, 0.0012), // twinkle speed
      phase:   rand(0, Math.PI * 2),
      // colour: mostly white/blue, few gold/orange
      hue:     Math.random() < 0.85
               ? randInt(190, 240)   // blue-white
               : randInt(35, 50),    // warm gold
    }));

    /* ── Shooting stars ──────────────────────────────────────────────────── */
    class ShootingStar {
      constructor() { this.reset(true); }

      reset(firstTime = false) {
        this.x     = rand(0.05, 0.95) * canvas.width;
        this.y     = firstTime ? rand(0, 0.5) * canvas.height : rand(0, 0.3) * canvas.height;
        this.len   = rand(120, 260);
        this.angle = rand(Math.PI * 0.18, Math.PI * 0.32);  // ~30-60 deg downward
        this.speed = rand(6, 14);
        this.alpha = 0;
        this.fade  = 'in';
        this.life  = 0;
        this.maxLife = rand(40, 90);  // frames
        this.vx    = Math.cos(this.angle) * this.speed;
        this.vy    = Math.sin(this.angle) * this.speed;
        // colour: white core with blue or gold tint
        this.color = Math.random() < 0.7 ? '180,220,255' : '255,230,160';
      }

      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;

        if (this.fade === 'in') {
          this.alpha = Math.min(1, this.alpha + 0.08);
          if (this.alpha >= 1) this.fade = 'hold';
        }
        if (this.fade === 'hold' && this.life > this.maxLife * 0.6) {
          this.fade = 'out';
        }
        if (this.fade === 'out') {
          this.alpha = Math.max(0, this.alpha - 0.05);
        }
        if (this.alpha <= 0 && this.fade === 'out') this.reset();
      }

      draw(ctx) {
        const tail = {
          x: this.x - Math.cos(this.angle) * this.len,
          y: this.y - Math.sin(this.angle) * this.len,
        };
        const grad = ctx.createLinearGradient(tail.x, tail.y, this.x, this.y);
        grad.addColorStop(0, `rgba(${this.color}, 0)`);
        grad.addColorStop(0.7, `rgba(${this.color}, ${this.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${this.color}, ${this.alpha})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = rand(1, 2.2);
        ctx.lineCap     = 'round';
        ctx.stroke();

        // bright head dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
        ctx.restore();
      }
    }

    // 4 shooting stars, staggered starts
    const shooters = Array.from({ length: 4 }, (_, i) => {
      const s = new ShootingStar();
      s.life = randInt(0, s.maxLife);  // stagger
      return s;
    });

    /* ── Nebula blobs (painted once onto offscreen canvas) ─────────────── */
    const nebula = document.createElement('canvas');
    const nc     = nebula.getContext('2d');
    nebula.width  = 1200;
    nebula.height = 900;

    const blobs = [
      { x: 0.15, y: 0.2,  r: 260, color: '30,80,160',  a: 0.06 },
      { x: 0.8,  y: 0.15, r: 200, color: '60,20,120',  a: 0.05 },
      { x: 0.5,  y: 0.7,  r: 180, color: '10,60,130',  a: 0.04 },
      { x: 0.9,  y: 0.75, r: 150, color: '80,40,10',   a: 0.03 },
    ];
    blobs.forEach(b => {
      const g = nc.createRadialGradient(
        b.x * nebula.width, b.y * nebula.height, 0,
        b.x * nebula.width, b.y * nebula.height, b.r,
      );
      g.addColorStop(0,   `rgba(${b.color},${b.a})`);
      g.addColorStop(1,   `rgba(${b.color},0)`);
      nc.fillStyle = g;
      nc.beginPath();
      nc.arc(b.x * nebula.width, b.y * nebula.height, b.r, 0, Math.PI * 2);
      nc.fill();
    });

    /* ── render loop ─────────────────────────────────────────────────────── */
    let t = 0;
    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      t++;

      // Deep space background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0,   '#000510');
      bg.addColorStop(0.5, '#020b1a');
      bg.addColorStop(1,   '#000000');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Nebula
      ctx.drawImage(nebula, 0, 0, W, H);

      // Stars
      stars.forEach(s => {
        const twinkle = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.speed * 60 + s.phase));
        ctx.save();
        ctx.globalAlpha = s.alpha * twinkle;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        // small glow for brighter stars
        if (s.r > 1.2) {
          const glow = ctx.createRadialGradient(s.x * W, s.y * H, 0, s.x * W, s.y * H, s.r * 3);
          glow.addColorStop(0, `hsla(${s.hue},80%,90%,0.6)`);
          glow.addColorStop(1, `hsla(${s.hue},80%,90%,0)`);
          ctx.fillStyle = glow;
          ctx.arc(s.x * W, s.y * H, s.r * 3, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `hsl(${s.hue},60%,92%)`;
        }
        ctx.fill();
        ctx.restore();
      });

      // Shooting stars
      shooters.forEach(s => { s.update(); s.draw(ctx); });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
};

export default SpaceBackground;

