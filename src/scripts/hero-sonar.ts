// Sonar hero: a halftone dot "swell" with a sonar ping. Dots thin out behind the text.
export function sonar(canvas: HTMLCanvasElement) {
  const g = canvas.getContext('2d')!;
  const TAU = Math.PI * 2;
  let W = 0, H = 0, dpr = 1;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (t: number) => {
    g.fillStyle = '#080808'; g.fillRect(0, 0, W, H);
    const step = W < 600 ? 9 : 11;
    const px = W * 0.74, py = H * 0.4, maxR = Math.max(W, H) * 0.9;
    const pr = ((t % 5200) / 5200) * maxR;
    for (let y = step / 2; y < H; y += step) {
      for (let x = step / 2; x < W; x += step) {
        const nx = x / W, ny = y / H;
        let v = Math.sin(nx * 7 + t * 0.00035) * 0.5 + Math.sin(ny * 9 - t * 0.0003 + nx * 3) * 0.35 + Math.sin((nx + ny) * 13 + t * 0.0005) * 0.2;
        v = (v + 1.05) / 2.1;
        v *= 0.35 + 0.65 * Math.min(1, ny * 1.6);
        v *= 1 - 0.8 * Math.exp(-(((nx - 0.12) ** 2) / 0.16 + ((ny - 0.82) ** 2) / 0.1));
        const d = Math.hypot(x - px, y - py);
        const ring = Math.exp(-(((d - pr) / 18) ** 2)) * (1 - pr / maxR);
        const rad = Math.max(0, v * step * 0.42 + ring * 3);
        if (rad < 0.35) continue;
        g.fillStyle = ring > 0.25 ? `rgba(255,176,32,${(0.35 + ring * 0.65).toFixed(3)})` : `rgba(236,235,230,${(0.16 + v * 0.5).toFixed(3)})`;
        g.beginPath(); g.arc(x, y, rad, 0, TAU); g.fill();
      }
    }
    g.fillStyle = '#ffb020'; g.beginPath(); g.arc(px, py, 3, 0, TAU); g.fill();
    g.font = "10px 'Geist Mono', monospace"; g.fillStyle = 'rgba(255,176,32,.85)';
    g.fillText('PING ' + (pr / 100).toFixed(1).padStart(4, ' ') + ' km', px + 10, py - 8);
  };
  return { resize, draw };
}
