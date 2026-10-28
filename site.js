

(() => {
  const DOWNLOAD_URL = 'https://github.com/TheGuyV/tekkentag/releases/latest/download/TTTOnline.zip';
  const root = document.documentElement;

  const els = [...document.querySelectorAll('[data-en]')];
  els.forEach(e => { e.dataset.ko = e.innerHTML; });
  const btn = document.getElementById('lang');
  function setLang(l) {
    els.forEach(e => { e.innerHTML = l === 'en' ? e.dataset.en : e.dataset.ko; });
    root.lang = l;
    btn.textContent = l === 'en' ? '한국어' : 'English';
    const bt = document.body.dataset;
    document.title = l === 'en' ? (bt.titleEn || 'Tekken Tag Tournament Online - rollback netcode') : (bt.titleKo || '철권 태그 토너먼트 온라인 · 롤백 넷코드');
    document.dispatchEvent(new CustomEvent('ttt-lang', { detail: l }));
    try { localStorage.setItem('ttt-lang', l); } catch (e) { }
  }
  let saved = null;
  try { saved = localStorage.getItem('ttt-lang'); } catch (e) { }
  const first = saved || ((navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en');
  if (first === 'en') setLang('en');
  btn.addEventListener('click', () => setLang(root.lang === 'en' ? 'ko' : 'en'));

  document.querySelectorAll('.dlbtn').forEach(dl => {
    if (DOWNLOAD_URL) dl.href = DOWNLOAD_URL;
    else dl.addEventListener('click', ev => {
      ev.preventDefault();
      const n = document.getElementById('dlnote'); if (n) { n.hidden = false; n.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  });
})();
