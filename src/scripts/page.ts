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
  const glance = () => {
    const mid = innerHeight / 2;
    let best = 0, bestD = Infinity;
    items.forEach((li, i) => { const r = li.getBoundingClientRect(); const d = Math.abs(r.top + r.height / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
    items.forEach((li, i) => li.classList.toggle('on', i === best));
  };
  if (!reduce && items.length) { addEventListener('scroll', glance, { passive: true }); glance(); }

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
