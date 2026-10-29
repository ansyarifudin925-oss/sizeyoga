(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gate = document.getElementById('sz-gate');
  if (gate) {
    if (reduced) gate.classList.add('sz-gate--off');
    else setTimeout(() => gate.classList.add('sz-gate--off'), 1500);
  }
  const hdr = document.getElementById('sz-hdr');
  const onScroll = () => hdr && hdr.classList.toggle('sz-hdr--fix', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const btn = document.getElementById('sz-menu-btn');
  const sheet = document.getElementById('sz-sheet');
  const close = () => {
    if (!btn || !sheet) return;
    btn.classList.remove('sz-menu-btn--x');
    btn.setAttribute('aria-expanded','false');
    sheet.classList.remove('sz-sheet--on');
    sheet.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('no-scroll');
    hdr && hdr.classList.remove('sz-hdr--menu');
  };
  const open = () => {
    btn.classList.add('sz-menu-btn--x');
    btn.setAttribute('aria-expanded','true');
    sheet.classList.add('sz-sheet--on');
    sheet.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('no-scroll');
    hdr && hdr.classList.add('sz-hdr--menu');
  };
  if (btn && sheet) {
    btn.addEventListener('click', () => sheet.classList.contains('sz-sheet--on') ? close() : open());
    sheet.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    addEventListener('keydown', e => e.key === 'Escape' && close());
  }
  const rises = document.querySelectorAll('.sz-rise');
  if (rises.length && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('sz-rise--on'); io.unobserve(e.target); }
    }), { threshold: 0.1 });
    rises.forEach(el => io.observe(el));
  } else rises.forEach(el => el.classList.add('sz-rise--on'));

  const form = document.getElementById('sz-form');
  const ok = document.getElementById('sz-ok');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.querySelectorAll('.sz-fld--bad').forEach(x => x.classList.remove('sz-fld--bad'));
      const n = form.querySelector('[name=name]');
      const m = form.querySelector('[name=email]');
      const pl = form.querySelector('[name=plan]');
      let good = true;
      if (!n.value.trim()) { n.closest('.sz-fld').classList.add('sz-fld--bad'); n.nextElementSibling.textContent='お名前を入力してください'; good=false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.value.trim())) { m.closest('.sz-fld').classList.add('sz-fld--bad'); m.nextElementSibling.textContent='メールを確認してください'; good=false; }
      if (!pl.value) { pl.closest('.sz-fld').classList.add('sz-fld--bad'); pl.nextElementSibling.textContent='プランを選択してください'; good=false; }
      if (!good) return;
      form.closest('.sz-form').classList.add('sz-form--done');
      ok.classList.add('sz-ok--show');
      ok.focus();
    });
  }
})();
