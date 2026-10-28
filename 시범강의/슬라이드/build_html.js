// 10분 시범강의 "드론이란?" HTML 슬라이드 생성 스크립트
// 실행: NODE_PATH=./node_modules node build_html.js [출력.html]
// 필요 패키지: react, react-dom, react-icons, pretendard
const fs = require("fs");
const path = require("path");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const fa = require("react-icons/fa6");
const gi = require("react-icons/gi");

const OUT = process.argv[2] || path.join(__dirname, "..", "드론이란_시범강의.html");
const SCRIPT = JSON.parse(fs.readFileSync(path.join(__dirname, "script.json"), "utf8"));
const FONT = require.resolve("pretendard/dist/web/variable/woff2/PretendardVariable.woff2");

const b64 = (p) => fs.readFileSync(p).toString("base64");
const ic = (Comp) => renderToStaticMarkup(React.createElement(Comp, { size: "1em", "aria-hidden": "true" }));

// Higgsfield로 생성한 사례 사진 (발표하는 컴퓨터의 브라우저가 직접 불러옴, 실패하면 아이콘 카드로 대체)
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3L1rQ8uk5ltdJjFrcNuVOGQv6cg/";
const PHOTO = {
  agri: "hf_20261028_135215_91501db1-d542-4e33-89de-5bdb21bcc30a.png",
  delivery: "hf_20261028_135351_c3287b52-6155-4fa8-b6f1-d986320dbf62.png",
  rescue: "hf_20261028_135351_63708c1a-e66c-4019-a4f0-c1727e63d392.png",
  inspect: "hf_20261028_135459_47e9a5a6-6f98-438e-b2d0-84b127a4f747.png",
  show: "hf_20261028_135925_f6d78845-750c-406e-9444-6cb4d7d88ac1.png",
  uam: "hf_20261028_135727_153406c6-deba-4626-a7e5-dd6295106f17.png",
};
const EAGLE = "data:image/png;base64," + b64(path.join(__dirname, "img", "eagle_top.png"));

const footer = (n) => `<div class="foot"><span>AI 드론 교육 · 드론이란?</span><span>${n} / 7</span></div>`;
const kicker = (t) => `<div class="kicker">${t}</div>`;

const slides = [];

// 1. 표지
slides.push(`
<section class="slide dark s1">
  <div class="rings" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
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
  <figure class="photo-card">
    <img src="${EAGLE}" alt="주황색 몸체의 이글 교육용 드론을 위에서 본 모습">
    <figcaption>오늘의 주인공 · 이글 교육용 드론 <em>90g</em></figcaption>
  </figure>
</section>`);

// 2. 떠오르는 것
const s2 = [
  ["c-blue", fa.FaCamera, "촬영", "하늘에서 찍은 사진·영상"],
  ["c-orange", fa.FaBoxOpen, "택배", "물건을 날라 주는 드론"],
  ["c-teal", fa.FaGamepad, "장난감", "리모컨으로 날리는 드론"],
  ["c-purple", fa.FaWandMagicSparkles, "드론 쇼", "밤하늘을 수놓는 불빛"],
];
slides.push(`
<section class="slide s2">
  ${kicker("생각 열기")}
  <h2>'드론' 하면 떠오르는 것은?</h2>
  <div class="mind">
    <svg class="links" viewBox="0 0 1728 640" aria-hidden="true">
      <path d="M560 150 L760 250"/><path d="M1168 150 L968 250"/><path d="M560 490 L760 390"/><path d="M1168 490 L968 390"/>
    </svg>
    <div class="hub"><span class="hub-ic">${ic(gi.GiDeliveryDrone)}</span><b>드론</b></div>
    ${s2.map(([c, I, t, d], i) => `<div class="node n${i}"><span class="ic ${c}">${ic(I)}</span><div><b>${t}</b><small>${d}</small></div></div>`).join("")}
  </div>
  <p class="bottom-line">드론은 이미 우리 생활 곳곳에 들어와 있어요</p>
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
    <figure class="photo-card small"><img src="${EAGLE}" alt="이글 교육용 드론을 위에서 본 모습"></figure>
    <div class="col">${partCard(parts[2])}${partCard(parts[3])}</div>
  </div>
  <div class="banner">눈(센서)과 두뇌(비행 제어기)가 있으니, 드론은 <mark>하늘을 나는 컴퓨터</mark>예요!</div>
  ${footer(4)}
</section>`);

// 5. 활용 사례
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
<section class="slide s5">
  ${kicker("02 어디서 일할까?")}
  <h2>드론은 어디서 일할까?</h2>
  <div class="cases">
    ${cases.map(([k, I, t, d, tg]) => `
    <div class="panel case">
      <div class="thumb"><span class="thumb-ic">${ic(I)}</span><img src="${CDN + PHOTO[k]}" alt="${t} 분야에서 일하는 드론 (AI 생성 이미지)" loading="eager" onerror="this.remove()"></div>
      <div class="case-txt"><b>${t}</b><p>${d}</p><span class="tag ${TAG[tg][1]}">${TAG[tg][0]}</span></div>
    </div>`).join("")}
  </div>
  <div class="common"><b>공통점</b><span class="tag big t-red">위험한 곳</span><span class="tag big t-blue">먼 곳</span><span class="tag big t-teal">힘든 일</span><span class="arrow">→</span><strong>사람 대신 드론이 맡아요</strong></div>
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
  <p class="question">Q. 여러분은 어떤 일을 하는 드론을 만들고 싶나요?</p>
  ${footer(6)}
</section>`);

// 7. 마무리
slides.push(`
<section class="slide dark s7">
  <div class="rings" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  ${kicker("오늘의 미션")}
  <h2>드론에게 생각하는 법을!</h2>
  <p class="summary">드론은 <mark>하늘을 나는 컴퓨터</mark>, 이제는 <mark>스스로 생각하는 드론</mark>의 시대!</p>
  <div class="loop">
    <div class="st"><span class="ic xl c-blue">${ic(fa.FaEye)}</span><b>감지</b><small>센서로 보고</small></div>
    <span class="loop-arrow">${ic(fa.FaArrowRight)}</span>
    <div class="st"><span class="ic xl c-orange">${ic(fa.FaBrain)}</span><b>판단</b><small>코드로 생각하고</small></div>
    <span class="loop-arrow">${ic(fa.FaArrowRight)}</span>
    <div class="st"><span class="ic xl c-teal">${ic(gi.GiDeliveryDrone)}</span><b>행동</b><small>스스로 움직여요</small></div>
  </div>
  <div class="next"><span class="ic c-orange">${ic(fa.FaLaptopCode)}</span><div><small>이어서 해 볼 활동</small><b>리모컨 대신 코딩으로, 드론에게 생각하는 법을 가르쳐요</b></div></div>
  <div class="foot"><span>AI 드론 교육 · 드론이란?</span><span>7 / 7</span></div>
</section>`);

const notes = SCRIPT.map((s) => ({ title: s.title, time: s.time, action: s.action, script: s.script, point: s.point }));

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
  --navy: #0B1F3A; --navy-2: #13294A; --ink: #1A2233; --gray: #8A94A6; --line: #DCE5EF;
  --sky: #EEF5FB; --white: #FFFFFF; --photo: #1C252C;
  --orange: #FF7A1A; --blue: #2E9BDA; --teal: #14B8A6; --purple: #7C5CFF; --red: #E5484D; --yellow: #FFC233;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; background: #070F1D; overflow: hidden; }
body { font-family: "Pretendard Variable", Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; color: var(--ink);
  -webkit-font-smoothing: antialiased; word-break: keep-all; }
#stage { position: absolute; left: 50%; top: 50%; width: 1920px; height: 1080px; transform-origin: center; }
.slide { position: absolute; inset: 0; padding: 72px 96px 0; background: var(--white); display: none; overflow: hidden; }
.slide.active { display: block; animation: fade .35s ease; }
@keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.slide.dark { background: var(--navy); color: var(--white); }

/* 공통 요소 */
.kicker { font-size: 24px; font-weight: 700; color: var(--orange); letter-spacing: .02em; }
h2 { font-size: 64px; font-weight: 800; letter-spacing: -0.025em; color: var(--navy); margin-top: 8px; line-height: 1.2; }
.dark h2 { color: var(--white); }
mark { background: none; color: var(--orange); font-weight: 800; }
.foot { position: absolute; left: 96px; right: 96px; bottom: 36px; display: flex; justify-content: space-between; font-size: 18px; color: var(--gray); }
.panel { background: var(--sky); border-radius: 28px; }
.panel.navy { background: var(--navy); color: var(--white); box-shadow: 0 14px 36px rgba(11,31,58,.18); }
.label { font-size: 22px; font-weight: 700; color: var(--orange); }
.pill { display: inline-flex; align-items: center; height: 56px; padding: 0 30px; border-radius: 999px; font-size: 24px; font-weight: 700; }
.pill.orange { background: var(--orange); color: var(--white); }
.ic { flex: none; display: inline-grid; place-items: center; width: 88px; height: 88px; border-radius: 50%; color: var(--white); font-size: 42px; }
.ic.xl { width: 200px; height: 200px; font-size: 96px; }
.c-blue { background: var(--blue); } .c-orange { background: var(--orange); } .c-teal { background: var(--teal); }
.c-purple { background: var(--purple); } .c-gray { background: var(--gray); }
.c-blue-t { color: var(--blue); } .c-orange-t { color: var(--orange); } .c-teal-t { color: var(--teal); } .c-purple-t { color: var(--purple); }
.photo-card { background: var(--photo); border-radius: 32px; padding: 32px; display: flex; flex-direction: column; align-items: center; box-shadow: 0 20px 48px rgba(0,0,0,.25); }
.photo-card img { width: 100%; height: auto; display: block; border-radius: 12px; }
.photo-card figcaption { margin-top: 20px; font-size: 22px; color: #C9D6E5; }
.photo-card figcaption em { font-style: normal; color: var(--orange); font-weight: 700; margin-left: 6px; }
.rings { position: absolute; right: -260px; top: 50%; width: 1100px; height: 1100px; transform: translateY(-50%); pointer-events: none; }
.rings i { position: absolute; inset: 0; border: 2px solid rgba(255,255,255,.06); border-radius: 50%; }
.rings i:nth-child(2) { inset: 140px; } .rings i:nth-child(3) { inset: 280px; } .rings i:nth-child(4) { inset: 420px; }

/* 1 표지 */
.s1 { display: none; }
.s1.active { display: flex; align-items: center; gap: 96px; padding: 0 120px; }
.s1-left { flex: 1; position: relative; }
.s1 h1 { font-size: 112px; font-weight: 800; letter-spacing: -0.035em; line-height: 1.12; margin: 40px 0 28px; }
.s1 .sub { font-size: 36px; color: #C9D6E5; font-weight: 500; }
.agenda { list-style: none; display: flex; gap: 56px; margin-top: 88px; }
.agenda li { font-size: 28px; font-weight: 600; }
.agenda b { display: block; font-size: 30px; color: var(--orange); font-weight: 800; margin-bottom: 8px; }
.s1 .photo-card { width: 620px; position: relative; }

/* 2 생각 열기 */
.mind { position: relative; height: 640px; margin-top: 40px; }
.links { position: absolute; inset: 0; width: 100%; height: 100%; }
.links path { stroke: #A9B4C4; stroke-width: 3; stroke-dasharray: 10 10; fill: none; }
.hub { position: absolute; left: 50%; top: 50%; width: 320px; height: 320px; margin: -160px 0 0 -160px; border-radius: 50%;
  background: var(--navy); color: var(--white); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 18px 40px rgba(11,31,58,.25); }
.hub-ic { font-size: 96px; color: var(--orange); line-height: 1; }
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
.s4-grid { display: grid; grid-template-columns: 1fr 560px 1fr; gap: 40px; margin-top: 44px; align-items: center; }
.col { display: flex; flex-direction: column; gap: 32px; }
.part { display: flex; gap: 28px; align-items: center; padding: 34px 36px; }
.part b { display: block; font-size: 34px; font-weight: 800; color: var(--navy); }
.part p { font-size: 26px; margin-top: 6px; }
.part em { font-style: normal; font-weight: 800; }
.part small { display: block; font-size: 22px; color: var(--gray); margin-top: 6px; }
.photo-card.small { padding: 24px; }
.banner { margin-top: 44px; background: var(--navy); color: var(--white); border-radius: 28px; text-align: center; padding: 34px; font-size: 36px; font-weight: 700; }

/* 5 활용 사례 */
.cases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 52px; }
.case { display: flex; gap: 28px; padding: 28px; align-items: center; }
.thumb { position: relative; flex: none; width: 210px; height: 210px; border-radius: 20px; overflow: hidden; background: #D3E3F1; display: grid; place-items: center; }
.thumb-ic { font-size: 84px; color: #7F9AB5; }
.thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.case b { display: block; font-size: 36px; font-weight: 800; color: var(--navy); }
.case p { font-size: 24px; line-height: 1.45; margin: 10px 0 18px; color: #2D3748; }
.tag { display: inline-flex; align-items: center; height: 44px; padding: 0 22px; border-radius: 999px; color: var(--white); font-size: 21px; font-weight: 700; }
.tag.big { height: 60px; padding: 0 32px; font-size: 28px; }
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
.question { text-align: center; font-size: 32px; font-weight: 700; color: var(--orange); margin-top: 36px; }

/* 7 마무리 */
.summary { font-size: 40px; font-weight: 600; margin-top: 28px; }
.loop { display: flex; align-items: center; justify-content: center; gap: 72px; margin-top: 72px; }
.st { display: flex; flex-direction: column; align-items: center; width: 300px; }
.st b { font-size: 48px; font-weight: 800; margin-top: 28px; }
.st small { font-size: 28px; color: #C9D6E5; margin-top: 8px; }
.loop-arrow { font-size: 56px; color: var(--gray); margin-top: -110px; display: grid; }
.next { position: relative; display: flex; align-items: center; gap: 32px; width: 1240px; margin: 72px auto 0; padding: 30px 44px;
  border: 3px solid var(--orange); border-radius: 28px; background: rgba(255,255,255,.06); }
.next small { display: block; font-size: 24px; color: var(--orange); font-weight: 700; }
.next b { display: block; font-size: 36px; font-weight: 700; margin-top: 4px; }
.s7 .foot { color: #6F7E95; }
.s7 .rings { right: -520px; }

/* 발표 도구 */
#notes { position: fixed; left: 0; right: 0; bottom: 0; max-height: 42vh; overflow: auto; background: rgba(7,15,29,.96); color: #E6EDF6;
  font: 16px/1.7 "Pretendard Variable", sans-serif; padding: 20px 28px 24px; display: none; z-index: 10; border-top: 1px solid #24344F; }
#notes.on { display: block; }
#notes h3 { font-size: 18px; color: var(--orange); margin-bottom: 6px; }
#notes .meta { color: #9FB0C6; font-size: 14px; margin-bottom: 10px; }
#notes .say { white-space: pre-line; font-size: 17px; }
#notes .pt { margin-top: 10px; color: #FFC58F; font-size: 15px; }
#hud { position: fixed; right: 16px; top: 14px; display: flex; gap: 8px; z-index: 11; opacity: 0; transition: opacity .2s; }
body:hover #hud { opacity: 1; }
#hud button { font: 600 13px "Pretendard Variable", sans-serif; color: #DCE5EF; background: rgba(19,41,74,.9); border: 1px solid #2C4468; border-radius: 8px; padding: 7px 12px; cursor: pointer; }
#hud button:hover { background: #1F3A63; }
#hint { position: fixed; left: 16px; top: 18px; color: #6F7E95; font: 13px "Pretendard Variable", sans-serif; z-index: 11; opacity: 0; transition: opacity .2s; }
body:hover #hint { opacity: 1; }

/* 인쇄·PDF 저장: 한 장에 슬라이드 하나 */
@page { size: 1920px 1080px; margin: 0; }
@media print {
  html, body { overflow: visible; background: none; }
  #stage { position: static; transform: none !important; }
  .slide, .s1 { display: block !important; position: relative; page-break-after: always; animation: none; }
  .s1 { display: flex !important; align-items: center; gap: 96px; padding: 0 120px; }
  #notes, #hud, #hint { display: none !important; }
}
</style>
</head>
<body>
<main id="stage">
${slides.join("\n")}
</main>
<aside id="notes" aria-live="polite"></aside>
<div id="hint">← → 이동 · F 전체 화면 · N 대본</div>
<div id="hud">
  <button id="prev" type="button">◀ 이전</button>
  <button id="next" type="button">다음 ▶</button>
  <button id="nt" type="button">대본 (N)</button>
  <button id="fs" type="button">전체 화면 (F)</button>
</div>
<script>
const NOTES = ${JSON.stringify(notes)};
const slides = [...document.querySelectorAll(".slide")];
const stage = document.getElementById("stage");
const notesEl = document.getElementById("notes");
let cur = 0;
function fit() {
  const s = Math.min(innerWidth / 1920, innerHeight / 1080);
  stage.style.transform = "translate(-50%, -50%) scale(" + s + ")";
}
function esc(t) { return t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
function renderNotes() {
  const n = NOTES[cur];
  notesEl.innerHTML = "<h3>" + (cur + 1) + ". " + esc(n.title) + "</h3><div class='meta'>⏱ " + esc(n.time) + " · " + esc(n.action) +
    "</div><div class='say'>" + esc(n.script) + "</div><div class='pt'>포인트: " + esc(n.point) + "</div>";
}
function go(i) {
  cur = Math.max(0, Math.min(slides.length - 1, i));
  slides.forEach((s, k) => s.classList.toggle("active", k === cur));
  history.replaceState(null, "", "#" + (cur + 1));
  renderNotes();
}
addEventListener("resize", fit);
addEventListener("keydown", (e) => {
  if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); go(cur - 1); }
  else if (e.key === "Home") go(0);
  else if (e.key === "End") go(slides.length - 1);
  else if (e.key === "f" || e.key === "F") toggleFs();
  else if (e.key === "n" || e.key === "N") notesEl.classList.toggle("on");
});
function toggleFs() { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); }
document.getElementById("prev").onclick = () => go(cur - 1);
document.getElementById("next").onclick = () => go(cur + 1);
document.getElementById("nt").onclick = () => notesEl.classList.toggle("on");
document.getElementById("fs").onclick = toggleFs;
fit();
go((parseInt(location.hash.slice(1), 10) || 1) - 1);
</script>
</body>
</html>
`;
fs.writeFileSync(OUT, html);
console.log("written", OUT, (html.length / 1024 / 1024).toFixed(2) + " MB");
