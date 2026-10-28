

(() => {
  const KO = ["초보", "9급", "8급", "7급", "6급", "5급", "4급", "3급", "2급", "1급", "초단", "2단", "3단",
    "이니시에이트", "멘토", "엑스퍼트", "그랜드 마스터", "워리어", "빈디케이터", "저거너트", "어서퍼", "뱅퀴셔", "디스트로이어", "세이비어",
    "오버로드", "현무", "백호", "청룡", "주작", "마이티 룰러", "리비어드 룰러", "디바인 룰러", "이터널 룰러", "풍신", "뇌신", "야차", "용신",
    "엠퍼러", "철권왕", "철권신"];
  const EN = ["Beginner", "9th Kyu", "8th Kyu", "7th Kyu", "6th Kyu", "5th Kyu", "4th Kyu", "3rd Kyu", "2nd Kyu", "1st Kyu",
    "1st Dan", "2nd Dan", "3rd Dan", "Initiate", "Mentor", "Expert", "Grand Master", "Warrior", "Vindicator", "Juggernaut", "Usurper",
    "Vanquisher", "Destroyer", "Savior", "Overlord", "Genbu", "Byakko", "Seiryu", "Suzaku", "Mighty Ruler", "Revered Ruler",
    "Divine Ruler", "Eternal Ruler", "Fujin", "Raijin", "Yaksa", "Ryujin", "Emperor", "Tekken Lord", "Tekken God"];

  const band = i => i <= 9 ? 'b0' : i <= 12 ? 'b1' : i <= 16 ? 'b2' : i <= 24 ? 'b3' : i <= 28 ? 'b4' : i <= 32 ? 'b5' : i <= 37 ? 'b6' : 'b7';
  const floor = i => Math.round((20 * i + i * i) / 5) * 5;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lang = () => document.documentElement.lang === 'en' ? 'en' : 'ko';
  const name = i => (lang() === 'en' ? EN : KO)[i] || '';
  let data = null;

  function ladder() {
    const el = document.getElementById('rkladder'); if (!el) return;
    let h = '';
    for (let i = 0; i <= 39; i++) {
      const pts = i === 39 ? (lang() === 'en' ? 'the best Tekken Lord' : '철권왕 중 1위') : (i === 38 ? floor(i) + '+' : floor(i) + '–' + (floor(i + 1) - 1));
      h += `<span class="rkchip ${band(i)}"><b>${esc(name(i))}</b><i>${pts}</i></span>`;
    }
    el.innerHTML = h;
  }
  function table() {
    const body = document.getElementById('rkbody'); if (!body) return;
    const up = document.getElementById('rkupdated');
    if (!data) { body.innerHTML = `<tr><td colspan="7" class="rkempty">${lang() === 'en' ? 'No ranking yet - it fills as ranked matches are played.' : '아직 기록된 대전이 없습니다. 랭크 대전이 쌓이면 채워집니다.'}</td></tr>`; return; }
    if (up) up.textContent = (lang() === 'en' ? 'Updated ' : '갱신 ') + data.updated;
    const ps = data.players || [];
    if (!ps.length) { data = null; table(); return; }
    body.innerHTML = ps.map((p, k) => `<tr class="${p.rank >= 38 ? 'top' : ''}"><td class="n">${k + 1}</td><td>${esc(p.name)}</td>` +
      `<td><span class="rkchip ${band(p.rank)}"><b>${esc(name(p.rank))}</b></span></td><td class="n">${p.points}</td><td class="n">${p.elo}</td>` +
      `<td class="n">${p.w}-${p.l}</td><td class="n">${esc(p.last)}</td></tr>`).join('');
  }
  fetch('ranking.json', { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(j => { data = j; table(); }).catch(() => table());
  ladder();
  document.addEventListener('ttt-lang', () => { ladder(); table(); });
})();
