// Rolling Hills hero: layered hills drifting at different speeds, each carrying
// contour "wave" lines, with a sunrise glow behind. The back range has taller peaks.
export function hills(canvas: HTMLCanvasElement) {
  const g = canvas.getContext('2d')!;
  const TAU = Math.PI * 2, LAYERS = 7;
  let W = 0, H = 0, dpr = 1;
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const ridge = (i: number, x: number, t: number) => {
    const f = i / (LAYERS - 1), nx = x / W;
    const base = H * 0.44 + Math.pow(f, 1.25) * H * 0.46;
    // BACK_PEAK: extra height for the farthest hills (raise to make them taller)
    const BACK_PEAK = 0.075;
    const amp = (H * 0.035 + f * H * 0.17 + H * BACK_PEAK * Math.pow(1 - f, 3)) * (1 + 0.22 * Math.sin(t * 0.00032 + i * 1.3));
    const sp = 0.00011 * (1 + i * 0.55), fr = 1.5 - f * 0.55;
    return base - amp * (0.62 * Math.sin(nx * fr * TAU + t * sp + i * 1.7)
                       + 0.28 * Math.sin(nx * fr * 2.3 * TAU - t * sp * 0.6 + i * 0.9)
                       + 0.10 * Math.sin(nx * fr * 5.1 * TAU + t * sp * 1.4 + i * 2.3));
  };
  const draw = (t: number) => {
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0c0a09'); sky.addColorStop(0.3, '#1a100c'); sky.addColorStop(0.5, '#40190e'); sky.addColorStop(1, '#0c0a09');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    const sx = W * 0.64, sy = H * 0.47;
    const glow = g.createRadialGradient(sx, sy, 0, sx, sy, Math.max(W, H) * 0.6);
    glow.addColorStop(0, 'rgba(255,200,110,.95)'); glow.addColorStop(0.06, 'rgba(255,120,64,.6)');
    glow.addColorStop(0.3, 'rgba(160,50,30,.2)'); glow.addColorStop(1, 'rgba(12,10,9,0)');
    g.fillStyle = glow; g.fillRect(0, 0, W, H);
    const dx = 6;
    for (let i = 0; i < LAYERS; i++) {
      const f = i / (LAYERS - 1);
      const ys: number[] = [];
      for (let x = -dx; x <= W + dx; x += dx) ys.push(ridge(i, x, t));
      const path = (off: number) => { g.beginPath(); ys.forEach((y, j) => (j ? g.lineTo(-dx + j * dx, y + off) : g.moveTo(-dx, y + off))); };
      path(0); g.lineTo(W + dx, H + 10); g.lineTo(-dx, H + 10); g.closePath();
      const haze = Math.round(38 - f * 26);
      g.fillStyle = `rgb(${haze + 8},${Math.round(haze * 0.55)},${Math.round(haze * 0.45)})`; g.fill();
      for (let k = 0; k < 6; k++) {
        const off = k * (7 + f * 12);
        const a = (k === 0 ? 0.75 : 0.28) * (1 - k / 7) * (1 - f * 0.45);
        path(off);
        g.strokeStyle = `rgba(255,${Math.round(150 + (1 - f) * 60)},${Math.round(95 + (1 - f) * 40)},${a.toFixed(3)})`;
        g.lineWidth = k === 0 ? 1.4 : 1; g.stroke();
      }
    }
  };
  return { resize, draw };
}
