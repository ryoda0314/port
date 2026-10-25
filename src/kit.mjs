// 1枚の版（build.mjs）と階層の版（build-pages.mjs）が共通に使う部品。
// kit(言語, サイトの根までの相対パス, { workHref }) が、その言語・その深さのページ用の部品を返す。
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as C from "./content.mjs";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const OTO_LINES = JSON.parse(readFileSync(join(ROOT, "src", "oto-lines.json"), "utf8"));
// 作ってきたもの（点ひとつが作品ひとつ）。vault の作品ノートと、その後の ことのは・ことのおと・ことのえだ、この PC のフォルダから足したもの。
export const TIMELINE = JSON.parse(readFileSync(join(ROOT, "src", "timeline.json"), "utf8"));
// 最初の点は 2025年7月（韓国語を始めた月の、手作りの道具と Poly-Lang）。列の数は月の数から決まる（CSS の --cols）。
const CHART_FROM = "2025-07";
const CHART_TO = "2026-10";

export const PAGES = {
  ja: { dir: "", base: "", hreflang: "ja" },
  en: { dir: "en", base: "../", hreflang: "en" },
  ko: { dir: "ko", base: "../", hreflang: "ko" },
};
export const LANG_NAMES = { ja: "日本語", en: "English", ko: "한국어" };

// Google Fonts. 明朝は名前とアプリ名にしか使わないので、その文字だけを取り寄せる。
const MINCHO_TEXT = [...new Set("塚本 諒ことのあめことのはことのおとことのねことのえだ言の雨言の葉言の音言の根言の枝雨が来ています覚えた語を、打ってあつめる".replace(/\s/g, ""))].join("");
const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=IBM+Plex+Sans+KR:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500&display=swap";
const MINCHO_CSS = `https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@700&text=${encodeURIComponent(MINCHO_TEXT)}&display=swap`;
// ことのね の漢字は、アプリと同じく韓国の明朝（Noto Serif KR）で。デモに出る字だけを取り寄せる。
const HANJA_TEXT = [
  ...new Set(
    Object.keys(C.demos.ne.chars).join("") +
      Object.values(C.demos.ne.chars).map((c) => c.jp || "").join("") +
      Object.values(C.demos.ne.words).map((w) => w.hanja + w.jp).join("")
  ),
].join("");
const HANJA_CSS = `https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500&text=${encodeURIComponent(HANJA_TEXT)}&display=swap`;

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const ICON = {
  arrow: '<svg class="i" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  play: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5.2v9.6L14.6 10Z" fill="currentColor"/></svg>',
  pause: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5h2v10H7zM11 5h2v10h-2z" fill="currentColor"/></svg>',
  soundOff: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8h3l4-3v10l-4-3H4Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m14 8 4 4m0-4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  soundOn: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8h3l4-3v10l-4-3H4Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 7.5a3.5 3.5 0 0 1 0 5M16 5.5a6.5 6.5 0 0 1 0 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  speaker: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8h3l4-3v10l-4-3H4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 7.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  drop: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 3v6M12 6v8M16.5 4v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  replay: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10a5.5 5.5 0 1 0 1.8-4.1M4.5 4v3.4h3.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  copy: '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 12.5V5.5A1.5 1.5 0 0 1 5.5 4h7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
};

// ことのおと の PitchLines と同じ寸法：5本の罫（下が低く上が高い）、数字は出さない。
const PW = 320;
const PH = 120;
const PAD_X = 10;
const TOP = 5.8;
const BOTTOM = 0.5;
const py = (level) => ((TOP - Math.max(BOTTOM, Math.min(TOP, level))) / (TOP - BOTTOM)) * PH;
function pitchPath(line) {
  const n = line.length;
  let d = "";
  let open = false;
  line.forEach((v, k) => {
    if (v === null) {
      open = false;
      return;
    }
    const x = PAD_X + (n > 1 ? k / (n - 1) : 0.5) * (PW - 2 * PAD_X);
    d += `${open ? "L" : "M"}${x.toFixed(1)} ${py(v).toFixed(1)}`;
    open = true;
  });
  return d;
}

// 固定の種から作る乱数（毎回同じ絵になる）。
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// ことのあめ の Rain と同じ雨すじ。
function streaks() {
  const rand = seeded(7);
  return Array.from({ length: 30 }, (_, i) => {
    const near = i % 3 === 0;
    const left = Math.round(rand() * 1000) / 10;
    const len = Math.round(near ? 70 + rand() * 60 : 30 + rand() * 30);
    const width = near ? 1.5 : 1;
    const opacity = Math.round((near ? 0.45 + rand() * 0.2 : 0.22 + rand() * 0.15) * 100) / 100;
    const dur = Math.round((near ? 0.75 + rand() * 0.3 : 1.25 + rand() * 0.4) * 100) / 100;
    const delay = -Math.round(rand() * 200) / 100;
    const color = rand() < 0.8 ? "var(--rain-sky)" : "var(--rain-violet)";
    return `<span style="left:${left}%;height:${len}px;width:${width}px;opacity:${opacity};--c:${color};animation-duration:${dur}s;animation-delay:${delay}s"></span>`;
  }).join("");
}

function monthsBetween(from, to) {
  const out = [];
  let [y, m] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  while (y < ty || (y === ty && m <= tm)) {
    out.push(`${y}-${String(m).padStart(2, "0")}`);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out;
}

export function kit(L, B, opt = {}) {
  // 作品へのリンク先：1枚の版ではページの中の #id、階層の版では作品のページ。
  const workHref = opt.workHref || ((id) => `#${id}`);
  // 日本語では、英数字と和文のあいだの空白で改行しない（「AI / エージェント」のような割れを防ぐ）。
  const keepTogether = (s) =>
    typeof s !== "string"
      ? s
      : s
          .replace(/([A-Za-z0-9.)）%]) (?=[\u3040-\u30ff\u3400-\u9fff「（])/g, "$1\u00a0")
          .replace(/([\u3040-\u30ff\u3400-\u9fff」）、。]) (?=[A-Za-z0-9(（])/g, "$1\u00a0");
  const tx = (v) => {
    const s = v && typeof v === "object" && "ja" in v ? v[L] : v;
    return L === "ja" ? keepTogether(s) : s;
  };
  const ext = (href, label, cls = "") =>
    `<a${cls ? ` class="${cls}"` : ""} href="${esc(href)}" target="_blank" rel="noopener">${label}<span class="sr-only">${esc(tx(C.ui.external))}</span>${ICON.arrow}</a>`;
  const status = (key) => `<span class="status s-${key}">${esc(tx(C.ui.status[key]))}</span>`;
  const iconImg = (file, size, cls = "app-icon", alt = "") =>
    `<img class="${cls}" src="${B}assets/img/${file}" alt="${esc(alt)}" width="${size}" height="${size}" loading="lazy" decoding="async">`;
  const monthLabel = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    if (L === "ja") return `${y}年${m}月`;
    if (L === "ko") return `${y}년 ${m}월`;
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  };
  const shortMonth = (ym) => {
    const [y, m] = ym.split("-").map(Number);
    if (L === "ja") return `${m}月`;
    if (L === "ko") return `${m}월`;
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  };
  const dayLabel = (ymd) => {
    const [y, m, d] = ymd.split("-").map(Number);
    if (L === "ja") return `${y}年${m}月${d}日`;
    if (L === "ko") return `${y}년 ${m}월 ${d}일`;
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  };
  const nameAttr = (w) => (w.wordmark && L !== "ja" ? ' lang="ja"' : "");
  const meta = (w) =>
    `<p class="scene-meta"><span class="period">${esc(w.period)}</span>${status(w.status)}<span>${esc(tx(w.platform))}</span>${
      w.extraMeta ? `<span>${esc(tx(w.extraMeta))}</span>` : ""
    }</p>`;
  const links = (list) => (list && list.length ? `<p class="work-links">${list.map((l) => ext(l.href, esc(tx(l.label)))).join("")}</p>` : "");
  const tech = (list) => `<p class="tech"><span class="tech-label">${esc(tx(C.ui.builtWith))}</span>${list.map((x) => `<span>${esc(x)}</span>`).join("")}</p>`;

  // ---------- head ----------
  // path：このページの、言語のフォルダからの位置（"" はトップ、"works/kotonoame/" など）。redirect は日本語のトップだけ。
  function headTags({ title = tx(C.profile.pageTitle), desc = tx(C.profile.description), path = "", redirect = false } = {}) {
    const abs = (p) => (C.SITE_URL ? new URL(p, C.SITE_URL).href : null);
    const langDir = (k) => (PAGES[k].dir ? `${PAGES[k].dir}/` : "");
    const pagePath = langDir(L) + path;
    const alternates = C.SITE_URL
      ? Object.entries(PAGES)
          .map(([k, v]) => `<link rel="alternate" hreflang="${v.hreflang}" href="${abs(langDir(k) + path)}">`)
          .join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${abs(path)}">`
      : "";
    const og = [
      `<meta property="og:type" content="website">`,
      `<meta property="og:title" content="${esc(title)}">`,
      `<meta property="og:description" content="${esc(desc)}">`,
      `<meta property="og:locale" content="${{ ja: "ja_JP", en: "en_US", ko: "ko_KR" }[L]}">`,
      C.SITE_URL ? `<meta property="og:url" content="${abs(pagePath)}">` : "",
      C.SITE_URL ? `<meta property="og:image" content="${abs("assets/img/og.png")}">` : "",
      `<meta name="twitter:card" content="summary_large_image">`,
    ]
      .filter(Boolean)
      .join("\n");

    // 初めて来た人を、ブラウザの言語のページへ（日本語のトップだけ。選んだ言語は覚えておく）。
    const script =
      L === "ja" && redirect
        ? `<script>(function(){try{if(/bot|crawl|spider|slurp|preview/i.test(navigator.userAgent))return;var s=localStorage.getItem("lang");if(s){if(s==="en"||s==="ko")location.replace(s+"/");return}var n=((navigator.languages&&navigator.languages[0])||navigator.language||"").toLowerCase();if(!n||n.indexOf("ja")===0)return;location.replace(n.indexOf("ko")===0?"ko/":"en/")}catch(e){}})();</script>`
        : "";

    return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#fcfbf8">
${og}
${alternates}
<link rel="icon" href="${B}assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONT_CSS}">
<link rel="stylesheet" href="${MINCHO_CSS}">
<link rel="stylesheet" href="${HANJA_CSS}">
<link rel="stylesheet" href="${B}assets/site.css">
${script}`.replace(/\n{2,}/g, "\n");
  }

  // ---------- header ----------
  // nav：[{ href, label, current }]。言語の切り替えは、同じページの別の言語へ。
  function header({ brandHref = "#top", nav, path = "" }) {
    const langHref = (to) => (to === L ? "./" : `${B}${to === "ja" ? "" : `${to}/`}${path}`);
    return `<header class="top">
  <div class="wrap top-in">
    <a class="brand" href="${brandHref}">${
      L === "ja"
        ? `<span class="brand-name">${esc(tx(C.profile.name))}</span><span class="brand-roman">${esc(C.profile.roman)}</span>`
        : `<span class="brand-name brand-latin">${esc(C.profile.roman)}</span>`
    }</a>
    <nav class="nav" aria-label="${esc(tx(C.ui.navLabel))}">
      ${nav.map((n) => `<a href="${n.href}"${n.current ? ' aria-current="page"' : ""}>${esc(n.label)}</a>`).join("\n      ")}
    </nav>
    <nav class="lang" aria-label="${esc(tx(C.ui.langLabel))}">
      ${Object.keys(PAGES)
        .map((k) => `<a href="${langHref(k)}" hreflang="${k}" lang="${k}" data-lang="${k}"${k === L ? ' aria-current="page"' : ""}>${LANG_NAMES[k]}</a>`)
        .join("")}
    </nav>
  </div>
</header>`;
  }

  // ---------- hero ----------
  // 点の雨：月ごとの柱に、その月に始めた作品が一つずつ降って積もる。下の点から先に着く（上の点は下の点の上に落ちる）。
  function rainChart() {
    const months = monthsBetween(CHART_FROM, CHART_TO);
    const byMonth = Object.fromEntries(months.map((k) => [k, []]));
    for (const it of TIMELINE) if (byMonth[it.month]) byMonth[it.month].push(it);
    const total = months.reduce((n, k) => n + byMonth[k].length, 0);
    const max = Math.max(...months.map((k) => byMonth[k].length));
    const rand = seeded(11);
    const tone = (st) => (st === "live" ? "live" : st === "dev" || st === "done" ? "making" : "resting");
    const cols = months
      .map((k, ci) => {
        const items = byMonth[k];
        const cells = items
          .map((it, i) => {
            // 落ちる高さはばらばら、時間は重力どおり √高さ に比例。下の点ほど先に着く。
            const h = Math.round((max - i) * 18 + 70 + rand() * 110);
            const t = (0.2 + Math.sqrt(h) / 32).toFixed(2);
            const d = (0.2 + i * 0.1 + rand() * 0.22).toFixed(2);
            const name = it.name ?? tx(C.chart.hidden);
            const attrs = `data-name="${esc(name)}" data-when="${esc(monthLabel(k))}" data-status="${esc(tx(C.ui.status[it.status]))}" style="--h:${h}px;--t:${t}s;--d:${d}s"`;
            if (it.main) {
              const w = C.works[it.main];
              return `<a class="rc-cell rc-icon" href="${workHref(it.main)}" ${attrs}><img src="${B}assets/img/${w.icon}" alt="${esc(w.name)}" width="24" height="24" decoding="async"></a>`;
            }
            return `<span class="rc-cell rc-dot t-${tone(it.status)}" ${attrs}></span>`;
          })
          .join("");
        const [y, m] = k.split("-").map(Number);
        const year = m === 1 || ci === 0 ? `<span class="rc-year">${y}</span>` : "";
        // 狭い画面では「8月」を「8」に縮める（年は下の段にある）。
        return `<li class="rc-col"><span class="rc-n">${items.length || ""}</span><span class="rc-stack">${cells}</span><span class="rc-month"><span class="m-long">${esc(
          shortMonth(k)
        )}</span><span class="m-short" aria-hidden="true">${m}</span>${year}</span></li>`;
      })
      .join("");
    const summary = months.map((k) => `${monthLabel(k)} ${byMonth[k].length}`).join("、");
    const legend = Object.entries(C.chart.legend)
      .map(([k, v]) => `<li><i class="rc-key t-${k}" aria-hidden="true"></i>${esc(tx(v))}</li>`)
      .join("");
    return `<figure class="rain-chart" aria-labelledby="rc-label">
    <div class="rc-head">
      <p class="rc-total" id="rc-label"><span class="rc-num">${total}</span><span class="rc-label">${esc(tx(C.chart.label))}</span></p>
      <p class="rc-note">${esc(tx(C.chart.note))}</p>
      <ul class="rc-legend">${legend}</ul>
    </div>
    <div class="rc-plot">
      <div class="rc-sky"><ol class="rc-cols" style="--cols:${months.length}">${cols}</ol></div>
      <div class="rc-tip" aria-hidden="true" hidden><span class="rc-tip-name"></span><span class="rc-tip-meta"></span></div>
    </div>
    <p class="sr-only">${esc(tx(C.chart.summary))}: ${esc(summary)}</p>
  </figure>`;
  }

  // 名前と紹介、その下に点の雨。主な作品の目次は点の中のアイコンが兼ねる。
  const hero = () => `<section class="hero" id="top" aria-labelledby="name">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-main">
        <p class="kicker">${esc(tx(C.profile.affiliation))}</p>
        <h1 class="name${L === "ja" ? "" : " name-latin"}" id="name">${esc(tx(C.profile.name))}</h1>
        ${L === "ja" ? `<p class="roman">${esc(C.profile.roman)}</p>` : ""}
      </div>
      <div class="hero-side">
        <p class="intro">${tx(C.profile.intro)}</p>
        <ul class="hero-links">
          ${C.profile.links.map((l) => `<li>${ext(l.href, esc(l.label))}</li>`).join("\n          ")}
          <li><a href="#contact">${esc(tx(C.ui.email))}</a></li>
        </ul>
      </div>
    </div>
    ${rainChart()}
  </div>
</section>`;

  // ---------- media ----------
  const toggleButton = () =>
    `<button type="button" class="ctl" data-act="toggle" data-play="${esc(tx(C.ui.play))}" data-pause="${esc(tx(C.ui.pause))}" aria-label="${esc(
      tx(C.ui.play)
    )}">${ICON.play}${ICON.pause}</button>`;
  const videoTag = (m) =>
    `<video src="${B}${m.src}" poster="${B}${m.poster}" width="${m.width}" height="${m.height}" muted loop playsinline preload="none" controls aria-label="${esc(
      tx(m.label)
    )}"></video>`;

  function video(m) {
    return `<div class="video video-${m.ratio}" data-video>
          ${videoTag(m)}
          <div class="video-ctl" hidden>
            ${toggleButton()}
            <button type="button" class="ctl" data-act="sound" data-on="${esc(tx(C.ui.soundOn))}" data-off="${esc(tx(C.ui.soundOff))}" aria-label="${esc(
              tx(C.ui.soundOn)
            )}" aria-pressed="false">${ICON.soundOff}${ICON.soundOn}</button>
          </div>
        </div>`;
  }

  // スマホの画面の映像：紺の枠の中に画面、横に場面の名前（再生中の場面に印。押すとそこから流れる）。
  // 音がないので音のボタンはなく、止めるボタンは画面にかぶせず、場面の名前の下に置く。
  function phoneMedia(m) {
    const chapters = m.chapters
      .map(
        (c) =>
          `<li><button type="button" data-at="${c.at}"><span class="ch-clock">${esc(c.clock)}</span><span class="ch-name">${esc(tx(c.name))}</span><span class="ch-note">${esc(
            tx(c.note)
          )}</span></button></li>`
      )
      .join("");
    return `<div class="phone-stage" data-video>
          <div class="phone">${videoTag(m)}</div>
          <div class="phone-side">
            <ol class="chapters" data-chapters>${chapters}</ol>
            <div class="video-ctl" hidden>${toggleButton()}</div>
          </div>
        </div>`;
  }

  function ameDemo() {
    const D = C.demos.ame;
    const S = (k) => esc(tx(D.strings[k]));
    const first = D.first[L];
    return `<div class="demo demo-ame" data-demo="ame" lang="${L}">
          <div class="app-bar">${iconImg("kotonoame.png", 28, "app-bar-icon")}<span class="app-name" lang="ja">ことのあめ</span><span class="app-here">${S("tab")}</span></div>
          <div class="seg" role="group" aria-label="${S("sources")}">
            ${["ko", "en", "zh"].map((k) => `<button type="button" data-rain="${k}" aria-pressed="${k === first}">${esc(tx(D.rains[k].label))}</button>`).join("")}
          </div>
          <div class="ame-stage">
            <div class="ame-intro">
              <div class="ame-sky" aria-hidden="true"><div class="streaks">${streaks()}</div><img class="sprout" src="${B}assets/img/sprout.png" alt="" width="80" height="139" loading="lazy"></div>
              <p class="ame-intro-title">${S("introTitle")}</p>
              <p class="ame-intro-meta">${S("introMeta")}</p>
              <div class="demo-actions"><button type="button" class="btn" data-act="start">${ICON.drop}<span>${S("start")}</span></button><span class="demo-note">${S("soundNote")}</span></div>
            </div>
            <div class="ame-run" hidden>
              <p class="ame-badge">${S("fresh")}</p>
              <ul class="ame-list" aria-live="polite"></ul>
              <div class="ame-after" hidden>
                <button type="button" class="btn-quiet" data-act="reveal">${S("reveal")}</button>
                <div class="ame-answer" hidden>
                  <p class="ame-answer-label">${S("revealed")}</p>
                  <p class="ame-answer-main"><span class="mark" data-pattern></span><span class="ame-fn">${S("function")}</span></p>
                  <p class="ame-answer-note">${S("answerNote")}</p>
                </div>
                <button type="button" class="btn-quiet" data-act="again">${ICON.replay}${S("again")}</button>
              </div>
            </div>
          </div>
        </div>`;
  }

  function otoDemo() {
    const D = C.demos.oto;
    const S = (k) => esc(tx(D.strings[k]));
    const word = (id) => {
      const w = OTO_LINES[id];
      return `<button type="button" class="oto-word" data-word="${id}"><span class="hanzi" lang="zh-CN">${esc(w.hanzi)}</span><span class="pinyin" lang="zh-Latn-pinyin">${esc(
        w.pinyin
      )}</span><span class="wgloss">${esc(tx(D.glosses[id]))}</span></button>`;
    };
    const [a, b] = D.pairs[0];
    const v0 = D.voices[0];
    return `<div class="demo demo-oto" data-demo="oto" lang="${L}">
          <div class="app-bar">${iconImg("kotonooto.png", 28, "app-bar-icon")}<span class="app-name" lang="ja">ことのおと</span></div>
          <ol class="oto-steps">${D.strings.steps.map((s, i) => `<li${i === 0 ? ' aria-current="step"' : ""}>${esc(tx(s))}</li>`).join("")}</ol>
          <p class="oto-lead">${S("lead")}</p>
          <div class="demo-actions"><button type="button" class="btn" data-act="start">${ICON.speaker}<span>${S("start")}</span></button></div>
          <p class="demo-note">${S("soundNote")}</p>
          <ul class="oto-pairs">
            ${D.pairs.map(([x, y]) => `<li class="oto-pair">${word(x)}${word(y)}</li>`).join("\n            ")}
          </ul>
          <figure class="oto-line">
            <figcaption><span>${S("lineTitle")}</span><span data-voice>${S("voice")}：${esc(v0.name)}（${S(v0.sex === "f" ? "female" : "male")}）</span></figcaption>
            <svg viewBox="0 0 ${PW} ${PH}" preserveAspectRatio="none" role="img" aria-label="${esc(OTO_LINES[a].hanzi)}${S("lineLabel")}">
              ${[1, 2, 3, 4, 5].map((lv) => `<line class="rule" x1="0" x2="${PW}" y1="${py(lv).toFixed(1)}" y2="${py(lv).toFixed(1)}"/>`).join("")}
              <path class="partner" d="${pitchPath(OTO_LINES[b].lines[v0.id])}" vector-effect="non-scaling-stroke"/>
              <path class="model" d="${pitchPath(OTO_LINES[a].lines[v0.id])}" vector-effect="non-scaling-stroke"/>
            </svg>
            <ul class="legend">
              <li class="k-model">${S("model")} <span lang="zh-CN" data-model>${esc(OTO_LINES[a].hanzi)}</span></li>
              <li class="k-partner">${S("partner")} <span lang="zh-CN" data-partner>${esc(OTO_LINES[b].hanzi)}</span></li>
            </ul>
          </figure>
          <p class="oto-diff" hidden>${S("difference")}</p>
        </div>`;
  }

  // ことのね の最初の画面の絵（アプリの Sprout と同じ形）：地面の上に二枚の葉、下に根。
  const SPROUT = `<svg class="ne-sprout" viewBox="0 0 200 168" aria-hidden="true">
              <defs>
                <linearGradient id="ne-leaf-a" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2fb67c"/><stop offset="1" stop-color="#b6ead2"/></linearGradient>
                <linearGradient id="ne-leaf-b" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#4ea7fd"/><stop offset="1" stop-color="#c9e3ff"/></linearGradient>
                <linearGradient id="ne-root" gradientUnits="userSpaceOnUse" x1="0" y1="92" x2="0" y2="156"><stop offset="0" stop-color="#a792fa"/><stop offset="1" stop-color="#e79dfa" stop-opacity="0.15"/></linearGradient>
              </defs>
              <g class="ne-sprout-roots" stroke="url(#ne-root)" stroke-width="2.4" stroke-linecap="round" fill="none">
                <path pathLength="1" d="M100 92 V150"/>
                <path pathLength="1" d="M100 100 C 92 112, 80 118, 70 140"/>
                <path pathLength="1" d="M100 100 C 108 112, 120 118, 130 140"/>
                <path pathLength="1" d="M84 118 C 76 122, 66 124, 54 128"/>
                <path pathLength="1" d="M116 118 C 124 122, 134 124, 146 128"/>
                <path pathLength="1" d="M100 124 C 96 132, 92 136, 88 152"/>
              </g>
              <path d="M30 92 H170" stroke="#d4d9e1" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M100 92 V58" stroke="#172033" stroke-width="2.6" stroke-linecap="round"/>
              <path class="ne-leaf-a" d="M100 70 C 94 46, 72 34, 46 38 C 52 62, 72 76, 100 70 Z" fill="url(#ne-leaf-a)"/>
              <path class="ne-leaf-b" d="M100 62 C 108 40, 128 30, 154 34 C 148 56, 128 68, 100 62 Z" fill="url(#ne-leaf-b)"/>
            </svg>`;

  function neDemo() {
    const D = C.demos.ne;
    const S = (k) => esc(tx(D.strings[k]));
    return `<div class="demo demo-ne" data-demo="ne" lang="${L}">
          <div class="app-bar">${iconImg("kotonone.png", 28, "app-bar-icon")}<span class="app-name" lang="ja">ことのね</span><span class="app-here">${S("tab")}</span></div>
          <p class="ne-title">${S("title")}</p>
          <form class="ne-form" novalidate>
            <label class="ne-label" for="ne-input-${L}">${S("label")}</label>
            <div class="ne-row"><input class="ne-input" id="ne-input-${L}" name="word" type="text" lang="ko" placeholder="예: 학생" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"><button type="submit" class="btn">${S("submit")}</button></div>
            <p class="ne-examples"><span>${S("examples")}</span>${D.collectible.map((w) => `<button type="button" class="ne-ex" data-word="${w}" lang="ko">${w}</button>`).join("")}</p>
          </form>
          <p class="ne-msg" role="status" hidden></p>
          <div class="ne-welcome">
            <div class="ne-ground">${SPROUT}</div>
            <ol class="ne-steps">${D.strings.steps.map((s) => `<li>${esc(tx(s))}</li>`).join("")}</ol>
          </div>
          <div class="ne-result" hidden></div>
        </div>`;
  }

  // ことのえだ：上げてみる。相手の名前が段に並び、押すと同じひとことがその人への言い方になる（中身は demos.js が描く）。
  function edaDemo() {
    const D = C.demos.eda;
    const S = (k) => esc(tx(D.strings[k]));
    return `<div class="demo demo-eda" data-demo="eda" lang="${L}">
          <div class="app-bar">${iconImg("kotonoeda.png", 28, "app-bar-icon")}<span class="app-name" lang="ja">ことのえだ</span><span class="app-here">${S("tab")}</span></div>
          <p class="eda-title">${esc(tx(D.title))}</p>
          <ol class="eda-people">${D.steps.map((s, i) => `<li><button type="button" class="eda-person" data-step="${i}" lang="ko">${esc(s.to)}</button></li>`).join("")}</ol>
          <div class="eda-stage" aria-live="polite"></div>
          <div class="demo-actions eda-actions"></div>
        </div>`;
  }

  function media(w) {
    if (!w.media) return "";
    const m = w.media;
    const body =
      m.kind === "phone" ? phoneMedia(m) : m.kind === "video" ? video(m) : m.demo === "ame" ? ameDemo() : m.demo === "oto" ? otoDemo() : m.demo === "eda" ? edaDemo() : neDemo();
    const kind = m.kind === "demo" ? "is-demo" : m.kind === "phone" ? "is-phone" : `is-${m.ratio}`;
    return `<figure class="scene-media reveal ${kind}">
        ${body}
        <figcaption>${esc(tx(m.caption))}</figcaption>
      </figure>`;
  }

  // ---------- works ----------
  const stats = (w) =>
    w.stats
      ? `<dl class="stats">${w.stats.map(([v, l]) => `<div class="stat"><dt>${esc(tx(l))}</dt><dd>${esc(tx(v))}</dd></div>`).join("")}</dl>`
      : "";

  // tag：1枚の版では h4、作品のページでは h1。
  function sceneHead(id, tag = "h4") {
    const w = C.works[id];
    return `<header class="scene-head">
          <p class="scene-id">${iconImg(w.icon, 44)}<span class="scene-name${w.wordmark ? " wordmark" : ""}"${nameAttr(w)}>${esc(w.name)}</span>${
      w.sub ? `<span class="scene-sub">${tx(w.sub)}</span>` : ""
    }</p>
          <${tag} class="display" id="${id}-h"><span class="sr-only">${esc(w.name)}: </span>${tx(w.tagline)}</${tag}>
          ${meta(w)}
        </header>`;
  }

  // 工夫・由来・事実・技術は畳んでおき、「詳しく見る」で開く。開くと工夫は左に広く、事実と技術は右に。
  function more(w) {
    const origin = w.origin ? `<p class="origin">${tx(w.origin)}</p>` : "";
    const facts = w.facts ? `<dl class="facts">${w.facts.map(([k, v]) => `<div><dt>${esc(tx(k))}</dt><dd>${tx(v)}</dd></div>`).join("")}</dl>` : "";
    const points = w.points
      ? `<div class="points"><h5 class="mini-h">${esc(tx(C.ui.points))}</h5><ul>${w.points.map((p) => `<li>${tx(p)}</li>`).join("")}</ul></div>`
      : "";
    if (!origin && !points && !facts) return "";
    return `<details class="scene-more">
        <summary>${esc(tx(C.ui.more))}</summary>
        <div class="more-body">
          <div class="more-main">${origin}${points}</div>
          <div class="more-side">${facts}${tech(w.tech)}</div>
        </div>
      </details>`;
  }

  // 系譜：初代の試作 Poly-Lang → PolyLinga → ことのあめ → 姉妹（作った順）。
  // 主な作品でない段（Poly-Lang）は、アイコンの代わりに点線の枠と字で描き、外（GitHub）へつなぐ。
  const language = C.groups.find((g) => g.id === "language");
  const lnMeta = (s) => `<span class="ln-meta"><span class="period">${esc(s.date)}</span> ${esc(tx(s.role))}</span>`;
  const lineage = `<nav class="lineage" aria-labelledby="${language.id}-h">
          <ol>
            ${language.lineage.steps
              .map((s, i) => {
                const cls = `ln ln-${i}${s.sister ? " ln-sister" : ""}`;
                if (!s.work) {
                  return `<li class="${cls} ln-proto"><a href="${esc(s.href)}" target="_blank" rel="noopener"><span class="app-icon ln-mark" aria-hidden="true">${esc(
                    s.mark
                  )}</span><span class="ln-text"><span class="ln-name">${esc(s.name)}${ICON.arrow}</span>${lnMeta(s)}</span><span class="sr-only">${esc(tx(C.ui.external))}</span></a></li>`;
                }
                const w = C.works[s.work];
                return `<li class="${cls}"><a href="${workHref(s.work)}">${iconImg(w.icon, 52)}<span class="ln-text"><span class="ln-name${
                  w.wordmark ? " wordmark" : ""
                }"${nameAttr(w)}>${esc(w.name)}</span>${lnMeta(s)}</span></a></li>`;
              })
              .join("\n            ")}
          </ol>
        </nav>`;

  // 作品の一覧の行（ほかの作品）。
  const ledgerRows = (list) =>
    list
      .map(
        (x) => `<li${x.cat ? ` data-cat="${x.cat}"` : ""}>
        <div class="lg-name"><h3>${tx(x.name)}</h3></div>
        <span class="lg-period period">${esc(x.period)}</span>
        <span class="lg-status">${status(x.status)}</span>
        <div class="lg-about"><p>${tx(x.about)}</p>${x.links ? `<p class="lg-links">${x.links.map((l) => ext(l.href, esc(tx(l.label)))).join("")}</p>` : ""}</div>
      </li>`
      )
      .join("\n      ");

  // ---------- contact ----------
  const contactSection = `<section class="section section-contact" id="contact" aria-labelledby="contact-title">
  <div class="wrap">
    <header class="section-head">
      <h2 class="section-title" id="contact-title">${esc(tx(C.sections.contact.title))}</h2>
      <p class="display display-xl contact-line">${tx(C.sections.contact.headline)}</p>
    </header>
    <div class="contact">
      <p class="mail"><a class="mail-address" href="mailto:${esc(C.profile.email)}">${esc(C.profile.email)}</a><button type="button" class="btn-quiet copy" data-copy="${esc(
        C.profile.email
      )}" data-done="${esc(tx(C.ui.copied))}" hidden>${ICON.copy}<span>${esc(tx(C.ui.copy))}</span></button></p>
      <ul class="contact-links">
        ${C.profile.links.map((l) => `<li><span class="cl-label">${esc(l.label)}</span>${ext(l.href, esc(l.handle))}</li>`).join("\n        ")}
      </ul>
    </div>
  </div>
</section>`;

  const footer = `<footer class="foot">
  <div class="wrap foot-in">
    <p>© 2026 ${esc(tx(C.profile.name))}</p>
    <p>${esc(tx(C.ui.updated))} <time datetime="${C.UPDATED}">${esc(dayLabel(C.UPDATED))}</time></p>
  </div>
</footer>`;

  // ---------- demo data ----------
  const ame = C.demos.ame;
  const oto = C.demos.oto;
  const resolve = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, Array.isArray(v) ? v.map(tx) : tx(v)]));
  const data = {
    base: B,
    lang: L,
    ame: {
      first: ame.first[L],
      rains: Object.fromEntries(Object.entries(ame.rains).map(([k, r]) => [k, { sentences: r.sentences, pattern: r.pattern }])),
      glossLang: L,
      glosses: ame.glosses[L],
      strings: resolve(ame.strings),
    },
    oto: {
      pairs: oto.pairs,
      voices: oto.voices.map((v) => ({ id: v.id, label: `${tx(oto.strings.voice)}：${v.name}（${tx(oto.strings[v.sex === "f" ? "female" : "male"])}）` })),
      words: Object.fromEntries(oto.pairs.flat().map((id) => [id, { hanzi: OTO_LINES[id].hanzi, pinyin: OTO_LINES[id].pinyin, lines: OTO_LINES[id].lines }])),
      strings: { lineLabel: tx(oto.strings.lineLabel), again: tx(oto.strings.again) },
      geometry: { W: PW, H: PH, PAD_X, TOP, BOTTOM },
    },
    ne: {
      examples: C.demos.ne.collectible,
      words: Object.fromEntries(Object.entries(C.demos.ne.words).map(([k, w]) => [k, { hanja: w.hanja, jp: w.jp, gloss: tx(w.gloss) }])),
      glossLang: L === "en" ? "en" : "ja",
      chars: C.demos.ne.chars,
      strings: resolve(C.demos.ne.strings),
    },
    // 訳は表示言語で（韓国語のページは訳を出さない）。
    eda: {
      me: tx(C.demos.eda.me),
      steps: C.demos.eda.steps.map((s) => {
        const side = (l) => ({ ko: l.ko, gloss: L === "ko" ? null : l[L], marks: l.marks, audio: l.audio });
        return { to: s.to, said: side(s.said), reply: side(s.reply) };
      }),
      strings: resolve(C.demos.eda.strings),
    },
  };

  const scripts = () => `<script type="application/json" id="demo-data">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
<script src="${B}assets/site.js" defer></script>
<script src="${B}assets/demos.js" defer></script>`;

  return {
    tx, ext, status, iconImg, monthLabel, shortMonth, dayLabel, nameAttr, meta, links, tech,
    headTags, header, rainChart, hero, video, phoneMedia, media, stats, sceneHead, more, lineage, ledgerRows,
    contactSection, footer, scripts,
  };
}
