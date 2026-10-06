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

  // Job/project pages on wide screens: photos fill the right-hand column and, once the
  // write-up ends, the space under the text too. Each photo goes to whichever column is
  // shorter, so both columns finish at about the same height. Phones: all photos below.
  const detail = document.querySelector<HTMLElement>('.detail.has-media');
  if (detail) {
    const side = detail.querySelector<HTMLElement>('.side-media .photos')!;
    const over = detail.querySelector<HTMLElement>('.overflow-media')!;
    const overGrid = over.querySelector<HTMLElement>('.photos')!;
    const textCol = detail.querySelector<HTMLElement>('.prose')!;
    const figs = [...side.children] as HTMLElement[];
    const wide = matchMedia('(min-width: 1100px)');
    let queued = false;
    const layout = () => {
      queued = false;
      if (!alive) return;
      if (!wide.matches) { figs.forEach((f) => side.appendChild(f)); over.hidden = true; return; }
      figs.forEach((f) => f.remove());
      over.hidden = false;
      const ends = () => [side.getBoundingClientRect().bottom, textCol.getBoundingClientRect().bottom];
      const gap = () => { const [a, b] = ends(); return Math.abs(a - b); };
      // Two simple placement rules; run both and keep whichever leaves the columns more even.
      const shorterColumn = () => figs.forEach((f, i) => { const [a, b] = ends(); (i === 0 || a <= b ? side : overGrid).appendChild(f); });
      const mostEven = () => figs.forEach((f, i) => {
        side.appendChild(f); if (i === 0) return;
        const beside = Math.max(...ends()); overGrid.appendChild(f);
        if (Math.max(...ends()) >= beside) side.appendChild(f);
      });
      shorterColumn(); const first = gap(); const pick = figs.map((f) => f.parentElement);
      figs.forEach((f) => f.remove()); mostEven();
      if (gap() > first) figs.forEach((f, i) => pick[i]!.appendChild(f));
      over.hidden = overGrid.children.length === 0;
    };
    const relayout = () => { if (!queued) { queued = true; requestAnimationFrame(layout); } };
    layout();
    addEventListener('resize', relayout, on);
    wide.addEventListener('change', relayout, on);
    document.fonts?.ready.then(relayout);
    detail.querySelectorAll('img').forEach((im) => { if (!im.complete) im.addEventListener('load', relayout, { once: true }); });
    detail.querySelectorAll('video').forEach((v) => v.addEventListener('loadedmetadata', relayout, { once: true }));
  }

  // photo lightbox (Photography page)
  const box = document.getElementById('lightbox') as HTMLDialogElement | null;
  if (box) {
    const img = box.querySelector('img')!, cap = box.querySelector('p')!;
    const largest = (el: HTMLImageElement) => {
      const best = (el.srcset || '').split(',').map((s) => s.trim().split(/\s+/)).filter((x) => x[0])
        .sort((a, b) => parseInt(b[1] || '0') - parseInt(a[1] || '0'))[0];
      return best?.[0] || el.currentSrc || el.src;
    };
    // Show the small version you clicked right away (already loaded, so no flash of the previous photo),
    // then swap in the full-size version once it has finished loading.
    let token = 0;
    const open = (el: HTMLImageElement, caption: string) => {
      const mine = ++token;
      img.src = el.currentSrc || el.src; img.alt = el.alt; cap.textContent = caption;
      box.showModal();
      const full = new Image();
      full.onload = () => { if (mine === token && box.open) img.src = full.src; };
      full.src = largest(el);
    };
    // start fetching the full-size version as soon as the pointer is over a photo
    const warm = (el: HTMLImageElement) => { if (!el.dataset.warm) { el.dataset.warm = '1'; new Image().src = largest(el); } };
    document.querySelectorAll<HTMLElement>('.photos figure:not(.video)').forEach((fig) => fig.addEventListener('pointerenter', () => warm(fig.querySelector('img')!)));
    document.querySelectorAll<HTMLElement>('.photos figure:not(.video)').forEach((fig) => fig.addEventListener('click', () =>
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
