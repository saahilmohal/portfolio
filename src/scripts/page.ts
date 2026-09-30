// Page behavior: hero animation loop, typed name, "at a glance" highlight, music button.
type Scene = { resize: () => void; draw: (t: number) => void };

export function initPage(scene: Scene) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // hero animation (pauses when scrolled out of view)
  scene.resize();
  addEventListener('resize', scene.resize);
  let visible = true;
  const hero = document.querySelector('.hero')!;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);
  if (reduce) scene.draw(6000);
  else {
    const loop = (t: number) => { if (visible) scene.draw(t); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  }
  document.fonts?.ready.then(() => { scene.resize(); if (reduce) scene.draw(6000); });

  // typed name
  const typed = document.querySelector<HTMLElement>('h1 .typed');
  if (typed && !reduce) {
    const full = typed.dataset.text ?? '';
    let i = 0; typed.textContent = '';
    const tick = () => { typed.textContent = full.slice(0, i); if (i++ < full.length) setTimeout(tick, i === 1 ? 350 : 70 + Math.random() * 70); };
    tick();
  }

  // at a glance: the line closest to the middle of the screen lights up
  const items = [...document.querySelectorAll<HTMLElement>('.glance li')];
  // hovering a line highlights that one; otherwise the highlight follows scroll
  let hovered = -1;
  const light = (k: number) => items.forEach((li, i) => li.classList.toggle('on', i === k));
  items.forEach((li, i) => li.addEventListener('mouseenter', () => { hovered = i; light(i); }));
  items[0]?.parentElement?.addEventListener('mouseleave', () => { hovered = -1; glance(); });
  const glance = () => {
    if (hovered >= 0) return;
    const mid = innerHeight / 2;
    let best = 0, bestD = Infinity;
    items.forEach((li, i) => { const r = li.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
    light(best);
  };
  if (!reduce && items.length) { addEventListener('scroll', glance, { passive: true }); glance(); }

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
    document.querySelectorAll<HTMLElement>('.photos figure').forEach((fig) => fig.addEventListener('click', () => {
      const src = fig.querySelector('img')!;
      img.src = src.currentSrc || src.src; img.alt = src.alt; cap.textContent = fig.querySelector('figcaption')?.textContent ?? '';
      box.showModal();
    }));
    box.addEventListener('click', () => box.close());
  }

  // music
  const btn = document.getElementById('music') as HTMLButtonElement | null;
  if (!btn) return;
  const lbl = btn.querySelector('.lbl')!;
  const idle = lbl.textContent;
  let audio: HTMLAudioElement | null = null;
  let yt: HTMLDivElement | null = null;
  btn.addEventListener('click', () => {
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    lbl.textContent = on ? 'Playing · tap to stop' : idle;
    if (btn.dataset.file) {
      audio ??= Object.assign(new Audio(btn.dataset.file), { loop: true, volume: 0.35 });
      on ? audio.play().catch(() => {}) : audio.pause();
    } else if (btn.dataset.youtube) {
      if (on) {
        yt = document.createElement('div'); yt.className = 'yt';
        yt.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${btn.dataset.youtube}?autoplay=1&loop=1&playlist=${btn.dataset.youtube}" title="Background music" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        document.body.appendChild(yt);
      } else { yt?.remove(); yt = null; }
    }
  });
}
