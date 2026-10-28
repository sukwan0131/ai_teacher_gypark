// 10분 시범강의 "드론이란?" 공통 슬라이드 생성 스크립트
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

const FONT = "Malgun Gothic";
const HEX = {
  navy: "0B1F3A", ink: "1A2233", white: "FFFFFF", sky: "EEF5FB",
  orange: "FF7A1A", blue: "2E9BDA", teal: "14B8A6", yellow: "FFC233", purple: "7C5CFF", gray: "8A94A6",
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
const img = (f) => path.join(IMG, f);

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
  pres.defineSlideMaster({
    title: "TITLE_DARK",
    background: { color: C.text2 },
    objects: [],
  });
  pres.defineSlideMaster({
    title: "CONTENT",
    background: { color: C.background1 },
    margin: [0.4, 0.6, 0.6, 0.6],
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.9, fontSize: 34, bold: true, color: C.text2, valign: "middle", margin: 0 }, text: "" } },
      { text: { text: "AI 드론 교육  |  드론이란?", options: { x: 0.6, y: 7.0, w: 6, h: 0.3, fontSize: 10, color: C.accent6, margin: 0 } } },
    ],
    slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
  });
  pres.defineSlideMaster({
    title: "CLOSING_DARK",
    background: { color: C.text2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 12.1, h: 0.9, fontSize: 34, bold: true, color: C.background1, valign: "middle", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.accent6, align: "right" },
  });

  // 공통 도우미
  const shadow = () => ({ type: "outer", color: "0B1F3A", opacity: 0.18, blur: 8, offset: 2, angle: 90 });
  async function iconCircle(slide, x, y, d, Comp, fillColor, name) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fillColor }, line: { type: "none" }, objectName: name + " 원" });
    const pad = d * 0.25;
    slide.addImage({ data: await icon(Comp, HEX.white), x: x + pad, y: y + pad, w: d - pad * 2, h: d - pad * 2, objectName: name + " 아이콘", altText: name });
  }

  // ========== 1. 표지 ==========
  pres.addSection({ title: "도입" });
  {
    const s = pres.addSlide({ masterName: "TITLE_DARK", sectionTitle: "도입" });
    s.addImage({ path: img("hero.png"), x: 0, y: 0, w: W, h: 7.5, objectName: "표지 배경 사진", altText: "푸른 하늘을 나는 작은 드론" });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 6.4, h: 7.5, fill: { color: C.text2, transparency: 12 }, line: { type: "none" }, objectName: "제목 배경" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 2.0, w: 3.1, h: 0.5, rectRadius: 0.25, fill: { color: C.accent1 }, line: { type: "none" }, objectName: "태그 배경" });
    s.addText("AI 드론 교육 · 1차시 도입", { x: 0.8, y: 2.0, w: 3.1, h: 0.5, fontSize: 14, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "태그" });
    s.addText("드론, 어디까지\n알고 있니?", { x: 0.8, y: 2.75, w: 5.4, h: 2.0, fontSize: 46, bold: true, color: C.background1, valign: "top", margin: 0, lineSpacingMultiple: 1.05, isTextBox: true, objectName: "표지 제목" });
    s.addText("하늘을 나는 컴퓨터, 드론 이야기", { x: 0.8, y: 4.9, w: 5.4, h: 0.6, fontSize: 20, color: C.background2, margin: 0, isTextBox: true, objectName: "표지 부제" });
    s.addNotes("오늘은 우리가 자주 듣는 드론이 무엇이고, 어디서 일하고, 왜 배워야 하는지 알아볼게요.");
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
    // 연결선 (카드 뒤): 카드 안쪽 모서리 → 원 둘레 45도 지점
    for (const it of items) {
      const left = it.x < cx, top = it.y < cy;
      const ex = left ? it.x + 3.4 : it.x, ey = top ? it.y + 1.2 : it.y;
      const r = d / 2 * 0.7071;
      const px = left ? cx - r : cx + r, py = top ? cy - r : cy + r;
      s.addShape(pres.shapes.LINE, { x: Math.min(ex, px), y: Math.min(ey, py), w: Math.abs(px - ex), h: Math.abs(py - ey), flipV: left !== top, line: { color: C.accent6, width: 1.5, dashType: "dash" }, objectName: it.t + " 연결선" });
    }
    s.addShape(pres.shapes.OVAL, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: C.text2 }, line: { type: "none" }, shadow: shadow(), objectName: "가운데 원" });
    s.addImage({ data: await icon(gi.GiDeliveryDrone, HEX.orange), x: cx - 0.4, y: cy - 0.95, w: 0.8, h: 0.8, objectName: "드론 아이콘", altText: "비행체 아이콘" });
    s.addText("드론", { x: cx - d / 2, y: cy - 0.1, w: d, h: 0.8, fontSize: 36, bold: true, color: C.background1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "가운데 글자" });
    for (const it of items) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: it.x, y: it.y, w: 3.4, h: 1.2, rectRadius: 0.2, fill: { color: C.background2 }, line: { type: "none" }, shadow: shadow(), objectName: it.t + " 카드" });
      await iconCircle(s, it.x + 0.25, it.y + 0.25, 0.7, it.I, it.c, it.t);
      s.addText(it.t, { x: it.x + 1.15, y: it.y + 0.18, w: 2.1, h: 0.45, fontSize: 20, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: it.t + " 제목" });
      s.addText(it.sub, { x: it.x + 1.15, y: it.y + 0.62, w: 2.15, h: 0.4, fontSize: 12, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: it.t + " 설명" });
    }
    s.addText("생각나는 것을 자유롭게 말해 볼까요?", { x: 0.6, y: 6.35, w: 12.1, h: 0.45, fontSize: 16, italic: true, color: C.accent1, align: "center", margin: 0, isTextBox: true, objectName: "발문" });
    s.addNotes("발문: '드론' 하면 무엇이 떠오르나요? 예상 답은 촬영, 택배, 장난감, 드론 쇼입니다. 학생들의 답을 받은 뒤 다음 장으로 넘어갑니다.");
  }

  // ========== 3. 드론이란 ==========
  pres.addSection({ title: "드론이란?" });
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "드론이란?" });
    s.addText("드론이란?", { placeholder: "title" });
    s.addImage({ path: img("bee.png"), x: 0.6, y: 1.5, w: 5.6, h: 4.2, shadow: shadow(), objectName: "수벌과 드론 사진", altText: "꿀벌 옆을 나는 작은 드론" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.85, w: 5.6, h: 0.95, rectRadius: 0.15, fill: { color: C.background2 }, line: { type: "none" }, objectName: "이름 이야기 배경" });
    s.addText([
      { text: "drone = 영어로 '수벌'", options: { bold: true, color: C.text2, fontSize: 16, breakLine: true } },
      { text: "날 때 나는 '웅웅~' 소리가 벌과 닮았어요", options: { color: C.text1, fontSize: 13 } },
    ], { x: 0.85, y: 5.9, w: 5.2, h: 0.85, valign: "middle", margin: 0, isTextBox: true, objectName: "이름 이야기" });

    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.7, y: 1.5, w: 6.0, h: 2.45, rectRadius: 0.2, fill: { color: C.text2 }, line: { type: "none" }, shadow: shadow(), objectName: "정의 카드" });
    s.addText("드론의 뜻", { x: 7.1, y: 1.75, w: 3, h: 0.4, fontSize: 15, bold: true, color: C.accent1, margin: 0, isTextBox: true, objectName: "정의 라벨" });
    s.addText("사람이 타지 않고\n하늘을 나는 비행체", { x: 7.1, y: 2.2, w: 5.4, h: 1.5, fontSize: 30, bold: true, color: C.background1, margin: 0, valign: "middle", isTextBox: true, objectName: "정의" });

    const chips = [
      { t: "멀리서 조종해요", sub: "사람이 리모컨으로", I: fa.FaGamepad, c: C.accent2, x: 6.7 },
      { t: "스스로 날아요", sub: "코드와 센서로", I: fa.FaRobot, c: C.accent1, x: 9.8 },
    ];
    for (const ch of chips) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: ch.x, y: 4.2, w: 2.9, h: 1.35, rectRadius: 0.2, fill: { color: C.background2 }, line: { type: "none" }, objectName: ch.t + " 카드" });
      await iconCircle(s, ch.x + 0.2, 4.5, 0.75, ch.I, ch.c, ch.t);
      s.addText([
        { text: ch.t, options: { bold: true, fontSize: 15, color: C.text2, breakLine: true } },
        { text: ch.sub, options: { fontSize: 12, color: C.text1 } },
      ], { x: ch.x + 1.1, y: 4.3, w: 1.7, h: 1.15, valign: "middle", margin: 0, isTextBox: true, objectName: ch.t });
    }
    s.addText("우리나라 법에서도 드론을 '조종하는 사람이 타지 않고 나는 비행체'라고 정해 두었어요.", { x: 6.7, y: 5.85, w: 6.0, h: 0.95, fontSize: 13, italic: true, color: C.accent6, valign: "middle", margin: 0, isTextBox: true, objectName: "법 한 줄" });
    s.addNotes("드론(drone)은 영어로 '수벌'이라는 뜻이에요. 날 때 나는 '웅웅~' 소리가 벌과 닮아서 이런 이름이 붙었다고 알려져 있어요.\n드론은 '사람이 타지 않고 하늘을 나는 비행체'예요. 사람이 멀리서 조종하기도 하고, 스스로 날기도 해요.\n우리나라 법에서도 드론을 '조종하는 사람이 타지 않고 나는 비행체'라고 정해 두었어요.");
  }

  // ========== 4. 드론의 몸 ==========
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "드론이란?" });
    s.addText("드론의 몸 살펴보기", { placeholder: "title" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.72, y: 1.45, w: 3.9, h: 3.8, rectRadius: 0.25, fill: { color: "1C252C" }, line: { type: "none" }, shadow: shadow(), objectName: "드론 사진 배경" });
    s.addImage({ path: img("eagle_top.png"), x: 4.9, y: 1.6, w: 3.54, h: 3.4, objectName: "이글 드론 위에서 본 모습", altText: "주황색 몸체의 이글 교육용 드론을 위에서 본 모습" });
    const parts = [
      { t: "프로펠러·모터", h: "날개", d: "바람을 일으켜 날게 해요", I: fa.FaFan, c: C.accent2, x: 0.6, y: 1.45 },
      { t: "배터리", h: "심장", d: "날 수 있는 힘을 줘요", I: fa.FaBatteryThreeQuarters, c: C.accent3, x: 0.6, y: 3.45 },
      { t: "비행 제어기", h: "두뇌", d: "계산하고 명령해요", I: fa.FaMicrochip, c: C.accent1, x: 8.95, y: 1.45 },
      { t: "센서", h: "눈·귀", d: "주변을 느껴요", I: fa.FaEye, c: C.accent5, x: 8.95, y: 3.45 },
    ];
    for (const p of parts) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: p.x, y: p.y, w: 3.78, h: 1.8, rectRadius: 0.2, fill: { color: C.background2 }, line: { type: "none" }, objectName: p.t + " 카드" });
      await iconCircle(s, p.x + 0.25, p.y + 0.3, 0.8, p.I, p.c, p.t);
      s.addText(p.t, { x: p.x + 1.25, y: p.y + 0.22, w: 2.4, h: 0.45, fontSize: 18, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: p.t + " 이름" });
      s.addText([
        { text: "사람으로 치면 ", options: { color: C.text1 } },
        { text: p.h, options: { bold: true, color: p.c } },
      ], { x: p.x + 1.25, y: p.y + 0.7, w: 2.4, h: 0.4, fontSize: 14, margin: 0, valign: "middle", isTextBox: true, objectName: p.t + " 비유" });
      s.addText(p.d, { x: p.x + 1.25, y: p.y + 1.12, w: 2.45, h: 0.4, fontSize: 12, color: C.accent6, margin: 0, valign: "middle", isTextBox: true, objectName: p.t + " 역할" });
    }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 5.6, w: 12.1, h: 1.05, rectRadius: 0.2, fill: { color: C.text2 }, line: { type: "none" }, objectName: "핵심 문장 배경" });
    s.addText([
      { text: "눈(센서)과 두뇌(비행 제어기)가 있으니,  드론은 ", options: { color: C.background1 } },
      { text: "하늘을 나는 컴퓨터", options: { color: C.accent1, bold: true } },
      { text: "예요!", options: { color: C.background1 } },
    ], { x: 0.9, y: 5.6, w: 11.5, h: 1.05, fontSize: 20, bold: true, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "핵심 문장" });
    s.addNotes("이글 드론 사진으로 드론의 몸을 살펴봅니다. 프로펠러와 모터는 날개, 배터리는 심장, 비행 제어기는 두뇌, 센서는 눈과 귀예요.\n드론에는 눈(센서)과 두뇌(비행 제어기)가 있어요. 그래서 드론은 하늘을 나는 컴퓨터라고 할 수 있어요.");
  }

  // ========== 5. 활용 사례 ==========
  pres.addSection({ title: "활용 사례" });
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "활용 사례" });
    s.addText("드론은 어디서 일할까?", { placeholder: "title" });
    const cases = [
      { t: "농업", d: "넓은 논밭에 농약·비료 뿌리기", f: "case_agri.png", I: fa.FaSeedling, c: C.accent3 },
      { t: "배송", d: "섬·산골 마을에 물건 배달", f: "case_delivery.png", I: fa.FaBoxOpen, c: C.accent1 },
      { t: "구조", d: "길 잃은 사람 찾기, 불난 곳 살피기", f: "case_rescue.png", I: fa.FaLifeRing, c: "E5484D" },
      { t: "점검", d: "높은 다리·송전탑 살피기", f: "case_inspect.png", I: fa.FaMagnifyingGlass, c: C.accent2 },
      { t: "촬영·공연", d: "영화 촬영, 밤하늘 드론 쇼", f: "case_show.png", I: fa.FaFilm, c: C.accent5 },
      { t: "미래 교통", d: "사람을 태우는 하늘 택시", f: "case_uam.png", I: fa.FaCity, c: C.text2 },
    ];
    const cw = 3.83, gap = 0.3, ih = 1.62, ch = 2.27;
    for (let i = 0; i < cases.length; i++) {
      const k = cases[i];
      const x = 0.6 + (i % 3) * (cw + gap), y = 1.4 + Math.floor(i / 3) * (ch + 0.22);
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: cw, h: ch, fill: { color: C.background2 }, line: { type: "none" }, shadow: shadow(), objectName: k.t + " 카드" });
      s.addImage({ path: img(k.f), x, y, w: cw, h: ih, objectName: k.t + " 사진", altText: k.t + " 분야에서 일하는 드론" });
      await iconCircle(s, x + 0.18, y + ih + 0.12, 0.42, k.I, k.c, k.t);
      s.addText(k.t, { x: x + 0.72, y: y + ih + 0.08, w: cw - 0.85, h: 0.3, fontSize: 15, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: k.t + " 이름" });
      s.addText(k.d, { x: x + 0.72, y: y + ih + 0.36, w: cw - 0.85, h: 0.27, fontSize: 12, color: C.text1, margin: 0, valign: "middle", isTextBox: true, objectName: k.t + " 설명" });
    }
    s.addText([
      { text: "공통점  ", options: { bold: true, color: C.accent1 } },
      { text: "위험하거나 · 멀거나 · 사람이 하기 힘든 일을 대신해요", options: { bold: true, color: C.text2 } },
    ], { x: 0.6, y: 6.33, w: 12.1, h: 0.5, fontSize: 18, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "공통점" });
    s.addNotes("농업: 넓은 논밭에 농약과 비료를 뿌려요. 배송: 섬이나 산골 마을에 물건을 배달해요. 구조: 산에서 길 잃은 사람을 찾고, 불난 곳을 살펴요. 점검: 높은 다리나 송전탑을 살펴요. 촬영·공연: 영화를 찍고, 밤하늘에 드론 라이트 쇼를 해요. 미래 교통: 사람을 태우는 하늘 택시도 준비 중이에요.\n공통점이 보이나요? 드론은 위험하거나, 멀거나, 사람이 하기 힘든 일을 대신해 줘요.\n(사진은 이해를 돕기 위한 AI 생성 이미지입니다.)");
  }

  // ========== 6. 왜 배워야 할까 ==========
  pres.addSection({ title: "배워야 하는 이유" });
  {
    const s = pres.addSlide({ masterName: "CONTENT", sectionTitle: "배워야 하는 이유" });
    s.addText("왜 드론을 배워야 할까?", { placeholder: "title" });
    // 진화 흐름
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.45, w: 5.0, h: 1.55, rectRadius: 0.2, fill: { color: C.background2 }, line: { type: "none" }, objectName: "조종 드론 카드" });
    await iconCircle(s, 0.9, 1.8, 0.85, fa.FaGamepad, C.accent6, "조종 드론");
    s.addText([
      { text: "사람이 조종하는 드론", options: { bold: true, fontSize: 18, color: C.text2, breakLine: true } },
      { text: "리모컨으로 하나하나 움직여요", options: { fontSize: 13, color: C.text1 } },
    ], { x: 2.0, y: 1.55, w: 3.45, h: 1.35, valign: "middle", margin: 0, isTextBox: true, objectName: "조종 드론" });
    s.addImage({ data: await icon(fa.FaArrowRight, HEX.orange), x: 6.27, y: 1.87, w: 0.75, h: 0.75, objectName: "진화 화살표", altText: "오른쪽 화살표" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.7, y: 1.45, w: 5.0, h: 1.55, rectRadius: 0.2, fill: { color: C.text2 }, line: { type: "none" }, shadow: shadow(), objectName: "생각하는 드론 카드" });
    await iconCircle(s, 8.0, 1.8, 0.85, fa.FaBrain, C.accent1, "생각하는 드론");
    s.addText([
      { text: "스스로 생각하는 드론", options: { bold: true, fontSize: 18, color: C.background1, breakLine: true } },
      { text: "장애물을 피하고 길을 찾아요", options: { fontSize: 13, color: C.background2 } },
    ], { x: 9.1, y: 1.55, w: 3.5, h: 1.35, valign: "middle", margin: 0, isTextBox: true, objectName: "생각하는 드론" });
    s.addText([
      { text: "드론이 생각하게 만드는 것 = ", options: { color: C.text2 } },
      { text: "AI와 코딩", options: { color: C.accent1, bold: true } },
    ], { x: 0.6, y: 3.15, w: 12.1, h: 0.5, fontSize: 18, bold: true, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: "AI 문장" });

    const why = [
      { t: "눈으로 보는 AI", d: "내가 만든 코드가 진짜로 날아서 결과를 바로 보여 줘요", I: fa.FaLaptopCode, c: C.accent1 },
      { t: "여러 과목이 한 번에", d: "코딩 + 과학 + 수학이 함께 쓰여요", I: fa.FaPuzzlePiece, c: C.accent2 },
      { t: "미래의 직업", d: "드론 개발자, 조종사, 데이터 분석가 등 새로운 직업이 생겨요", I: fa.FaBriefcase, c: C.accent3 },
    ];
    const cw = 3.83;
    for (let i = 0; i < why.length; i++) {
      const w0 = why[i], x = 0.6 + i * (cw + 0.3);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.85, w: cw, h: 2.2, rectRadius: 0.2, fill: { color: C.background1 }, line: { color: "D9E3EE", width: 1 }, shadow: shadow(), objectName: w0.t + " 카드" });
      await iconCircle(s, x + 0.3, 4.1, 0.8, w0.I, w0.c, w0.t);
      s.addText(w0.t, { x: x + 1.25, y: 4.1, w: cw - 1.4, h: 0.8, fontSize: 18, bold: true, color: C.text2, margin: 0, valign: "middle", isTextBox: true, objectName: w0.t + " 제목" });
      s.addText(w0.d, { x: x + 0.3, y: 5.05, w: cw - 0.55, h: 0.85, fontSize: 14, color: C.text1, margin: 0, valign: "top", isTextBox: true, objectName: w0.t + " 설명" });
    }
    s.addText("여러분은 어떤 일을 하는 드론을 만들고 싶나요?", { x: 0.6, y: 6.3, w: 12.1, h: 0.45, fontSize: 16, italic: true, color: C.accent1, align: "center", margin: 0, isTextBox: true, objectName: "발문" });
    s.addNotes("앞으로의 드론은 사람이 조종하지 않아도 스스로 장애물을 피하고, 길을 찾아요. 이렇게 생각하게 만드는 것이 AI와 코딩이에요.\n드론을 배우면 좋은 점은 세 가지예요. 내가 만든 코드가 진짜로 날아서 결과를 바로 보여 주고, 코딩·과학·수학이 함께 쓰이고, 드론 개발자처럼 새로운 직업이 생기고 있어요.\n발문: 여러분은 어떤 일을 하는 드론을 만들고 싶나요?");
  }

  // ========== 7. 마무리 ==========
  pres.addSection({ title: "마무리" });
  {
    const s = pres.addSlide({ masterName: "CLOSING_DARK", sectionTitle: "마무리" });
    s.addText("오늘의 미션: 드론에게 생각하는 법을!", { placeholder: "title" });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 1.65, w: 5.2, h: 4.6, rectRadius: 0.25, fill: { color: "1C252C" }, line: { type: "none" }, objectName: "드론 사진 배경" });
    s.addImage({ path: img("eagle_top.png"), x: 1.0, y: 1.85, w: 4.4, h: 4.22, objectName: "이글 드론 사진", altText: "주황색 몸체의 이글 교육용 드론" });
    const steps = [
      { t: "감지", d: "센서로 보고", I: fa.FaEye, c: C.accent2 },
      { t: "판단", d: "코드로 생각하고", I: fa.FaBrain, c: C.accent1 },
      { t: "행동", d: "스스로 움직여요", I: gi.GiDeliveryDrone, c: C.accent3 },
    ];
    for (let i = 0; i < steps.length; i++) {
      const st = steps[i], x = 6.55 + i * 2.15;
      await iconCircle(s, x + 0.2, 1.85, 1.35, st.I, st.c, st.t);
      s.addText(st.t, { x, y: 3.35, w: 1.75, h: 0.5, fontSize: 22, bold: true, color: C.background1, align: "center", margin: 0, isTextBox: true, objectName: st.t + " 단계" });
      s.addText(st.d, { x, y: 3.85, w: 1.75, h: 0.4, fontSize: 14, color: C.background2, align: "center", margin: 0, isTextBox: true, objectName: st.t + " 설명" });
      if (i < 2) s.addImage({ data: await icon(fa.FaArrowRight, HEX.gray), x: x + 1.82, y: 2.33, w: 0.38, h: 0.38, objectName: "단계 화살표 " + (i + 1), altText: "다음 단계" });
    }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.55, y: 4.65, w: 6.15, h: 1.6, rectRadius: 0.2, fill: { color: C.background1, transparency: 90 }, line: { color: C.accent1, width: 1.5 }, objectName: "정리 카드" });
    s.addText([
      { text: "드론은 하늘을 나는 컴퓨터!", options: { bold: true, color: C.background1, fontSize: 20, breakLine: true } },
      { text: "이제는 스스로 생각하는 드론의 시대예요", options: { bold: true, color: C.accent1, fontSize: 18 } },
    ], { x: 6.85, y: 4.75, w: 5.6, h: 1.4, valign: "middle", margin: 0, isTextBox: true, objectName: "한 문장 정리" });
    s.addNotes("한 문장 정리: 드론은 하늘을 나는 컴퓨터이고, 이제는 스스로 생각하는 드론의 시대예요.\n본 수업 예고: 오늘 우리는 드론을 조종하는 게 아니라, 코딩으로 드론에게 생각하는 법을 가르쳐 볼 거예요!");
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log("written", OUT);
}
main().catch((e) => { console.error(e); process.exit(1); });
