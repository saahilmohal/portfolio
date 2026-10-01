// Page behavior: hero animation loop, typed name, "at a glance" highlight, photos, music.
// The site moves between pages without a full reload (so music keeps playing), so
// initPage runs on every page and returns a cleanup that tears the previous page down.
type Scene = { resize: () => void; draw: (t: number) => void };

export function initPage(scene: Scene): () => void {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ac = new AbortController();
  const on = { signal: ac.signal };
  let alive = true;
  const timers: number[] = [];

  // hero animation (pauses when scrolled out of view)
  scene.resize();
  addEventListener('resize', scene.resize, on);
  let visible = true;
  const hero = document.querySelector('.hero');
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  if (hero) io.observe(hero);
  if (reduce) scene.draw(6000);
  else {
    const loop = (t: number) => { if (!alive) return; if (visible) scene.draw(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
  document.fonts?.ready.then(() => { if (!alive) return; scene.resize(); if (reduce) scene.draw(6000); });

  // typed name
  const typed = document.querySelector<HTMLElement>('h1 .typed');
  if (typed && !reduce) {
    const full = typed.dataset.text ?? '';
    let i = 0; typed.textContent = '';
    const tick = () => { if (!alive) return; typed.textContent = full.slice(0, i); if (i++ < full.length) timers.push(window.setTimeout(tick, i === 1 ? 350 : 70 + Math.random() * 70)); };
    tick();
  }

  // at a glance: hovering a line highlights it; otherwise the line nearest mid-screen lights up
  const items = [...document.querySelectorAll<HTMLElement>('.glance li')];
  let hovered = -1;
  const light = (k: number) => items.forEach((li, i) => li.classList.toggle('on', i === k));
  const glance = () => {
    if (hovered >= 0) return;
    const mid = innerHeight / 2;
    let best = 0, bestD = Infinity;
    items.forEach((li, i) => { const r = li.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
    light(best);
  };
  items.forEach((li, i) => li.addEventListener('mouseenter', () => { hovered = i; light(i); }));
  items[0]?.parentElement?.addEventListener('mouseleave', () => { hovered = -1; glance(); });
  if (!reduce && items.length) { addEventListener('scroll', glance, { passive: true, signal: ac.signal }); glance(); }

  // random photo order: shuffle on every visit
  document.querySelectorAll<HTMLElement>('.photos[data-order="random"]').forEach((grid) => {
    const figs = [...grid.children] as HTMLElement[];
    for (let i = figs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [figs[i], figs[j]] = [figs[j], figs[i]]; }
    const limit = +(grid.dataset.limit || 0);
    figs.forEach((f, i) => { f.hidden = !!limit && i >= limit; grid.appendChild(f); });
  });

  // photo lightbox (Photography page)
  const box = document.getElementById('lightbox') as HTMLDialogElement | null;
  if (box) {
    const img = box.querySelector('img')!, cap = box.querySelector('p')!;
    const largest = (el: HTMLImageElement) => {
      const best = (el.srcset || '').split(',').map((s) => s.trim().split(/\s+/)).filter((x) => x[0])
        .sort((a, b) => parseInt(b[1] || '0') - parseInt(a[1] || '0'))[0];
      return best?.[0] || el.currentSrc || el.src;
    };
    const open = (el: HTMLImageElement, caption: string) => { img.src = largest(el); img.alt = el.alt; cap.textContent = caption; box.showModal(); };
    document.querySelectorAll<HTMLElement>('.photos figure').forEach((fig) => fig.addEventListener('click', () =>
      open(fig.querySelector('img')!, fig.querySelector('figcaption')?.textContent ?? '')));
    document.querySelectorAll<HTMLImageElement>('.prose img').forEach((el) => el.addEventListener('click', () => open(el, el.alt)));
    box.addEventListener('click', () => box.close());
  }

  return () => { alive = false; ac.abort(); io.disconnect(); timers.forEach(clearTimeout); };
}

// Music button: set up once. The button is kept across page changes, so the audio keeps playing.
export function initMusic() {
  const btn = document.getElementById('music') as HTMLButtonElement | null;
  if (!btn || btn.dataset.ready) return;
  btn.dataset.ready = '1';
  const lbl = btn.querySelector('.lbl')!;
  const idle = lbl.textContent;
  let audio: HTMLAudioElement | null = null;
  let yt: HTMLDivElement | null = null;
  btn.addEventListener('click', () => {
    const playing = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(playing));
    lbl.textContent = playing ? 'Playing · tap to stop' : idle;
    if (btn.dataset.file) {
      audio ??= Object.assign(new Audio(btn.dataset.file), { loop: true, volume: 0.35 });
      playing ? audio.play().catch(() => {}) : audio.pause();
    } else if (btn.dataset.youtube) {
      if (playing) {
        yt = document.createElement('div'); yt.className = 'yt';
        yt.setAttribute('data-astro-transition-persist', 'music-yt');
        yt.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${btn.dataset.youtube}?autoplay=1&loop=1&playlist=${btn.dataset.youtube}" title="Background music" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        document.body.appendChild(yt);
      } else { yt?.remove(); yt = null; }
    }
  });
}
