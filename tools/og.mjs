// node tools/og.mjs
// assets/img/og.png（SNS で共有したときの画像、1200×630）を src/content.mjs から作り直す。
// 左に名前と紹介、右に主な作品（アイコン・名前・ひとこと・状態）。作品を足したら、これを実行してからビルドする。
// Chrome をヘッドレスで開いて撮る。Chrome の場所が違うときは CHROME=… で渡す。
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as C from "../src/content.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets", "img", "og.png");
const W = 1200;
const H = 630;
const CHROME =
  process.env.CHROME ||
  {
    win32: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  }[process.platform] ||
  "google-chrome";

const L = "ja";
const tx = (v) => (v && typeof v === "object" && "ja" in v ? v[L] : v);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const file = (p) => pathToFileURL(join(ROOT, p)).href;

// 明朝は名前とアプリ名だけなので、その字だけを取り寄せる。
const works = C.groups.flatMap((g) => g.works.map((id) => C.works[id]));
const minchoText = [...new Set((tx(C.profile.name) + works.filter((w) => w.wordmark).map((w) => w.name).join("")).replace(/\s/g, ""))].join("");
const fonts = [
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=block",
  `https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@700&text=${encodeURIComponent(minchoText)}&display=block`,
];

// クラスは og- で始める（site.css の .n や .ln とぶつからないように）。
const row = (w) => `<li>
      <img class="app-icon" src="${file(`assets/img/${w.icon}`)}" alt="" width="36" height="36">
      <span class="og-text"><span class="og-name${w.wordmark ? " wordmark" : ""}">${esc(w.name)}</span><span class="og-one">${esc(tx(w.oneLine))}</span></span>
      <span class="status s-${w.status}">${esc(tx(C.ui.status[w.status]))}</span>
    </li>`;
const group = (g) => `<p class="og-group">${esc(tx(g.label))}</p>
  <ul>${g.works.map((id) => row(C.works[id])).join("")}</ul>`;
const arrow = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
${fonts.map((href) => `<link rel="stylesheet" href="${href}">`).join("\n")}
<link rel="stylesheet" href="${file("assets/site.css")}">
<style>
  html, body { width: ${W}px; height: ${H}px; margin: 0; overflow: hidden; background: var(--paper); }
  .og { display: grid; grid-template-columns: 560px 476px; justify-content: space-between; box-sizing: border-box; width: ${W}px; height: ${H}px; padding: 85px 40px 0; font-family: var(--font-latin), var(--font-ja), sans-serif; color: var(--ink); }
  .og-kicker { margin: 10px 0 0; font-size: 14px; font-weight: 600; letter-spacing: 0.04em; line-height: 1.5; color: var(--accent); }
  .og-me { margin: 16px 0 0; font-family: var(--font-mincho); font-weight: 700; font-size: 150px; line-height: 1; letter-spacing: 0.08em; white-space: nowrap; }
  .og-roman { margin: 26px 0 0; font-size: 15px; letter-spacing: 0.06em; color: var(--muted); }
  .og-intro { margin: 30px 0 0; font-size: 19.5px; line-height: 1.75; word-break: auto-phrase; line-break: strict; }
  .og-links { display: flex; gap: 30px; margin: 34px 0 0; font-size: 16px; font-weight: 600; color: var(--accent); }
  .og-links span { display: inline-flex; align-items: center; gap: 3px; }
  .og-links svg { width: 13px; height: 13px; }
  .og-side { border-top: 1.5px solid var(--ink); }
  .og-head { margin: 12px 0 6px; font-size: 13px; font-weight: 700; }
  .og-group { margin: 12px 0 4px; font-size: 12px; color: var(--faint); }
  .og-side ul { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
  .og-side li { display: grid; grid-template-columns: 36px minmax(0, 1fr) auto; align-items: center; gap: 14px; height: 51px; border-bottom: 1px solid var(--line); }
  .og-text { display: flex; flex-direction: column; min-width: 0; line-height: 1.35; }
  .og-name { font-size: 15px; font-weight: 700; }
  .og-name.wordmark { font-size: 16.5px; letter-spacing: 0.1em; }
  .og-one { overflow: hidden; font-size: 12.5px; color: var(--muted); text-overflow: ellipsis; white-space: nowrap; }
</style>
</head>
<body>
<div class="og">
  <div>
    <p class="og-kicker">${esc(tx(C.profile.affiliation))}</p>
    <p class="og-me">${esc(tx(C.profile.name))}</p>
    <p class="og-roman">${esc(C.profile.roman)}</p>
    <p class="og-intro">${tx(C.profile.intro)}</p>
    <p class="og-links">${C.profile.links.map((l) => `<span>${esc(l.label)}${arrow}</span>`).join("")}<span>${esc(tx(C.ui.email))}</span></p>
  </div>
  <div class="og-side">
    <p class="og-head">${esc(tx(C.ui.pages.mainWorks))}</p>
    ${C.groups.map(group).join("\n    ")}
  </div>
</div>
</body>
</html>`;

// ---------- 撮る（DevTools プロトコルで、フォントが揃うのを待ってから） ----------
const dir = mkdtempSync(join(tmpdir(), "og-"));
const page = join(dir, "og.html");
writeFileSync(page, html);
const port = 9400 + Math.floor(Math.random() * 400);
const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${join(dir, "profile")}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    try {
      target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
    } catch {}
    if (!target) await sleep(200);
  }
  if (!target) throw new Error(`Chrome が開けなかった（${CHROME}）`);
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const waiting = new Map();
  let loaded = false;
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && waiting.has(m.id)) waiting.get(m.id)(m.result);
    if (m.method === "Page.loadEventFired") loaded = true;
  });
  const send = (method, params = {}) => new Promise((r) => { waiting.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: pathToFileURL(page).href });
  for (let i = 0; i < 150 && !loaded; i++) await sleep(100);
  await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });
  await sleep(300);
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  writeFileSync(OUT, Buffer.from(shot.data, "base64"));
  console.log(`${OUT} (${W}×${H})`);
  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  try { rmSync(dir, { recursive: true, force: true }); } catch {}
}
