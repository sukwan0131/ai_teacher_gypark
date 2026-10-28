// 10분 시범강의 "드론이란?" HTML 슬라이드 생성 스크립트
// 실행: NODE_PATH=./node_modules node build_html.js [출력.html]
// 필요 패키지: react, react-dom, react-icons, pretendard
// 강사 정보: instructor.json (대본은 script.json → make_script_md.py로 별도 문서 생성)
const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const fa = require("react-icons/fa6");
const gi = require("react-icons/gi");

const OUT = process.argv[2] || path.join(__dirname, "..", "드론이란_시범강의.html");
const TEACHER = JSON.parse(fs.readFileSync(path.join(__dirname, "instructor.json"), "utf8"));
const FONT = require.resolve("pretendard/dist/web/variable/woff2/PretendardVariable.woff2");
const TOTAL = 8;

const b64 = (p) => fs.readFileSync(p).toString("base64");
const ic = (Comp) => renderToStaticMarkup(React.createElement(Comp, { size: "1em", "aria-hidden": "true" }));
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// 단계 공개 요소(2·5번 슬라이드만): 처음엔 흐릿한 힌트로 보이고, 클릭하거나 → 키를 누르면 선명하게 나타남
const F = (n) => `frag" data-step="${n}`;

// Higgsfield로 생성한 사례 사진 (발표하는 컴퓨터의 브라우저가 직접 불러옴, 실패하면 아이콘으로 대체)
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3L1rQ8uk5ltdJjFrcNuVOGQv6cg/";
const PHOTO = {
  agri: "hf_20261028_135215_91501db1-d542-4e33-89de-5bdb21bcc30a.png",
  delivery: "hf_20261028_135351_c3287b52-6155-4fa8-b6f1-d986320dbf62.png",
  rescue: "hf_20261028_135351_63708c1a-e66c-4019-a4f0-c1727e63d392.png",
  inspect: "hf_20261028_135459_47e9a5a6-6f98-438e-b2d0-84b127a4f747.png",
  show: "hf_20261028_135925_f6d78845-750c-406e-9444-6cb4d7d88ac1.png",
  uam: "hf_20261028_135727_153406c6-deba-4626-a7e5-dd6295106f17.png",
};
// 5번 '촬영·공연' 사진을 누르면 뜨는 드론 쇼 영상 (HTML 옆에 드론쇼.mp4가 있으면 그 파일을, 없으면 유튜브를 재생)
const VIDEO = { local: "드론쇼.mp4", youtube: "fiDqHjp-Ias", start: 60, end: 85, title: "2026 서울 한강 드론라이트쇼" };
const EAGLE = "data:image/png;base64," + b64(path.join(__dirname, "img", "eagle_top.png"));
const photoPath = TEACHER.photo && path.join(__dirname, "img", TEACHER.photo);
const TEACHER_PHOTO = photoPath && fs.existsSync(photoPath)
  ? `<img src="data:image/${path.extname(photoPath).slice(1).replace("jpg", "jpeg")};base64,${b64(photoPath)}" alt="${esc(TEACHER.name)} 강사 사진">`
  : `<span class="no-photo">${ic(fa.FaUser)}</span>`;

const footer = (n) => `<div class="foot"><span>AI 드론 교육 · 드론이란?</span><span>${n} / ${TOTAL}</span></div>`;
const kicker = (t) => `<div class="kicker">${t}</div>`;
const rings = `<div class="rings" aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
const slides = [];

// 1. 표지 + 강사 소개
slides.push(`
<section class="slide dark s1">
  ${rings}
  <div class="s1-left">
    <span class="pill orange">AI 드론 교육 · 1차시 도입</span>
    <h1>드론, 어디까지<br>알고 있니?</h1>
    <p class="sub">하늘을 나는 컴퓨터, 드론 이야기</p>
    <ol class="agenda">
      <li><b>01</b>드론이란?</li>
      <li><b>02</b>어디서 일할까?</li>
      <li><b>03</b>왜 배워야 할까?</li>
    </ol>
  </div>
  <figure class="teacher">
    <div class="t-photo">${TEACHER_PHOTO}</div>
    <figcaption><small>강사 소개</small><b>${esc(TEACHER.name)}</b><span>${esc(TEACHER.role)}</span></figcaption>
  </figure>
</section>`);

// 2. 떠오르는 것 (카드 4장 단계 공개, 정리 문장은 드론 쇼와 함께)
const s2 = [
  ["c-blue", fa.FaCamera, "촬영", "하늘에서 찍은 사진·영상"],
  ["c-orange", fa.FaBoxOpen, "택배", "물건을 날라 주는 드론"],
  ["c-teal", fa.FaGamepad, "장난감", "리모컨으로 날리는 드론"],
  ["c-purple", fa.FaWandMagicSparkles, "드론 쇼", "밤하늘을 수놓는 불빛"],
];
slides.push(`
<section class="slide s2 live">
  ${kicker("생각 열기")}
  <h2>'드론' 하면 떠오르는 것은?</h2>
  <div class="mind">
    <svg class="links" viewBox="0 0 1728 640" aria-hidden="true">
      <path class="${F(1)}" d="M560 150 L760 250"/><path class="${F(2)}" d="M1168 150 L968 250"/><path class="${F(3)}" d="M560 490 L760 390"/><path class="${F(4)}" d="M1168 490 L968 390"/>
    </svg>
    <div class="hub"><span class="hub-ic">${ic(gi.GiDeliveryDrone)}</span><b>드론</b></div>
    ${s2.map(([c, I, t, d], i) => `<div class="node n${i} lift ${F(i + 1)}"><span class="ic ${c}">${ic(I)}</span><div><b>${t}</b><small>${d}</small></div></div>`).join("")}
  </div>
  <p class="bottom-line ${F(4)}">드론은 이미 우리 생활 곳곳에 들어와 있어요</p>
  ${footer(2)}
</section>`);

// 3. 드론이란
slides.push(`
<section class="slide s3">
  ${kicker("01 드론이란?")}
  <h2>드론이란?</h2>
  <div class="s3-grid">
    <div class="panel name">
      <span class="label">이름 이야기</span>
      <div class="bee-row">
        <span class="bee">${ic(gi.GiBee)}</span>
        <div><div class="word">drone</div><div class="mean">= 영어로 '수벌'</div></div>
      </div>
      <span class="pill orange buzz">웅웅~ 웅웅~</span>
      <p>날 때 나는 소리가<br>벌의 날갯짓 소리와 닮았어요</p>
    </div>
    <div class="s3-right">
      <div class="panel navy define">
        <span class="label">드론의 뜻</span>
        <p class="big">사람이 타지 않고<br><mark>하늘을 나는 비행체</mark></p>
      </div>
      <div class="vs">
        <div class="panel mini"><span class="ic c-gray">${ic(fa.FaPlane)}</span><div><b>비행기</b><small>조종사가 직접 타요</small></div></div>
        <span class="vs-badge">VS</span>
        <div class="panel mini"><span class="ic c-orange">${ic(gi.GiDeliveryDrone)}</span><div><b>드론</b><small>아무도 타지 않아요</small></div></div>
      </div>
      <div class="panel how-box"><p class="how"><b>나는 방법</b> 멀리서 조종하거나 · 코드와 센서로 스스로 날아요</p>
      <p class="law">※ 우리나라 법에서도 '조종하는 사람이 타지 않고 나는 비행체'로 정해 두었어요</p></div>
    </div>
  </div>
  ${footer(3)}
</section>`);

// 4. 드론의 몸
const parts = [
  ["c-blue", fa.FaFan, "프로펠러·모터", "날개", "바람을 일으켜 날게 해요"],
  ["c-teal", fa.FaBatteryThreeQuarters, "배터리", "심장", "날 수 있는 힘을 줘요"],
  ["c-orange", fa.FaMicrochip, "비행 제어기", "두뇌", "계산하고 명령해요"],
  ["c-purple", fa.FaEye, "센서", "눈·귀", "주변을 느껴요"],
];
const partCard = ([c, I, t, h, d]) => `<div class="panel part"><span class="ic ${c}">${ic(I)}</span><div><b>${t}</b><p>사람으로 치면 <em class="${c}-t">${h}</em></p><small>${d}</small></div></div>`;
slides.push(`
<section class="slide s4">
  ${kicker("01 드론이란?")}
  <h2>드론의 몸 살펴보기</h2>
  <div class="s4-grid">
    <div class="col">${partCard(parts[0])}${partCard(parts[1])}</div>
    <figure class="photo-card"><img src="${EAGLE}" alt="이글 교육용 드론을 위에서 본 모습"><figcaption>이글 교육용 드론 <em>90g</em></figcaption></figure>
    <div class="col">${partCard(parts[2])}${partCard(parts[3])}</div>
  </div>
  <div class="banner">눈(센서)과 두뇌(비행 제어기)가 있으니, 드론은 <mark>하늘을 나는 컴퓨터</mark>예요!</div>
  ${footer(4)}
</section>`);

// 5. 활용 사례 (카드는 처음부터 보이고, 태그와 공통점만 클릭하면 공개)
const TAG = { 위험한곳: ["위험한 곳", "t-red"], 먼곳: ["먼 곳", "t-blue"], 힘든일: ["힘든 일", "t-teal"] };
const cases = [
  ["agri", fa.FaSeedling, "농업", "넓은 논밭에<br>농약·비료 뿌리기", "힘든일"],
  ["delivery", fa.FaBoxOpen, "배송", "섬·산골 마을에<br>물건 배달", "먼곳"],
  ["rescue", fa.FaLifeRing, "구조", "길 잃은 사람 찾기,<br>불난 곳 살피기", "위험한곳"],
  ["inspect", fa.FaMagnifyingGlass, "점검", "높은 다리·송전탑<br>살피기", "위험한곳"],
  ["show", fa.FaWandMagicSparkles, "촬영·공연", "하늘 높이 촬영,<br>밤하늘 드론 쇼", "힘든일"],
  ["uam", fa.FaCity, "미래 교통", "사람을 태우는<br>하늘 택시", "먼곳"],
];
slides.push(`
<section class="slide s5 live">
  ${kicker("02 어디서 일할까?")}
  <h2>드론은 어디서 일할까?</h2>
  <div class="cases">
    ${cases.map(([k, I, t, d, tg]) => `
    <div class="panel case lift">
      <div class="thumb${k === "show" ? " playable" : ""}"><span class="thumb-ic">${ic(I)}</span><img src="${CDN + PHOTO[k]}" alt="${t} 분야에서 일하는 드론 (AI 생성 이미지)" onerror="this.remove()">${k === "show" ? `<span class="play">${ic(fa.FaPlay)}</span>` : ""}</div>
      <div class="case-txt"><b>${t}</b><p>${d}</p><span class="tag ${TAG[tg][1]} ${F(1)}">${TAG[tg][0]}</span></div>
    </div>`).join("")}
  </div>
  <div class="common ${F(1)}"><b>공통점</b><span class="tag big t-red">위험한 곳</span><span class="tag big t-blue">먼 곳</span><span class="tag big t-teal">힘든 일</span><span class="arrow">→</span><strong>사람 대신 드론이 맡아요</strong></div>
  ${footer(5)}
</section>`);

// 6. 왜 배워야 할까
const why = [
  ["c-orange", fa.FaLaptopCode, "눈으로 보는 AI", "내 코드가 진짜로 날아서 결과를 바로 보여 줘요", ["코드", "→", "비행"]],
  ["c-blue", fa.FaPuzzlePiece, "여러 과목이 한 번에", "드론 하나에 여러 과목이 함께 들어 있어요", ["코딩", "과학", "수학"]],
  ["c-teal", fa.FaBriefcase, "미래의 직업", "드론과 함께 새로운 직업이 생기고 있어요", ["개발자", "조종사", "분석가"]],
];
slides.push(`
<section class="slide s6">
  ${kicker("03 왜 배워야 할까?")}
  <h2>왜 드론을 배워야 할까?</h2>
  <div class="evolve">
    <div class="panel step-now"><span class="ic c-gray">${ic(fa.FaGamepad)}</span><div><small>지금까지</small><b>사람이 조종하는 드론</b><p>리모컨으로 하나하나 움직여요</p></div></div>
    <span class="evo-arrow">${ic(fa.FaArrowRight)}</span>
    <div class="panel navy step-next"><span class="ic c-orange">${ic(fa.FaBrain)}</span><div><small>앞으로</small><b>스스로 생각하는 드론</b><p>장애물을 피하고 길을 찾아요</p></div></div>
  </div>
  <p class="power">드론이 스스로 생각하게 만드는 힘 = <mark>AI와 코딩</mark></p>
  <div class="why">
    ${why.map(([c, I, t, d, tags], i) => `
    <div class="panel why-card">
      <div class="why-head"><span class="ic ${c}">${ic(I)}</span><b><i>${i + 1}</i>${t}</b></div>
      <p>${d}</p>
      <div class="chips ${c}-t">${tags.map((g) => (g === "→" ? `<span class="chip-arrow">→</span>` : `<span class="chip">${g}</span>`)).join("")}</div>
    </div>`).join("")}
  </div>
  <p class="closing">오늘 만드는 작은 코드 한 줄이, 미래에 사람을 돕는 드론의 출발점이 됩니다</p>
  ${footer(6)}
</section>`);

// 7. 정리
slides.push(`
<section class="slide dark s7 live">
  ${rings}
  ${kicker("오늘의 미션")}
  <h2>드론에게 생각하는 법을!</h2>
  <p class="summary">드론은 <mark>하늘을 나는 컴퓨터</mark>, 이제는 <mark>스스로 생각하는 드론</mark>의 시대!</p>
  <div class="loop">
    <div class="st veil ${F(1)}"><span class="ic xl c-blue"><span class="vc">${ic(fa.FaEye)}</span></span><span class="vc"><b>감지</b><small>센서로 보고</small></span></div>
    <span class="loop-arrow">${ic(fa.FaArrowRight)}</span>
    <div class="st veil ${F(2)}"><span class="ic xl c-orange"><span class="vc">${ic(fa.FaBrain)}</span></span><span class="vc"><b>판단</b><small>코드로 생각하고</small></span></div>
    <span class="loop-arrow">${ic(fa.FaArrowRight)}</span>
    <div class="st veil ${F(3)}"><span class="ic xl c-teal"><span class="vc">${ic(gi.GiDeliveryDrone)}</span></span><span class="vc"><b>행동</b><small>스스로 움직여요</small></span></div>
  </div>
  <div class="next veil ${F(4)}"><span class="ic c-orange"><span class="vc">${ic(fa.FaLaptopCode)}</span></span><div class="vc"><small>이어서 해 볼 활동</small><b>리모컨 대신 코딩으로, 드론에게 생각하는 법을 가르쳐요</b></div></div>
  ${footer(7)}
</section>`);

// 8. 실습으로
slides.push(`
<section class="slide dark s8">
  ${rings}
  <div class="s8-left">
    <span class="pill orange">실습 시작</span>
    <h1>그럼 이제,<br><mark>직접 경험해 볼까요?</mark></h1>
    <p class="sub">이론은 여기까지! 내 코드로 드론을 움직여 봅시다</p>
    <ol class="hands">
      <li><span class="ic c-blue">${ic(fa.FaLink)}</span><b>드론 연결하기</b></li>
      <li class="arr">${ic(fa.FaArrowRight)}</li>
      <li><span class="ic c-orange">${ic(fa.FaLaptopCode)}</span><b>코딩으로 명령하기</b></li>
      <li class="arr">${ic(fa.FaArrowRight)}</li>
      <li><span class="ic c-teal">${ic(gi.GiDeliveryDrone)}</span><b>날려서 확인하기</b></li>
    </ol>
  </div>
  <figure class="photo-card"><img src="${EAGLE}" alt="이글 교육용 드론"><figcaption>나의 첫 AI 드론, 이글</figcaption></figure>
  ${footer(8)}
</section>`);

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>드론, 어디까지 알고 있니?</title>
<style>
@font-face { font-family: "Pretendard Variable"; font-weight: 45 920; font-style: normal; font-display: swap;
  src: url(data:font/woff2;base64,${b64(FONT)}) format("woff2-variations"); }
:root {
  --navy: #0B1F3A; --ink: #1A2233; --gray: #8A94A6; --line: #DCE5EF;
  --sky: #EEF5FB; --white: #FFFFFF; --photo: #1C252C;
  --orange: #FF7A1A; --blue: #2E9BDA; --teal: #14B8A6; --purple: #7C5CFF; --red: #E5484D; --yellow: #FFC233;
  --pop: cubic-bezier(.34, 1.56, .64, 1);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; background: #070F1D; overflow: hidden; }
body { font-family: "Pretendard Variable", Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; color: var(--ink);
  -webkit-font-smoothing: antialiased; word-break: keep-all; user-select: none; }
#stage { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: center; }
.slide { position: absolute; inset: 0; padding: 72px 96px 0; background: var(--white); display: none; overflow: hidden; }
.slide.active { display: block; }
.slide.dark { background: var(--navy); color: var(--white); }

/* ---------- 단계 공개 (2·5번 슬라이드): 처음엔 흐릿한 힌트, 클릭하면 선명하게 ---------- */
.frag { transition: opacity .5s ease, filter .5s ease, transform .6s var(--pop); }
.frag:not(.shown) { opacity: .16; filter: blur(7px) grayscale(.4); transform: translateY(14px) scale(.97); cursor: pointer; }
.frag:not(.shown):hover { opacity: .32; filter: blur(5px) grayscale(.3); }
path.frag:not(.shown) { opacity: .15; filter: none; transform: none; }
.frag.shown { opacity: 1; filter: none; transform: none; }
.frag.just { animation: pop .6s var(--pop); }
@keyframes pop { 0% { transform: scale(.9); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }

/* 모자이크 공개 (7번): 틀은 그대로, 안쪽 내용만 흐릿한 모자이크에서 선명하게 */
.frag.veil:not(.shown) { opacity: 1; filter: none; transform: none; }
.frag.veil.just { animation: none; }
.veil .vc { display: inline-grid; transition: filter 1.1s ease, opacity 1.1s ease; }
.st .vc { display: flex; flex-direction: column; align-items: center; }
.veil:not(.shown) .vc { filter: blur(16px) saturate(.6); opacity: .55; }
.veil:not(.shown):hover .vc { filter: blur(12px); }

/* 드론 쇼 영상 팝업 */
.playable { cursor: pointer; }
.play { position: absolute; inset: 0; display: grid; place-items: center; font-size: 46px; color: #fff; background: rgba(11,31,58,.25); }
.play svg { width: 92px; height: 92px; padding: 26px 22px 26px 30px; border-radius: 50%; background: rgba(255,122,26,.92); box-shadow: 0 8px 24px rgba(0,0,0,.3); transition: transform .3s var(--pop); }
.playable:hover .play svg { transform: scale(1.12); }
#modal { position: fixed; inset: 0; z-index: 20; background: rgba(4,10,20,.82); display: none; align-items: center; justify-content: center; }
#modal.on { display: flex; animation: fadein .25s ease; }
@keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
#modal .box { width: min(86vw, 152vh); aspect-ratio: 16 / 9; position: relative; background: #000; border-radius: 16px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.5); }
#modal video, #modal iframe { width: 100%; height: 100%; border: 0; display: block; }
#modal .close { position: absolute; top: -52px; right: 0; font: 600 16px "Pretendard Variable", sans-serif; color: #fff; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.3); border-radius: 999px; padding: 8px 18px; cursor: pointer; }
#modal .cap { position: absolute; bottom: -42px; left: 0; font: 500 16px "Pretendard Variable", sans-serif; color: #C9D6E5; }
#modal .box { overflow: visible; }

/* ---------- 마우스 효과 (2·5번 슬라이드) ---------- */
.lift { transition: transform .3s var(--pop), box-shadow .3s ease, opacity .5s ease, filter .5s ease; }
.lift.frag.shown:hover, .lift:not(.frag):hover { transform: translateY(-8px); box-shadow: 0 22px 44px rgba(11,31,58,.16); }
.lift .ic { transition: transform .35s var(--pop); }
.lift:hover .ic { transform: rotate(-8deg) scale(1.08); }
.clicked { animation: pop .5s var(--pop) !important; }

/* ---------- 공통 요소 ---------- */
.kicker { font-size: 24px; font-weight: 700; color: var(--orange); letter-spacing: .02em; }
h2 { font-size: 64px; font-weight: 800; letter-spacing: -0.025em; color: var(--navy); margin-top: 8px; line-height: 1.2; }
.dark h2 { color: var(--white); }
mark { background: none; color: var(--orange); font-weight: 800; }
.foot { position: absolute; left: 96px; right: 96px; bottom: 36px; display: flex; justify-content: space-between; font-size: 18px; color: var(--gray); }
.dark .foot { color: #6F7E95; }
.panel { background: var(--sky); border-radius: 28px; }
.panel.navy { background: var(--navy); color: var(--white); box-shadow: 0 14px 36px rgba(11,31,58,.18); }
.label { font-size: 22px; font-weight: 700; color: var(--orange); }
.pill { display: inline-flex; align-items: center; height: 56px; padding: 0 30px; border-radius: 999px; font-size: 24px; font-weight: 700; }
.pill.orange { background: var(--orange); color: var(--white); }
.ic { flex: none; display: inline-grid; place-items: center; width: 88px; height: 88px; border-radius: 50%; color: var(--white); font-size: 42px; }
.ic svg { display: block; }
.ic.xl { width: 200px; height: 200px; font-size: 96px; }
.c-blue { background: var(--blue); } .c-orange { background: var(--orange); } .c-teal { background: var(--teal); }
.c-purple { background: var(--purple); } .c-gray { background: var(--gray); }
.c-blue-t { color: var(--blue); } .c-orange-t { color: var(--orange); } .c-teal-t { color: var(--teal); } .c-purple-t { color: var(--purple); }
.photo-card { background: var(--photo); border-radius: 32px; padding: 24px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 20px 48px rgba(0,0,0,.25); }
.photo-card img { width: 100%; height: auto; display: block; border-radius: 12px; }
.photo-card figcaption { margin-top: 16px; font-size: 22px; color: #C9D6E5; }
.photo-card figcaption em { font-style: normal; color: var(--orange); font-weight: 700; margin-left: 6px; }
.rings { position: absolute; right: -260px; top: 50%; width: 1100px; height: 1100px; transform: translateY(-50%); pointer-events: none; }
.rings i { position: absolute; inset: 0; border: 2px solid rgba(255,255,255,.07); border-radius: 50%; }
.rings i:nth-child(2) { inset: 140px; } .rings i:nth-child(3) { inset: 280px; } .rings i:nth-child(4) { inset: 420px; }

/* 1 표지 + 강사 소개 */
.s1.active { display: flex; align-items: center; gap: 80px; padding: 0 110px 0 120px; }
.s1-left { flex: 1; position: relative; }
.s1 h1 { font-size: 112px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.12; margin: 40px 0 28px; }
.s1 .sub { font-size: 36px; color: #C9D6E5; font-weight: 500; }
.agenda { list-style: none; display: flex; gap: 56px; margin-top: 84px; }
.agenda li { font-size: 28px; font-weight: 600; }
.agenda b { display: block; font-size: 30px; color: var(--orange); font-weight: 800; margin-bottom: 8px; }
.teacher { position: relative; width: 600px; border-radius: 32px; overflow: hidden; background: #13294A; box-shadow: 0 24px 56px rgba(0,0,0,.35); }
.t-photo { width: 600px; height: 690px; background: #EEF1F4; overflow: hidden; position: relative; }
.t-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
.no-photo { position: absolute; inset: 0; display: grid; place-items: center; font-size: 180px; color: #B8C4D2; }
.teacher figcaption { padding: 26px 36px 30px; display: flex; flex-direction: column; }
.teacher small { font-size: 22px; font-weight: 700; color: var(--orange); }
.teacher b { font-size: 44px; font-weight: 800; margin-top: 4px; letter-spacing: -0.01em; }
.teacher span { font-size: 24px; color: #C9D6E5; margin-top: 4px; }

/* 2 생각 열기 */
.mind { position: relative; height: 640px; margin-top: 40px; }
.links { position: absolute; inset: 0; width: 100%; height: 100%; }
.links path { stroke: #A9B4C4; stroke-width: 3; stroke-dasharray: 10 10; fill: none; animation: dash 1.4s linear infinite; }
@keyframes dash { to { stroke-dashoffset: -40; } }
.hub { position: absolute; left: 50%; top: 50%; width: 320px; height: 320px; margin: -160px 0 0 -160px; border-radius: 50%;
  background: var(--navy); color: var(--white); display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 18px 40px rgba(11,31,58,.25); transition: transform .3s var(--pop); animation: pulse 2.6s ease-out infinite; }
.hub:hover { transform: scale(1.05); }
@keyframes pulse { 0% { box-shadow: 0 18px 40px rgba(11,31,58,.25), 0 0 0 0 rgba(255,122,26,.35); } 70%, 100% { box-shadow: 0 18px 40px rgba(11,31,58,.25), 0 0 0 36px rgba(255,122,26,0); } }
.hub-ic { font-size: 96px; color: var(--orange); line-height: 1; animation: float 2.4s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.hub b { font-size: 60px; font-weight: 800; margin-top: 4px; }
.node { position: absolute; width: 520px; display: flex; align-items: center; gap: 28px; padding: 32px 36px; background: var(--sky); border-radius: 28px; box-shadow: 0 10px 28px rgba(11,31,58,.08); }
.node b { display: block; font-size: 36px; font-weight: 800; color: var(--navy); }
.node small { display: block; font-size: 24px; color: #4A5568; margin-top: 4px; }
.n0 { left: 40px; top: 40px; } .n1 { right: 40px; top: 40px; } .n2 { left: 40px; bottom: 40px; } .n3 { right: 40px; bottom: 40px; }
.bottom-line { text-align: center; font-size: 30px; font-weight: 700; color: var(--orange); margin-top: 28px; }

/* 3 드론이란 */
.s3-grid { display: grid; grid-template-columns: 680px 1fr; gap: 40px; margin-top: 44px; height: 700px; }
.name { padding: 44px 48px; display: flex; flex-direction: column; justify-content: space-between; }
.bee-row { display: flex; align-items: center; gap: 36px; }
.bee { display: grid; place-items: center; width: 190px; height: 190px; border-radius: 50%; background: var(--yellow); color: var(--navy); font-size: 110px; flex: none; }
.word { font-size: 84px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; line-height: 1; }
.mean { font-size: 34px; font-weight: 700; margin-top: 14px; }
.buzz { align-self: flex-start; }
.name p { font-size: 30px; line-height: 1.5; color: #2D3748; }
.s3-right { display: flex; flex-direction: column; justify-content: space-between; }
.define { padding: 40px 52px; }
.define .big { font-size: 58px; font-weight: 800; line-height: 1.3; margin-top: 18px; letter-spacing: -0.02em; }
.vs { display: flex; align-items: center; gap: 20px; }
.mini { flex: 1; display: flex; align-items: center; gap: 24px; padding: 28px 32px; }
.mini b { display: block; font-size: 32px; font-weight: 800; color: var(--navy); }
.mini small { display: block; font-size: 24px; color: #4A5568; margin-top: 4px; }
.vs-badge { font-size: 28px; font-weight: 800; color: var(--gray); }
.how-box { padding: 30px 40px; }
.how { font-size: 28px; font-weight: 700; color: var(--navy); }
.how b { color: var(--orange); margin-right: 14px; }
.law { font-size: 22px; color: var(--gray); margin-top: 18px; }

/* 4 드론의 몸 */
.s4-grid { display: grid; grid-template-columns: 1fr 560px 1fr; gap: 40px; margin-top: 40px; align-items: center; }
.col { display: flex; flex-direction: column; gap: 32px; }
.part { display: flex; gap: 28px; align-items: center; padding: 34px 36px; }
.part b { display: block; font-size: 34px; font-weight: 800; color: var(--navy); }
.part p { font-size: 26px; margin-top: 6px; }
.part em { font-style: normal; font-weight: 800; }
.part small { display: block; font-size: 22px; color: var(--gray); margin-top: 6px; }
.s4 .photo-card img { width: 470px; }
.banner { margin-top: 36px; background: var(--navy); color: var(--white); border-radius: 28px; text-align: center; padding: 32px; font-size: 36px; font-weight: 700; }

/* 5 활용 사례 */
.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 52px; }
.case { display: flex; gap: 28px; padding: 28px; align-items: center; }
.thumb { position: relative; flex: none; width: 210px; height: 210px; border-radius: 20px; overflow: hidden; background: #D3E3F1; display: grid; place-items: center; }
.thumb-ic { font-size: 84px; color: #7F9AB5; }
.thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.case:hover .thumb img { transform: scale(1.12); }
.case b { display: block; font-size: 36px; font-weight: 800; color: var(--navy); }
.case p { font-size: 24px; line-height: 1.45; margin: 10px 0 18px; color: #2D3748; }
.tag { display: inline-flex; align-items: center; height: 44px; padding: 0 22px; border-radius: 999px; color: var(--white); font-size: 21px; font-weight: 700; }
.tag.frag:not(.shown) { filter: none; opacity: 1; transform: none; background: transparent; color: transparent; border: 2px dashed #B7C4D3; min-width: 72px; justify-content: center; position: relative; }
.tag.frag:not(.shown)::after { content: "?"; position: absolute; inset: 0; display: grid; place-items: center; font-size: 22px; font-weight: 800; color: #A9B4C4; }
.tag.big { height: 60px; padding: 0 32px; font-size: 28px; transition: transform .3s var(--pop); }
.tag.big:hover { transform: scale(1.08); }
.t-red { background: var(--red); } .t-blue { background: var(--blue); } .t-teal { background: var(--teal); }
.common { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 44px; font-size: 32px; }
.common > b { color: var(--orange); font-weight: 800; margin-right: 16px; }
.common .arrow { font-weight: 800; color: var(--navy); margin: 0 6px; }
.common strong { font-weight: 800; color: var(--navy); }

/* 6 왜 배워야 할까 */
.evolve { display: flex; align-items: center; gap: 40px; margin-top: 40px; }
.evolve .panel { flex: 1; display: flex; align-items: center; gap: 32px; padding: 34px 44px; }
.evolve small { display: block; font-size: 22px; font-weight: 700; color: var(--gray); }
.step-next small { color: var(--orange); }
.evolve b { display: block; font-size: 38px; font-weight: 800; margin: 4px 0; }
.step-now b { color: var(--navy); }
.evolve p { font-size: 24px; color: #4A5568; }
.step-next p { color: #C9D6E5; }
.evo-arrow { font-size: 72px; color: var(--orange); display: grid; }
.power { text-align: center; font-size: 36px; font-weight: 700; color: var(--navy); margin: 40px 0 36px; }
.why { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
.why-card { background: var(--white); border: 2px solid var(--line); padding: 34px 36px; box-shadow: 0 10px 28px rgba(11,31,58,.07); }
.why-head { display: flex; align-items: center; gap: 24px; }
.why-head b { font-size: 34px; font-weight: 800; color: var(--navy); }
.why-head i { font-style: normal; color: var(--orange); margin-right: 10px; }
.why-card p { font-size: 25px; line-height: 1.5; margin: 22px 0 22px; color: #2D3748; min-height: 76px; }
.chips { display: flex; align-items: center; gap: 12px; }
.chip { height: 46px; padding: 0 22px; border-radius: 999px; border: 2px solid currentColor; display: inline-flex; align-items: center; font-size: 22px; font-weight: 700; background: var(--sky); }
.chip-arrow { font-size: 26px; font-weight: 800; }
.closing { text-align: center; font-size: 32px; font-weight: 700; color: var(--orange); margin-top: 36px; }

/* 7 정리 */
.summary { font-size: 40px; font-weight: 600; margin-top: 28px; }
.loop { display: flex; align-items: center; justify-content: center; gap: 72px; margin-top: 64px; }
.st { display: flex; flex-direction: column; align-items: center; width: 300px; }
.st b { font-size: 48px; font-weight: 800; margin-top: 28px; }
.st small { font-size: 28px; color: #C9D6E5; margin-top: 8px; }
.loop-arrow { font-size: 56px; color: var(--gray); margin-top: -110px; display: grid; }
.next { position: relative; display: flex; align-items: center; gap: 32px; width: 1240px; margin: 64px auto 0; padding: 30px 44px;
  border: 3px solid var(--orange); border-radius: 28px; background: rgba(255,255,255,.06); }
.next small { display: block; font-size: 24px; color: var(--orange); font-weight: 700; }
.next b { display: block; font-size: 36px; font-weight: 700; margin-top: 4px; }
.s7 .rings { right: -520px; }

/* 8 실습으로 */
.s8.active { display: flex; align-items: center; gap: 96px; padding: 0 120px; }
.s8-left { flex: 1; position: relative; }
.s8 h1 { font-size: 104px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.15; margin: 40px 0 28px; }
.s8 .sub { font-size: 34px; color: #C9D6E5; font-weight: 500; }
.hands { list-style: none; display: flex; align-items: center; gap: 24px; margin-top: 72px; }
.hands li { display: flex; align-items: center; gap: 18px; }
.hands b { font-size: 28px; font-weight: 700; }
.hands .ic { width: 72px; height: 72px; font-size: 34px; }
.hands .arr { font-size: 30px; color: var(--gray); }
.s8 .photo-card { width: 560px; position: relative; }
.s8 .photo-card figcaption { font-size: 24px; color: #E6EDF6; font-weight: 600; }

/* ---------- 발표 도구 ---------- */
#progress { position: fixed; left: 0; bottom: 0; height: 4px; background: var(--orange); transition: width .35s ease; z-index: 9; }
#hud { position: fixed; right: 16px; top: 14px; display: flex; gap: 8px; align-items: center; z-index: 11; opacity: 0; transition: opacity .2s; }
body:hover #hud { opacity: 1; }
#hud span { font: 600 13px "Pretendard Variable", sans-serif; color: #8FA0B8; margin-right: 6px; }
#hud button { font: 600 13px "Pretendard Variable", sans-serif; color: #DCE5EF; background: rgba(19,41,74,.9); border: 1px solid #2C4468; border-radius: 8px; padding: 7px 12px; cursor: pointer; }
#hud button:hover { background: #1F3A63; }
#hint { position: fixed; left: 16px; top: 18px; color: #6F7E95; font: 13px "Pretendard Variable", sans-serif; z-index: 11; opacity: 0; transition: opacity .2s; }
body:hover #hint { opacity: 1; }

/* 인쇄·PDF 저장: 한 장에 슬라이드 하나, 모든 단계 공개 */
@page { size: 1920px 1080px; margin: 0; }
@media print {
  html, body { overflow: visible; background: none; }
  #stage { position: static; transform: none !important; }
  .slide { display: block !important; position: relative; page-break-after: always; }
  .s1, .s8 { display: flex !important; align-items: center; }
  .frag { opacity: 1 !important; filter: none !important; transform: none !important; }
  .tag.frag { border: 0 !important; color: #fff !important; }
  .tag.frag::after { content: none !important; }
  .veil .vc { filter: none !important; opacity: 1 !important; }
  .play { display: none !important; }
  .tag.frag.t-red { background: var(--red) !important; } .tag.frag.t-blue { background: var(--blue) !important; } .tag.frag.t-teal { background: var(--teal) !important; }
  #hud, #hint, #progress { display: none !important; }
}
</style>
</head>
<body>
<main id="stage">
${slides.join("\n")}
</main>
<div id="progress"></div>
<div id="modal" role="dialog" aria-label="드론 쇼 영상"><div class="box"><button class="close" type="button">닫기 ✕</button><div class="media"></div><div class="cap"></div></div></div>
<div id="hint">클릭 · → 다음 · ← 이전 · F 전체 화면</div>
<div id="hud">
  <span id="pos"></span>
  <button id="prev" type="button">◀ 이전</button>
  <button id="next" type="button">다음 ▶</button>
  <button id="fs" type="button">전체 화면 (F)</button>
</div>
<script>
const slides = [...document.querySelectorAll(".slide")];
const stage = document.getElementById("stage");
let cur = 0, step = 0;
const maxStep = (s) => Math.max(0, ...[...s.querySelectorAll(".frag")].map((f) => +f.dataset.step));

function fit() {
  const k = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = "translate(-50%, -50%) scale(" + k + ")";
}
function paint(animate) {
  slides[cur].querySelectorAll(".frag").forEach((f) => {
    const on = +f.dataset.step <= step;
    if (on && !f.classList.contains("shown") && animate) { f.classList.add("just"); setTimeout(() => f.classList.remove("just"), 650); }
    f.classList.toggle("shown", on);
  });
  const total = slides.reduce((a, s) => a + maxStep(s) + 1, 0);
  const done = slides.slice(0, cur).reduce((a, s) => a + maxStep(s) + 1, 0) + step + 1;
  document.getElementById("progress").style.width = (done / total * 100) + "%";
  document.getElementById("pos").textContent = (cur + 1) + " / " + slides.length + (maxStep(slides[cur]) ? "  ·  단계 " + step + " / " + maxStep(slides[cur]) : "");
}
function show(i, atEnd) {
  cur = Math.max(0, Math.min(slides.length - 1, i));
  step = atEnd ? maxStep(slides[cur]) : 0;
  slides.forEach((s, k) => s.classList.toggle("active", k === cur));
  history.replaceState(null, "", "#" + (cur + 1));
  paint(false);
}
function next() { if (step < maxStep(slides[cur])) { step += 1; paint(true); } else if (cur < slides.length - 1) show(cur + 1); }
function prev() { if (step > 0) { step -= 1; paint(false); } else if (cur > 0) show(cur - 1, true); }
window.go = (i) => show(i, true);
window.goStart = (i) => show(i);

addEventListener("resize", fit);
addEventListener("keydown", (e) => {
  if (modal.classList.contains("on")) { if (e.key === "Escape") closeVideo(); return; }
  if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); next(); }
  else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); prev(); }
  else if (e.key === "Home") show(0);
  else if (e.key === "End") show(slides.length - 1, true);
  else if (e.key === "f" || e.key === "F") toggleFs();
});
const VIDEO = ${JSON.stringify(VIDEO)};
const modal = document.getElementById("modal"), media = modal.querySelector(".media");
function openVideo() {
  media.innerHTML = "";
  const v = document.createElement("video");
  v.src = VIDEO.local; v.controls = true; v.autoplay = true; v.style.width = v.style.height = "100%";
  v.addEventListener("timeupdate", () => { if (v.currentTime >= 30) v.pause(); });
  v.addEventListener("error", () => {
    media.innerHTML = '<iframe src="https://www.youtube.com/embed/' + VIDEO.youtube + "?autoplay=1&start=" + VIDEO.start + "&end=" + VIDEO.end +
      '&rel=0&modestbranding=1" allow="autoplay; encrypted-media; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
  });
  media.appendChild(v);
  modal.querySelector(".cap").textContent = "영상: " + VIDEO.title;
  modal.classList.add("on");
}
function closeVideo() { modal.classList.remove("on"); media.innerHTML = ""; }
modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".close")) closeVideo(); });

// 클릭: 흐릿한 힌트를 누르면 그 단계까지 공개, 공개된 카드를 누르면 톡 튀는 효과, 빈 곳을 누르면 다음으로
stage.addEventListener("click", (e) => {
  if (e.target.closest(".playable")) { openVideo(); return; }
  const ghost = e.target.closest(".frag:not(.shown)");
  if (ghost && slides[cur].contains(ghost)) { step = Math.max(step, +ghost.dataset.step); paint(true); return; }
  const card = e.target.closest(".lift, .hub, .tag.big");
  if (card) { card.classList.remove("clicked"); void card.offsetWidth; card.classList.add("clicked"); return; }
  next();
});
function toggleFs() { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); }
document.getElementById("prev").onclick = prev;
document.getElementById("next").onclick = next;
document.getElementById("fs").onclick = toggleFs;
fit();
show((parseInt(location.hash.slice(1), 10) || 1) - 1);
</script>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log("written", OUT, (html.length / 1024 / 1024).toFixed(2) + " MB");
