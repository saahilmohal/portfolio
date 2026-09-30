// Rolling Hills hero: layered ranges drifting at different speeds, with the sun
// sitting behind the far ridges so its glow peeks through the gaps between peaks.
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
    const base = H * 0.5 + Math.pow(f, 1.2) * H * 0.4;
    // far ranges are tall and peaky, near ones broad and rolling
    const amp = (H * (0.2 - f * 0.05)) * (1 + 0.18 * Math.sin(t * 0.00028 + i * 1.3));
    const sp = 0.00009 * (1 + i * 0.6), fr = 2.1 - f * 1.1;
    const a = Math.sin(nx * fr * TAU + t * sp + i * 1.7);
    const peak = 1 - Math.abs(Math.sin(nx * fr * 1.6 * TAU - t * sp * 0.7 + i * 0.9)); // sharp crests
    const detail = Math.sin(nx * fr * 5.3 * TAU + t * sp * 1.3 + i * 2.3);
    return base - amp * (0.55 * a + (0.5 - f * 0.2) * peak + 0.08 * detail);
  };
  const draw = (t: number) => {
    const sky = g.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#0c0a09'); sky.addColorStop(0.28, '#1c100b'); sky.addColorStop(0.46, '#46190c'); sky.addColorStop(0.62, '#200e09'); sky.addColorStop(1, '#0c0a09');
    g.fillStyle = sky; g.fillRect(0, 0, W, H);
    const sx = W * 0.63, sy = H * 0.43, R = Math.max(W, H);
    const glow = g.createRadialGradient(sx, sy, 0, sx, sy, R * 0.6);
    glow.addColorStop(0, 'rgba(255,214,140,1)'); glow.addColorStop(0.035, 'rgba(255,170,90,.9)'); glow.addColorStop(0.09, 'rgba(255,110,60,.5)');
    glow.addColorStop(0.3, 'rgba(150,45,25,.18)'); glow.addColorStop(1, 'rgba(12,10,9,0)');
    g.fillStyle = glow; g.fillRect(0, 0, W, H);
    const dx = 5;
    for (let i = 0; i < LAYERS; i++) {
      const f = i / (LAYERS - 1);
      const ys: number[] = [];
      for (let x = -dx; x <= W + dx; x += dx) ys.push(ridge(i, x, t));
      const path = (off: number) => { g.beginPath(); ys.forEach((y, j) => (j ? g.lineTo(-dx + j * dx, y + off) : g.moveTo(-dx, y + off))); };
      path(0); g.lineTo(W + dx, H + 10); g.lineTo(-dx, H + 10); g.closePath();
      const hz = 40 - f * 28;
      g.fillStyle = `rgb(${Math.round(hz + 10)},${Math.round(hz * 0.52)},${Math.round(hz * 0.42)})`; g.fill();
      // rim light: ridges nearest the sun catch the most light
      for (let k = 0; k < 6; k++) {
        const off = k * (6 + f * 12);
        const alpha = (k === 0 ? 0.8 : 0.26) * (1 - k / 7) * (1 - f * 0.45);
        const grad = g.createLinearGradient(0, 0, W, 0);
        const hot = `rgba(255,${Math.round(170 + (1 - f) * 50)},${Math.round(110 + (1 - f) * 30)},${Math.min(1, alpha * 1.6).toFixed(3)})`;
        const cool = `rgba(255,120,70,${(alpha * 0.45).toFixed(3)})`;
        grad.addColorStop(0, cool); grad.addColorStop(Math.max(0, sx / W - 0.25), cool);
        grad.addColorStop(sx / W, hot); grad.addColorStop(Math.min(1, sx / W + 0.25), cool); grad.addColorStop(1, cool);
        path(off); g.strokeStyle = grad; g.lineWidth = k === 0 ? 1.5 : 1; g.stroke();
      }
    }
  };
  return { resize, draw };
}
