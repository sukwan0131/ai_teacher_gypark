// 10분 시범강의 "드론이란?" 공통 슬라이드 생성 스크립트
// 실행: NODE_PATH=./node_modules SKILL_DIR=<pptx 스킬 경로> node build.js [출력.pptx]
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa6");
const gi = require("react-icons/gi");
const { applyTheme } = require(process.env.SKILL_DIR + "/scripts/apply_theme.js");

const IMG = path.join(__dirname, "img");
const OUT = process.argv[2] || path.join(__dirname, "drone_intro.pptx");
const SCRIPT = JSON.parse(fs.readFileSync(path.join(__dirname, "script.json"), "utf8"));

const FONT = "Malgun Gothic";
const HEX = {
  navy: "0B1F3A", ink: "1A2233", white: "FFFFFF", sky: "EEF5FB",
  orange: "FF7A1A", blue: "2E9BDA", teal: "14B8A6", yellow: "FFC233", purple: "7C5CFF", gray: "8A94A6",
  red: "E5484D", photoBg: "1C252C", line: "D9E3EE",
};
const THEME = {
  name: "Drone Sky",
  headFontFace: FONT,
  bodyFontFace: FONT,
  colors: {
    dk1: HEX.ink, lt1: HEX.white, dk2: HEX.navy, lt2: HEX.sky,
    accent1: HEX.orange, accent2: HEX.blue, accent3: HEX.teal,
    accent4: HEX.yellow, accent5: HEX.purple, accent6: HEX.gray,
    hlink: HEX.blue, folHlink: HEX.purple,
  },
};

async function icon(Comp, hex, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Comp, { color: "#" + hex, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}
// 사진을 상자 비율에 맞춰 가운데를 잘라 넣기
async function cover(file, w, h) {
  const px = 600;
  const buf = await sharp(path.join(IMG, file)).resize({ width: px, height: Math.round(px * h / w), fit: "cover" }).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.title = "드론, 어디까지 알고 있니?";
  pres.subject = "AI 드론 교육 1차시 도입 - 드론이란?";
  pres.author = "AI 드론 교육";
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
  const C = pres.SchemeColor;
  const W = 13.333;

  // ---------- 레이아웃 ----------
  pres.defineSlideMaster({ title: "TITLE_DARK", background: { color: C.text2 }, objects: [] });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: C.background1 },
    margin: [0.4, 0.6, 0.6, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 32, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "" } },
      { text: { text: "AI 드론 교육  |  드론이란?", options: { x: 0.6, y: 7.0, w: 6, h: 0.3, fontSize: 10, color: C.accent6, margin: 0 } } },
    ],
    slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
  });
  pres.defineSlideMaster({
    title: "CLOSING_DARK",
    background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 32, bold: true, color: C.background1, valign: "middle", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
  });

  // ---------- 도우미 ----------
  const shadow = () => ({ type: "outer", color: "0B1F3A", opacity: 0.16, blur: 8, offset: 2, angle: 90 });
  const T = (s, text, o) => s.addText(text, Object.assign({ margin: 0, isTextBox: true, valign: "middle" }, o));
  const card = (s, x, y, w, h, fill, name, extra = {}) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign({ x, y, w, h, rectRadius: 0.18, fill: { color: fill }, line: { type: "none" }, objectName: name }, extra));
  async function iconCircle(s, x, y, d, Comp, fillColor, name, iconHex = HEX.white) {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fillColor }, line: { type: "none" }, objectName: name + " 원" });
    const pad = d * 0.24;
    s.addImage({ data: await icon(Comp, iconHex), x: x + pad, y: y + pad, w: d - pad * 2, h: d - pad * 2, objectName: name + " 아이콘", altText: name });
  }
  function chip(s, x, y, w, h, text, fill, name, color = C.background1, fontSize = 13) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: fill }, line: { type: "none" }, objectName: name + " 배경" });
    T(s, text, { x, y, w, h, fontSize, bold: true, color, align: "center", objectName: name });
  }
  const notes = (s, i) => s.addNotes(`[시간] ${SCRIPT[i].time}\n[동작] ${SCRIPT[i].action}\n\n${SCRIPT[i].script}\n\n[포인트] ${SCRIPT[i].point}`);

  // ========== 1. 표지 ==========
  pres.addSection({ title: "도입" });
  {
    const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "도입" });
    chip(s, 0.8, 1.3, 3.1, 0.5, "AI 드론 교육 · 1차시 도입", C.accent1, "태그", C.background1, 14);
    T(s, "드론, 어디까지\n알고 있니?", { x: 0.8, y: 2.0, w: 6.2, h: 1.9, fontSize: 46, bold: true, color: C.background1, valign: "top", lineSpacingMultiple: 1.05, objectName: "표지 제목" });
    T(s, "하늘을 나는 컴퓨터, 드론 이야기", { x: 0.8, y: 4.0, w: 6.2, h: 0.55, fontSize: 20, color: C.background2, objectName: "표지 부제" });
    const agenda = [["01", "드론이란?"], ["02", "어디서 일할까?"], ["03", "왜 배워야 할까?"]];
    agenda.forEach(([n, t], i) => {
      const x = 0.8 + i * 2.1;
      T(s, n, { x, y: 5.15, w: 1.9, h: 0.45, fontSize: 20, bold: true, color: C.accent1, objectName: "목차 번호 " + n });
      T(s, t, { x, y: 5.6, w: 1.95, h: 0.45, fontSize: 15, color: C.background1, objectName: "목차 " + n });
    });
    card(s, 7.75, 1.0, 4.9, 5.2, HEX.photoBg, "드론 사진 배경");
    s.addImage({ path: path.join(IMG, "eagle_top.png"), x: 8.1, y: 1.3, w: 4.2, h: 4.03, objectName: "이글 드론 사진", altText: "주황색 몸체의 이글 교육용 드론을 위에서 본 모습" });
    T(s, "오늘의 주인공  ·  이글 교육용 드론 (90g)", { x: 7.75, y: 5.5, w: 4.9, h: 0.5, fontSize: 13, color: C.background2, align: "center", objectName: "사진 설명" });
    notes(s, 0);
  }

  // ========== 2. 떠오르는 것 ==========
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "도입" });
    s.addText("'드론' 하면 떠오르는 것은?", { placeholder: "title" });
    const cx = W / 2, cy = 3.85, d = 2.4;
    const items = [
      { t: "촬영", sub: "하늘에서 찍은 사진·영상", I: fa.FaCamera, c: C.accent2, x: 1.2, y: 1.75 },
      { t: "택배", sub: "물건을 날라 주는 드론", I: fa.FaBoxOpen, c: C.accent1, x: 8.73, y: 1.75 },
      { t: "장난감", sub: "리모컨으로 날리는 드론", I: fa.FaGamepad, c: C.accent3, x: 1.2, y: 4.55 },
      { t: "드론 쇼", sub: "밤하늘을 수놓는 불빛", I: fa.FaWandMagicSparkles, c: C.accent5, x: 8.73, y: 4.55 },
    ];
    for (const it of items) {
      const left = it.x < cx, top = it.y < cy;
      const ex = left ? it.x + 3.4 : it.x, ey = top ? it.y + 1.2 : it.y;
      const r = (d / 2) * 0.7071;
      const px = left ? cx - r : cx + r, py = top ? cy - r : cy + r;
      s.addShape(pres.shapes.LINE, { x: Math.min(ex, px), y: Math.min(ey, py), w: Math.abs(px - ex), h: Math.abs(py - ey), flipV: left !== top, line: { color: C.accent6, width: 1.5, dashType: "dash" }, objectName: it.t + " 연결선" });
    }
    s.addShape(pres.shapes.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: C.text2 }, line: { type: "none" }, shadow: shadow(), objectName: "가운데 원" });
    s.addImage({ data: await icon(gi.GiDeliveryDrone, HEX.orange), x: cx - 0.4, y: cy - 0.95, w: 0.8, h: 0.8, objectName: "드론 아이콘", altText: "드론 아이콘" });
    T(s, "드론", { x: cx - d / 2, y: cy - 0.1, w: d, h: 0.8, fontSize: 36, bold: true, color: C.background1, align: "center", objectName: "가운데 글자" });
    for (const it of items) {
      card(s, it.x, it.y, 3.4, 1.2, C.background2, it.t + " 카드", { shadow: shadow() });
      await iconCircle(s, it.x + 0.25, it.y + 0.25, 0.7, it.I, it.c, it.t);
      T(s, it.t, { x: it.x + 1.15, y: it.y + 0.18, w: 2.1, h: 0.45, fontSize: 20, bold: true, color: C.text2, objectName: it.t + " 제목" });
      T(s, it.sub, { x: it.x + 1.15, y: it.y + 0.62, w: 2.15, h: 0.4, fontSize: 12, color: C.text1, objectName: it.t + " 설명" });
    }
    T(s, "드론은 이미 우리 생활 곳곳에 들어와 있어요", { x: 0.6, y: 6.35, w: 12.1, h: 0.45, fontSize: 16, bold: true, color: C.accent1, align: "center", objectName: "정리 문장" });
    notes(s, 1);
  }

  // ========== 3. 드론이란 ==========
  pres.addSection({ title: "드론이란?" });
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "드론이란?" });
    s.addText("드론이란?", { placeholder: "title" });
    // 왼쪽: 이름 이야기
    card(s, 0.6, 1.45, 5.3, 5.25, C.background2, "이름 이야기 카드");
    T(s, "이름 이야기", { x: 0.95, y: 1.7, w: 3, h: 0.4, fontSize: 15, bold: true, color: C.accent1, objectName: "이름 라벨" });
    await iconCircle(s, 1.0, 2.35, 1.5, gi.GiBee, C.accent4, "꿀벌", HEX.navy);
    T(s, "drone", { x: 2.8, y: 2.35, w: 2.9, h: 0.8, fontSize: 40, bold: true, color: C.text2, objectName: "drone 글자" });
    T(s, "= 영어로 '수벌'", { x: 2.8, y: 3.15, w: 2.9, h: 0.5, fontSize: 20, bold: true, color: C.text1, objectName: "수벌 뜻" });
    chip(s, 1.0, 4.6, 2.2, 0.55, "웅웅~ 웅웅~", C.accent1, "소리", C.background1, 15);
    T(s, "날 때 나는 소리가\n벌의 날갯짓 소리와 닮았어요", { x: 1.0, y: 5.35, w: 4.6, h: 1.0, fontSize: 16, color: C.text1, valign: "top", objectName: "이름 설명" });
    // 오른쪽: 뜻
    card(s, 6.3, 1.45, 6.4, 2.35, C.text2, "정의 카드", { shadow: shadow() });
    T(s, "드론의 뜻", { x: 6.7, y: 1.7, w: 3, h: 0.4, fontSize: 15, bold: true, color: C.accent1, objectName: "정의 라벨" });
    T(s, "사람이 타지 않고\n하늘을 나는 비행체", { x: 6.7, y: 2.15, w: 5.8, h: 1.45, fontSize: 30, bold: true, color: C.background1, objectName: "정의" });
    // 비행기와 비교
    const cmp = [
      { t: "비행기", d: "조종사가 직접 타요", I: fa.FaPlane, c: C.accent6, x: 6.3 },
      { t: "드론", d: "아무도 타지 않아요", I: gi.GiDeliveryDrone, c: C.accent1, x: 9.55 },
    ];
    for (const k of cmp) {
      card(s, k.x, 4.05, 3.15, 1.25, C.background2, k.t + " 카드");
      await iconCircle(s, k.x + 0.22, 4.27, 0.8, k.I, k.c, k.t);
      T(s, [
        { text: k.t, options: { bold: true, fontSize: 17, color: C.text2, breakLine: true } },
        { text: k.d, options: { fontSize: 13, color: C.text1 } },
      ], { x: k.x + 1.2, y: 4.15, w: 1.9, h: 1.05, objectName: k.t + " 비교" });
    }
    // 나는 방법
    T(s, [
      { text: "나는 방법  ", options: { bold: true, color: C.accent1 } },
      { text: "멀리서 조종하거나 · 코드와 센서로 스스로 날아요", options: { bold: true, color: C.text2 } },
    ], { x: 6.3, y: 5.5, w: 6.4, h: 0.5, fontSize: 15, objectName: "나는 방법" });
    T(s, "※ 우리나라 법에서도 '조종하는 사람이 타지 않고 나는 비행체'로 정해 두었어요", { x: 6.3, y: 6.1, w: 6.4, h: 0.5, fontSize: 12, italic: true, color: C.accent6, objectName: "법 한 줄" });
    notes(s, 2);
  }

  // ========== 4. 드론의 몸 ==========
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "드론이란?" });
    s.addText("드론의 몸 살펴보기", { placeholder: "title" });
    card(s, 4.72, 1.45, 3.9, 3.8, HEX.photoBg, "드론 사진 배경", { shadow: shadow() });
    s.addImage({ path: path.join(IMG, "eagle_top.png"), x: 4.9, y: 1.6, w: 3.54, h: 3.4, objectName: "이글 드론 위에서 본 모습", altText: "주황색 몸체의 이글 교육용 드론을 위에서 본 모습" });
    const parts = [
      { t: "프로펠러·모터", h: "날개", d: "바람을 일으켜 날게 해요", I: fa.FaFan, c: C.accent2, x: 0.6, y: 1.45 },
      { t: "배터리", h: "심장", d: "날 수 있는 힘을 줘요", I: fa.FaBatteryThreeQuarters, c: C.accent3, x: 0.6, y: 3.45 },
      { t: "비행 제어기", h: "두뇌", d: "계산하고 명령해요", I: fa.FaMicrochip, c: C.accent1, x: 8.95, y: 1.45 },
      { t: "센서", h: "눈·귀", d: "주변을 느껴요", I: fa.FaEye, c: C.accent5, x: 8.95, y: 3.45 },
    ];
    for (const p of parts) {
      card(s, p.x, p.y, 3.78, 1.8, C.background2, p.t + " 카드");
      await iconCircle(s, p.x + 0.25, p.y + 0.3, 0.8, p.I, p.c, p.t);
      T(s, p.t, { x: p.x + 1.25, y: p.y + 0.22, w: 2.4, h: 0.45, fontSize: 18, bold: true, color: C.text2, objectName: p.t + " 이름" });
      T(s, [
        { text: "사람으로 치면 ", options: { color: C.text1 } },
        { text: p.h, options: { bold: true, color: p.c } },
      ], { x: p.x + 1.25, y: p.y + 0.7, w: 2.4, h: 0.4, fontSize: 14, objectName: p.t + " 비유" });
      T(s, p.d, { x: p.x + 1.25, y: p.y + 1.12, w: 2.45, h: 0.4, fontSize: 12, color: C.accent6, objectName: p.t + " 역할" });
    }
    card(s, 0.6, 5.6, 12.1, 1.05, C.text2, "핵심 문장 배경");
    T(s, [
      { text: "눈(센서)과 두뇌(비행 제어기)가 있으니,  드론은 ", options: { color: C.background1 } },
      { text: "하늘을 나는 컴퓨터", options: { color: C.accent1, bold: true } },
      { text: "예요!", options: { color: C.background1 } },
    ], { x: 0.9, y: 5.6, w: 11.5, h: 1.05, fontSize: 20, bold: true, align: "center", objectName: "핵심 문장" });
    notes(s, 3);
  }

  // ========== 5. 활용 사례 ==========
  pres.addSection({ title: "활용 사례" });
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "활용 사례" });
    s.addText("드론은 어디서 일할까?", { placeholder: "title" });
    const TAG = { "위험한 곳": HEX.red, "먼 곳": HEX.blue, "힘든 일": HEX.teal };
    const cases = [
      { t: "농업", d: "넓은 논밭에\n농약·비료 뿌리기", f: "case_agri.png", tag: "힘든 일" },
      { t: "배송", d: "섬·산골 마을에\n물건 배달", f: "case_delivery.png", tag: "먼 곳" },
      { t: "구조", d: "길 잃은 사람 찾기,\n불난 곳 살피기", f: "case_rescue.png", tag: "위험한 곳" },
      { t: "점검", d: "높은 다리·송전탑\n살피기", f: "case_inspect.png", tag: "위험한 곳" },
      { t: "촬영·공연", d: "하늘 높이 촬영,\n밤하늘 드론 쇼", f: "case_show.png", tag: "힘든 일" },
      { t: "미래 교통", d: "사람을 태우는\n하늘 택시", f: "case_uam.png", tag: "먼 곳" },
    ];
    const cw = 3.83, chh = 2.15, th = 1.5;
    for (let i = 0; i < cases.length; i++) {
      const k = cases[i];
      const x = 0.6 + (i % 3) * (cw + 0.3), y = 1.4 + Math.floor(i / 3) * (chh + 0.25);
      card(s, x, y, cw, chh, C.background2, k.t + " 카드");
      s.addImage({ data: await cover(k.f, th, th), x: x + 0.2, y: y + 0.32, w: th, h: th, objectName: k.t + " 사진", altText: k.t + " 분야에서 일하는 드론" });
      T(s, k.t, { x: x + 1.9, y: y + 0.28, w: 1.8, h: 0.42, fontSize: 18, bold: true, color: C.text2, objectName: k.t + " 이름" });
      T(s, k.d, { x: x + 1.9, y: y + 0.72, w: 1.85, h: 0.72, fontSize: 13, color: C.text1, valign: "top", objectName: k.t + " 설명" });
      chip(s, x + 1.9, y + 1.45, 1.2, 0.36, k.tag, TAG[k.tag], k.t + " 태그", C.background1, 12);
    }
    const rowX = (W - 10.3) / 2;
    T(s, "공통점", { x: rowX, y: 6.3, w: 1.3, h: 0.5, fontSize: 17, bold: true, color: C.accent1, objectName: "공통점 라벨" });
    let cx = rowX + 1.5;
    for (const [t, c] of Object.entries(TAG)) {
      chip(s, cx, 6.32, 1.55, 0.46, t, c, "공통점 " + t, C.background1, 15);
      cx += 1.7;
    }
    T(s, "→  사람 대신 드론이 맡아요", { x: cx + 0.1, y: 6.3, w: 3.7, h: 0.5, fontSize: 17, bold: true, color: C.text2, objectName: "공통점 문장" });
    notes(s, 4);
  }

  // ========== 6. 왜 배워야 할까 ==========
  pres.addSection({ title: "배워야 하는 이유" });
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "배워야 하는 이유" });
    s.addText("왜 드론을 배워야 할까?", { placeholder: "title" });
    card(s, 0.6, 1.45, 5.0, 1.55, C.background2, "조종 드론 카드");
    await iconCircle(s, 0.9, 1.8, 0.85, fa.FaGamepad, C.accent6, "조종 드론");
    T(s, [
      { text: "지금까지", options: { bold: true, fontSize: 12, color: C.accent6, breakLine: true } },
      { text: "사람이 조종하는 드론", options: { bold: true, fontSize: 18, color: C.text2, breakLine: true } },
      { text: "리모컨으로 하나하나 움직여요", options: { fontSize: 13, color: C.text1 } },
    ], { x: 2.0, y: 1.5, w: 3.45, h: 1.45, objectName: "조종 드론" });
    s.addImage({ data: await icon(fa.FaArrowRight, HEX.orange), x: 6.27, y: 1.87, w: 0.75, h: 0.75, objectName: "진화 화살표", altText: "오른쪽 화살표" });
    card(s, 7.7, 1.45, 5.0, 1.55, C.text2, "생각하는 드론 카드", { shadow: shadow() });
    await iconCircle(s, 8.0, 1.8, 0.85, fa.FaBrain, C.accent1, "생각하는 드론");
    T(s, [
      { text: "앞으로", options: { bold: true, fontSize: 12, color: C.accent1, breakLine: true } },
      { text: "스스로 생각하는 드론", options: { bold: true, fontSize: 18, color: C.background1, breakLine: true } },
      { text: "장애물을 피하고 길을 찾아요", options: { fontSize: 13, color: C.background2 } },
    ], { x: 9.1, y: 1.5, w: 3.5, h: 1.45, objectName: "생각하는 드론" });
    T(s, [
      { text: "드론이 스스로 생각하게 만드는 힘 = ", options: { color: C.text2 } },
      { text: "AI와 코딩", options: { color: C.accent1, bold: true } },
    ], { x: 0.6, y: 3.15, w: 12.1, h: 0.5, fontSize: 18, bold: true, align: "center", objectName: "AI 문장" });

    const why = [
      { n: "1", t: "눈으로 보는 AI", d: "내가 만든 코드가 진짜로 날아서 결과를 바로 보여 줘요", I: fa.FaLaptopCode, c: C.accent1, tags: ["코드", "→", "비행"] },
      { n: "2", t: "여러 과목이 한 번에", d: "드론 하나에 여러 과목이 함께 들어 있어요", I: fa.FaPuzzlePiece, c: C.accent2, tags: ["코딩", "과학", "수학"] },
      { n: "3", t: "미래의 직업", d: "드론과 함께 새로운 직업이 생기고 있어요", I: fa.FaBriefcase, c: C.accent3, tags: ["개발자", "조종사", "분석가"] },
    ];
    const cw = 3.83;
    for (let i = 0; i < why.length; i++) {
      const w0 = why[i], x = 0.6 + i * (cw + 0.3);
      card(s, x, 3.85, cw, 2.3, C.background1, w0.t + " 카드", { line: { color: HEX.line, width: 1 }, shadow: shadow() });
      await iconCircle(s, x + 0.3, 4.1, 0.75, w0.I, w0.c, w0.t);
      T(s, w0.t, { x: x + 1.2, y: 4.1, w: cw - 1.35, h: 0.75, fontSize: 18, bold: true, color: C.text2, objectName: w0.t + " 제목" });
      T(s, w0.d, { x: x + 0.3, y: 4.98, w: cw - 0.55, h: 0.65, fontSize: 13, color: C.text1, valign: "top", objectName: w0.t + " 설명" });
      let tx = x + 0.3;
      for (const tg of w0.tags) {
        if (tg === "→") { T(s, "→", { x: tx, y: 5.68, w: 0.35, h: 0.34, fontSize: 14, bold: true, color: w0.c, align: "center", objectName: w0.t + " 화살표" }); tx += 0.4; continue; }
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: tx, y: 5.68, w: 0.95, h: 0.34, rectRadius: 0.17, fill: { color: C.background2 }, line: { color: w0.c, width: 1 }, objectName: w0.t + " " + tg });
        T(s, tg, { x: tx, y: 5.68, w: 0.95, h: 0.34, fontSize: 11, bold: true, color: w0.c, align: "center", objectName: w0.t + " " + tg + " 글자" });
        tx += 1.05;
      }
    }
    T(s, "Q. 여러분은 어떤 일을 하는 드론을 만들고 싶나요?", { x: 0.6, y: 6.35, w: 12.1, h: 0.45, fontSize: 16, italic: true, bold: true, color: C.accent1, align: "center", objectName: "발문" });
    notes(s, 5);
  }

  // ========== 7. 마무리 ==========
  pres.addSection({ title: "마무리" });
  {
    const s = pres.addSlide({ masterName: "CLOSING_DARK", sectionTitle: "마무리" });
    s.addText("오늘의 미션: 드론에게 생각하는 법을!", { placeholder: "title" });
    T(s, [
      { text: "드론은 ", options: { color: C.background1 } },
      { text: "하늘을 나는 컴퓨터", options: { color: C.accent1, bold: true } },
      { text: ",  이제는 ", options: { color: C.background1 } },
      { text: "스스로 생각하는 드론", options: { color: C.accent1, bold: true } },
      { text: "의 시대!", options: { color: C.background1 } },
    ], { x: 0.6, y: 1.35, w: 12.1, h: 0.6, fontSize: 20, align: "center", objectName: "한 문장 정리" });
    const steps = [
      { t: "감지", d: "센서로 보고", I: fa.FaEye, c: C.accent2 },
      { t: "판단", d: "코드로 생각하고", I: fa.FaBrain, c: C.accent1 },
      { t: "행동", d: "스스로 움직여요", I: gi.GiDeliveryDrone, c: C.accent3 },
    ];
    const sw = 2.6, gap = 1.3, x0 = (W - (sw * 3 + gap * 2)) / 2;
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i], x = x0 + i * (sw + gap);
      await iconCircle(s, x + (sw - 1.6) / 2, 2.3, 1.6, st.I, st.c, st.t);
      T(s, st.t, { x, y: 4.0, w: sw, h: 0.55, fontSize: 24, bold: true, color: C.background1, align: "center", objectName: st.t + " 단계" });
      T(s, st.d, { x, y: 4.55, w: sw, h: 0.4, fontSize: 15, color: C.background2, align: "center", objectName: st.t + " 설명" });
      if (i < 2) s.addImage({ data: await icon(fa.FaArrowRight, HEX.gray), x: x + sw + (gap - 0.5) / 2, y: 2.85, w: 0.5, h: 0.5, objectName: "단계 화살표 " + (i + 1), altText: "다음 단계" });
    }
    card(s, 2.2, 5.35, 8.93, 1.2, C.background1, "예고 카드", { fill: { color: C.background1, transparency: 90 }, line: { color: C.accent1, width: 1.5 } });
    await iconCircle(s, 2.5, 5.55, 0.8, fa.FaLaptopCode, C.accent1, "예고");
    T(s, [
      { text: "이어서 해 볼 활동", options: { bold: true, color: C.accent1, fontSize: 13, breakLine: true } },
      { text: "리모컨 대신 코딩으로, 드론에게 생각하는 법을 가르쳐요", options: { bold: true, color: C.background1, fontSize: 18 } },
    ], { x: 3.5, y: 5.4, w: 7.5, h: 1.1, objectName: "예고 문장" });
    notes(s, 6);
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
}
main().catch((e) => { console.error(e); process.exit(1); });
