// HTML 슬라이드를 장마다 캡처 (점검용): html-N-start.png(처음 상태), html-N.png(모두 공개)
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const file = path.resolve(process.argv[2]);
  const out = process.argv[3] || ".";
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto("file://" + file);
  await p.mouse.move(960, 1079);
  await p.waitForTimeout(800);
  const n = await p.evaluate(() => document.querySelectorAll(".slide").length);
  for (let i = 0; i < n; i++) {
    await p.evaluate((k) => goStart(k), i);
    await p.waitForTimeout(900);
    await p.screenshot({ path: path.join(out, `html-${i + 1}-start.png`) });
    await p.evaluate((k) => go(k), i);
    await p.waitForTimeout(900);
    await p.screenshot({ path: path.join(out, `html-${i + 1}.png`) });
  }
  await b.close();
  console.log("shots", n);
})();
