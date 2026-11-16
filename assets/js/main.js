// J DANCE ACADEMY — 공통 스크립트 (헤더/푸터 + 데이터 렌더링). 데이터는 data/*.js 에서 수정.
const D = window.JD;

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function nl(s) { return esc(s).replace(/\n/g, '<br>'); }

function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  const cur = location.pathname.split('/').pop() || 'index.html';
  const links = D.site.menu.map(([href, label]) => `<a href="${href}"${href === cur ? ' class="on"' : ''}>${label}</a>`).join('');
  el.innerHTML = `<header class="hd"><div class="wrap">
    <a class="logo" href="index.html"><img src="assets/img/logo.png" alt="" onerror="this.style.display='none'"><span>J DANCE <em>ACADEMY</em></span></a>
    <button class="burger" id="burger" aria-expanded="false" aria-controls="nav">메뉴</button>
    <nav class="nav" id="nav">${links}<a class="cta" href="contact.html">상담 예약</a></nav>
  </div></header>`;
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  const s = D.site;
  const biz = Object.entries(s.business).filter(([, v]) => v).map(([k, v]) => `${k} ${esc(v)}`).join(' · ');
  const regNo = s.business['학원등록번호'] ? '' : ' · 학원등록번호 [추후 게재]';
  const links = [['네이버 블로그', s.blog], ['인스타그램', s.instagram], ['유튜브', s.youtube], ['네이버 상담', s.naverTalk], ['카카오톡 채널', s.kakao]]
    .filter(([, u]) => u).map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${l}</a>`).join('');
  el.innerHTML = `<footer class="ft"><div class="wrap">
    <div class="brand">${esc(s.nameEn)}</div>
    <p>${esc(s.seoLine)} · 고양페이·스포츠바우처 사용 가능</p>
    <p class="biz">${biz}${regNo}<br>${esc(s.address)} · 전화 <a href="${s.phoneHref}">${esc(s.phone)}</a></p>
    <div class="links">${links}</div>
  </div></footer>`;
}

function renderTimetable(el) {
  const T = D.timetable;
  const legend = Object.entries(T.categories).map(([k, n]) => `<span><i class="cat-${k}"></i>${esc(n)}</span>`).join('');
  const head = `<div class="tt-row head"><div class="tt-h"></div>${T.days.map((d) => `<div class="tt-h">${d}</div>`).join('')}</div>`;
  const body = T.rows.map((r) => `<div class="tt-row"><div class="tt-tm">${esc(r.label)}</div>${r.cells.map((c) => c
    ? `<div class="tt-c cat-${c.cat}"><span class="t">${esc(c.time)}</span><b>${esc(c.name)}</b><span class="w">${esc(c.who)}</span>${c.tag ? `<span class="g">${esc(c.tag)}</span>` : ''}</div>`
    : '<div class="tt-c none"></div>').join('')}</div>`).join('');
  el.innerHTML = `<p class="muted">※ ${esc(T.notice)} 적용 월: ${esc(T.month)} · 최종 수정일: ${esc(T.updated)}</p>
    <div class="legend">${legend}</div>
    <p class="muted" style="margin-bottom:8px">좌우로 밀어서 전체 요일을 볼 수 있습니다.</p>
    <div class="tt-scroll"><div class="tt-grid">${head}${body}</div></div>
    <p class="muted" style="margin-top:14px">같은 수업명(예: K-POP A)이라도 시간대에 따라 강사가 다를 수 있습니다. 모집중 수업은 모집 인원 충족 후 개설됩니다.</p>`;
}

function renderClasses(el) {
  const C = D.classes;
  const levels = C.levels.map((v) => `<div class="card"><h4 style="color:var(--accent)">${esc(v.name)}</h4><p>${esc(v.desc)}</p></div>`).join('');
  const groups = C.groups.map((g) => `<div class="sub-head"${g.id ? ` id="${esc(g.id)}"` : ''}><small>${esc(g.en)}</small><h3>${esc(g.title)}</h3></div>
    <div class="grid">${g.items.map((i) => `<div class="card"><h4>${esc(i.name)}</h4><p>${esc(i.desc)}</p>${i.target ? `<div class="meta">${nl(i.target)}</div>` : ''}<div class="lv">난이도 <b>${esc(i.level)}</b></div></div>`).join('')}</div>`).join('');
  el.innerHTML = `<h2 id="class-list">난이도 안내</h2><div class="grid">${levels}</div><h2 style="margin-top:56px">클래스별 상세 안내</h2>${groups}`;
}

function renderTeachers(el) {
  el.innerHTML = `<div class="t-grid">${D.teachers.map((t) => `<article class="t-card">
    <div class="t-photo"><img src="${esc(t.photo)}" alt="${esc(t.name)} 강사 프로필" onerror="this.remove()">${esc(t.name[0])}</div>
    <div class="t-body"><h3 style="font-size:20px">${esc(t.name)}</h3><span class="gn">${esc(t.genre)}</span><span class="cl">${esc(t.classes)}</span><p class="in">${esc(t.intro)}</p>
    ${t.instagram ? `<a class="ig" href="${esc(t.instagram)}" target="_blank" rel="noopener">인스타그램 보기</a>` : ''}</div></article>`).join('')}</div>`;
}

function renderPrice(el) {
  const P = D.price;
  const groups = P.groups.map((g) => `<div class="sub-head"><small>${esc(g.en)}</small><h3>${esc(g.title)}</h3></div>
    <div class="price-list">${g.items.map((i) => `<div class="price-row"><div class="n">${esc(i.name)}${i.note ? `<span class="nt">${esc(i.note)}</span>` : ''}</div><div class="p">${esc(i.price)}</div></div>`).join('')}</div>`).join('');
  const notices = `<div class="sub-head"><small>NOTICE</small><h3>수강 안내 사항</h3></div><div class="grid">${P.notices.map((n) => `<div class="card"><h4>${esc(n.title)}</h4><p>${esc(n.text)}</p></div>`).join('')}</div>`;
  el.innerHTML = groups + notices;
}

function renderRental(el) {
  el.innerHTML = `<div class="grid">${D.rental.map((r) => `<div class="card"><h4>${esc(r.title)}</h4><p>${esc(r.desc)}</p>${r.detail ? `<div class="meta" style="color:var(--text)">${nl(r.detail)}</div>` : ''}</div>`).join('')}</div>`;
}

function renderNews(el) {
  if (!D.news.length) { el.innerHTML = `<div class="empty">등록된 소식이 없습니다. 더 많은 소식은 <a href="${esc(D.site.blog)}" target="_blank" rel="noopener" style="color:var(--accent)">네이버 블로그</a>에서 확인하세요.</div>`; return; }
  el.innerHTML = D.news.map((n) => `<article class="post"><span class="d">${esc(n.category)} · ${esc(n.date)}</span><h3 style="font-size:19px">${esc(n.title)}</h3><p style="color:var(--sub)">${esc(n.summary)}</p>${n.link ? `<a href="${esc(n.link)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700">자세히 보기</a>` : ''}</article>`).join('');
}

function renderGallery(el) {
  const items = D.gallery.map((g) => `<div class="card"><h4>${esc(g.title)}</h4><p class="muted">${esc(g.category)}</p>${g.image ? `<img src="${esc(g.image)}" alt="${esc(g.title)}" style="border-radius:12px">` : ''}${g.video ? `<a href="${esc(g.video)}" target="_blank" rel="noopener" style="color:var(--accent);font-weight:700">영상 보기</a>` : ''}</div>`).join('');
  el.innerHTML = (items ? `<div class="grid">${items}</div>` : '<div class="empty">수업·공연 자료를 준비 중입니다.</div>')
    + `<div class="btn-row"><a class="btn" href="${esc(D.site.youtube)}" target="_blank" rel="noopener">더 많은 영상은 J DANCE YouTube에서 보기</a></div>`;
}

function renderContact(el) {
  const s = D.site;
  const q = encodeURIComponent('경기도 고양시 일산서구 주엽로 150');
  const ch = [['전화', s.phone, s.phoneHref], ['네이버 상담', '채널 바로가기', s.naverTalk], ['카카오톡 채널', '채널 바로가기', s.kakao], ['인스타그램', '@jdance_1san', s.instagram], ['유튜브', 'J DANCE ACADEMY', s.youtube], ['네이버 블로그', '블로그 바로가기', s.blog]]
    .filter(([, , u]) => u).map(([l, t, u]) => `<a class="card" href="${esc(u)}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}><span class="muted">${l}</span><h4>${esc(t)}</h4></a>`).join('');
  el.innerHTML = `<a class="big-cta" href="${s.phoneHref}">전화로 상담 예약하기 · ${esc(s.phone)}</a>
    <p class="muted" style="margin:12px 0 32px;text-align:center">상담은 예약제로 운영합니다. 대관 예약도 전화로만 받습니다.</p>
    <div class="grid">${ch}</div>
    <h2 style="margin-top:56px">오시는 길</h2>
    <p class="lead" style="margin-bottom:16px">${esc(s.address)}<br>주차: 건물 주차장 이용 시 2시간 무료 (이후 요금은 건물 정책에 따라 발생할 수 있습니다)</p>
    <div class="map-box">지도 영역 — 네이버/카카오 지도 API 키 발급 후 삽입하세요.</div>
    <div class="btn-row"><a class="btn ghost" href="https://map.naver.com/p/search/${q}" target="_blank" rel="noopener">네이버 지도 보기</a><a class="btn ghost" href="https://map.kakao.com/?q=${q}" target="_blank" rel="noopener">카카오맵 보기</a></div>
    <p class="muted" style="margin-top:20px">결제: 고양페이, 스포츠바우처 사용 가능</p>`;
}

const RENDERERS = { timetable: renderTimetable, classes: renderClasses, teachers: renderTeachers, price: renderPrice, rental: renderRental, news: renderNews, gallery: renderGallery, contact: renderContact };

renderHeader();
renderFooter();
const targets = document.querySelectorAll('[data-render]');
for (let i = 0; i < targets.length; i++) {
  const fn = RENDERERS[targets[i].getAttribute('data-render')];
  if (fn) fn(targets[i]);
}

// 렌더링 후 주소의 #앵커 위치로 다시 이동 (JS로 그려진 영역 대응)
if (location.hash) {
  const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (t) requestAnimationFrame(() => t.scrollIntoView());
}
