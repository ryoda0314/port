// The demos, run on the apps' own material: ことのあめ's rain (library sentences of 誘う and their clips), ことのおと's pairs
// (its clips in four voices and the pitch lines measured from them), ことのね's collecting (its dictionary entries) and
// ことのえだ's climb (its lines and each person's voice). The data is in #demo-data.
(() => {
  "use strict";
  const node = document.getElementById("demo-data");
  if (!node) return;
  const data = JSON.parse(node.textContent);
  const BASE = data.base;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SPEAKER =
    '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 8h3l4-3v10l-4-3H4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 7.5a3.5 3.5 0 0 1 0 5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

  // One sound at a time through one element: the first play happens inside a tap, which lets the later ones play on iOS.
  const audio = new Audio();
  audio.preload = "auto";
  let run = 0; // moves on with every new rain or tap; an older run sees it and stops
  const demos = [];

  function play(src) {
    return new Promise((resolve) => {
      let timer = 0;
      const done = () => {
        audio.removeEventListener("ended", done);
        audio.removeEventListener("error", done);
        audio.removeEventListener("pause", done);
        clearTimeout(timer);
        resolve();
      };
      audio.src = src;
      audio.addEventListener("ended", done);
      audio.addEventListener("error", done);
      document.dispatchEvent(new CustomEvent("portfolio:sound", { detail: audio }));
      const p = audio.play();
      if (p && p.then) p.then(() => audio.addEventListener("pause", done), done);
      timer = setTimeout(done, 8000);
    });
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? Math.min(ms, 120) : ms));

  // A demo starting stops the other one where it is, so only one sound plays.
  function takeTurn(me) {
    run++;
    audio.pause();
    for (const d of demos) if (d !== me) d.halt();
    return run;
  }
  // A video turned up stops the demos.
  document.addEventListener("portfolio:sound", (e) => {
    if (e.detail === audio) return;
    run++;
    audio.pause();
    for (const d of demos) d.halt();
  });

  const make = (tag, cls, text) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  };

  // Text with its shared part in a span (marked on reveal), and pinyin over each Chinese character.
  function content(text, part, pinyin) {
    const frag = document.createDocumentFragment();
    const syllables = pinyin ? pinyin.split(/\s+/) : null;
    let k = 0;
    const piece = (s) => {
      if (!syllables) return document.createTextNode(s);
      const f = document.createDocumentFragment();
      for (const ch of s) {
        if (/\p{Script=Han}/u.test(ch) && k < syllables.length) {
          const ruby = make("ruby");
          ruby.append(ch);
          ruby.append(make("rt", null, syllables[k++]));
          f.append(ruby);
        } else {
          f.append(ch);
        }
      }
      return f;
    };
    const at = part ? text.indexOf(part) : -1;
    if (at < 0) {
      frag.append(piece(text));
      return frag;
    }
    frag.append(piece(text.slice(0, at)));
    const span = make("span");
    span.dataset.part = "";
    span.append(piece(text.slice(at, at + part.length)));
    frag.append(span, piece(text.slice(at + part.length)));
    return frag;
  }

  // ---------- ことのあめ: 浴びる ----------
  function ame(root) {
    const D = data.ame;
    const S = D.strings;
    const intro = root.querySelector(".ame-intro");
    const box = root.querySelector(".ame-run");
    const list = root.querySelector(".ame-list");
    const after = root.querySelector(".ame-after");
    const answer = root.querySelector(".ame-answer");
    const revealButton = root.querySelector('[data-act="reveal"]');
    const pattern = root.querySelector("[data-pattern]");
    const tabs = [...root.querySelectorAll(".seg button")];
    const langOf = (rain) => (rain === "zh" ? "zh-CN" : rain);
    let rain = D.first;
    let started = false;
    let shown = 0;

    const clip = (s) => `${BASE}assets/audio/ame/${s.audio}.mp4`;

    function item(s, i) {
      const li = make("li", "ame-item");
      li.append(make("span", "ame-drop"));
      const main = make("div", "ame-main");
      const sentence = make("button", "ame-sentence");
      sentence.type = "button";
      sentence.lang = langOf(rain);
      sentence.append(content(s.text, s.mark, s.pinyin));
      sentence.addEventListener("click", () => say(li, s));
      main.append(sentence);
      const gloss = D.glosses[i];
      if (gloss && D.glossLang !== rain) {
        const g = make("span", "ame-gloss");
        g.lang = D.glossLang;
        g.append(content(gloss.text, gloss.mark[rain]));
        main.append(g);
      }
      li.append(main);
      const button = make("button", "ame-play");
      button.type = "button";
      button.setAttribute("aria-label", S.playSentence);
      button.innerHTML = SPEAKER;
      button.addEventListener("click", () => say(li, s));
      li.append(button);
      return li;
    }

    // Everything still to fall lands at once, and what comes after the rain appears.
    function halt() {
      if (!started) return;
      const sentences = D.rains[rain].sentences;
      for (let i = shown; i < sentences.length; i++) {
        const li = item(sentences[i], i);
        li.style.animation = "none";
        li.querySelector(".ame-drop").style.animation = "none";
        list.append(li);
      }
      shown = sentences.length;
      for (const li of list.querySelectorAll(".playing")) li.classList.remove("playing");
      after.hidden = false;
    }

    function say(li, s) {
      const my = takeTurn(self);
      halt();
      li.classList.add("playing");
      play(clip(s)).then(() => {
        if (my === run) li.classList.remove("playing");
      });
    }

    async function fall() {
      const my = takeTurn(self);
      started = true;
      intro.hidden = true;
      box.hidden = false;
      after.hidden = true;
      answer.hidden = true;
      revealButton.hidden = false;
      list.textContent = "";
      shown = 0;
      const sentences = D.rains[rain].sentences;
      for (let i = 0; i < sentences.length; i++) {
        // The first sentence speaks at once, inside the tap; the others once the one before has landed.
        if (i > 0) {
          await wait(650);
          if (my !== run) return;
        }
        const li = item(sentences[i], i);
        list.append(li);
        shown = i + 1;
        if (i > 0) {
          await wait(380);
          if (my !== run) return;
        }
        li.classList.add("playing");
        await play(clip(sentences[i]));
        li.classList.remove("playing");
        if (my !== run) return;
      }
      await wait(300);
      if (my !== run) return;
      after.hidden = false;
    }

    revealButton.addEventListener("click", () => {
      for (const part of list.querySelectorAll("[data-part]")) part.className = "mark in";
      pattern.textContent = D.rains[rain].pattern;
      pattern.lang = langOf(rain);
      answer.hidden = false;
      revealButton.hidden = true;
    });
    root.querySelector('[data-act="start"]').addEventListener("click", fall);
    root.querySelector('[data-act="again"]').addEventListener("click", fall);
    for (const tab of tabs) {
      tab.addEventListener("click", () => {
        if (tab.dataset.rain === rain) return;
        rain = tab.dataset.rain;
        for (const t of tabs) t.setAttribute("aria-pressed", String(t === tab));
        if (started) fall();
      });
    }

    const self = { halt };
    return self;
  }

  // ---------- ことのおと: 聞き比べる ----------
  function oto(root) {
    const D = data.oto;
    const G = D.geometry;
    const list = root.querySelector(".oto-pairs");
    const rows = [...list.querySelectorAll(".oto-pair")];
    const svg = root.querySelector(".oto-line svg");
    const model = svg.querySelector(".model");
    const partner = svg.querySelector(".partner");
    const voiceLabel = root.querySelector("[data-voice]");
    const modelName = root.querySelector("[data-model]");
    const partnerName = root.querySelector("[data-partner]");
    const diff = root.querySelector(".oto-diff");
    const startButton = root.querySelector('[data-act="start"]');
    const partnerOf = {};
    for (const [a, b] of D.pairs) {
      partnerOf[a] = b;
      partnerOf[b] = a;
    }
    const turn = {};

    // The same drawing as the app's PitchLines: 40 points over the voiced part, broken where there was no voice.
    const y = (v) => ((G.TOP - Math.max(G.BOTTOM, Math.min(G.TOP, v))) / (G.TOP - G.BOTTOM)) * G.H;
    const path = (line) => {
      const n = line.length;
      let d = "";
      let open = false;
      line.forEach((v, k) => {
        if (v === null) {
          open = false;
          return;
        }
        const x = G.PAD_X + (n > 1 ? k / (n - 1) : 0.5) * (G.W - 2 * G.PAD_X);
        d += `${open ? "L" : "M"}${x.toFixed(1)} ${y(v).toFixed(1)}`;
        open = true;
      });
      return d;
    };

    function draw(word, vi) {
      const voice = D.voices[vi];
      const other = partnerOf[word];
      model.setAttribute("d", path(D.words[word].lines[voice.id]));
      partner.setAttribute("d", path(D.words[other].lines[voice.id]));
      model.classList.remove("draw");
      void model.getBoundingClientRect();
      model.classList.add("draw");
      voiceLabel.textContent = voice.label;
      modelName.textContent = D.words[word].hanzi;
      partnerName.textContent = D.words[other].hanzi;
      svg.setAttribute("aria-label", D.words[word].hanzi + D.strings.lineLabel);
    }

    const clip = (word, vi) => `${BASE}assets/audio/oto/${D.voices[vi].id}/${word}.mp3`;

    function sayWord(button, vi) {
      for (const b of list.querySelectorAll("[data-playing]")) b.removeAttribute("data-playing");
      button.setAttribute("data-playing", "");
      draw(button.dataset.word, vi);
      return play(clip(button.dataset.word, vi)).then(() => button.removeAttribute("data-playing"));
    }

    // Pressing a word stops the fall: everything settles at once (as in the app).
    function halt() {
      for (const r of rows) {
        r.classList.remove("fall");
        if (!r.isConnected) list.append(r);
      }
      for (const b of list.querySelectorAll("[data-playing]")) b.removeAttribute("data-playing");
    }

    async function fall() {
      const my = takeTurn(self);
      list.style.minHeight = `${list.offsetHeight}px`;
      for (const r of rows) r.remove();
      diff.hidden = true;
      for (let i = 0; i < rows.length; i++) {
        const r = rows[i];
        r.classList.remove("fall");
        void r.offsetWidth;
        r.classList.add("fall");
        list.append(r);
        // A different voice for each pair; the first word speaks at once, inside the tap.
        const vi = i % D.voices.length;
        if (i > 0) {
          await wait(500);
          if (my !== run) return;
        }
        for (const button of r.querySelectorAll(".oto-word")) {
          turn[button.dataset.word] = vi;
          await sayWord(button, vi);
          if (my !== run) return;
          await wait(380);
          if (my !== run) return;
        }
        await wait(300);
        if (my !== run) return;
      }
      diff.hidden = false;
      startButton.querySelector("span").textContent = D.strings.again;
    }

    list.addEventListener("click", (e) => {
      const button = e.target.closest(".oto-word");
      if (!button) return;
      takeTurn(self);
      halt();
      diff.hidden = false;
      const word = button.dataset.word;
      const vi = ((turn[word] ?? -1) + 1) % D.voices.length;
      turn[word] = vi;
      sayWord(button, vi);
    });
    startButton.addEventListener("click", fall);

    const self = { halt };
    return self;
  }

  // ---------- ことのね: あつめる ----------
  // The dictionary has exactly five words made of 學 生 大 校, so the gains here match the app in any order.
  function ne(root) {
    const D = data.ne;
    const S = D.strings;
    const lang = data.lang;
    const form = root.querySelector(".ne-form");
    const input = root.querySelector(".ne-input");
    const examples = [...root.querySelectorAll(".ne-ex")];
    const msg = root.querySelector(".ne-msg");
    const welcome = root.querySelector(".ne-welcome");
    const ground = root.querySelector(".ne-ground");
    const result = root.querySelector(".ne-result");
    const CHECK =
      '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10.5 3.2 3.2L15 6.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const JAMO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
    const collected = []; // in the order collected
    let typing = 0;

    // {n} a count, {s} the English plural, {w} a word, {을}{은} the Korean particle for that word.
    const fill = (s, vars = {}) => {
      let out = s;
      if ("n" in vars) out = out.replace(/\{s\}/g, vars.n === 1 ? "" : "s").replace(/\{n\}/g, String(vars.n));
      if ("w" in vars) {
        const last = vars.w.charCodeAt(vars.w.length - 1) - 0xac00;
        const batchim = last >= 0 && last <= 11171 && last % 28 !== 0;
        out = out
          .replace(/\{w\}/g, vars.w)
          .replace(/\{을\}/g, batchim ? "을" : "를")
          .replace(/\{은\}/g, batchim ? "은" : "는");
      }
      return out;
    };
    const charsOf = (w) => Array.from(D.words[w].hanja);
    const owned = () => new Set(collected.flatMap(charsOf));
    // Words readable from a set of characters: two or more characters, all in the set, not collected yet.
    const readable = (set, except = []) =>
      Object.keys(D.words).filter(
        (w) => !collected.includes(w) && !except.includes(w) && charsOf(w).length > 1 && charsOf(w).every((c) => set.has(c))
      );
    // What collecting a word would open: readable afterwards, and not before.
    const opens = (word) => {
      const before = new Set(readable(owned()));
      const after = owned();
      for (const c of charsOf(word)) after.add(c);
      return readable(after, [word]).filter((w) => !before.has(w));
    };

    function names(word, cls = "ne-head") {
      const w = D.words[word];
      const box = make("div", cls);
      const big = make("span", "ne-big", word);
      big.lang = "ko";
      box.append(big, make("span", "hanja ne-bighanja", w.hanja));
      if (w.jp && w.jp !== w.hanja) box.append(make("span", "hanja ne-jp", w.jp));
      return box;
    }
    function gloss(word) {
      const g = make("p", "ne-gloss", D.words[word].gloss);
      g.lang = D.glossLang;
      return g;
    }
    // The word split into its roots: the syllable, the character, its Korean sound, its Japanese readings.
    function roots(word, notes, grow) {
      const chars = charsOf(word);
      const syllables = Array.from(word);
      const ol = make("ol", "ne-roots");
      ol.style.gridTemplateColumns = `repeat(${Math.min(chars.length, 4)}, minmax(0, 1fr))`;
      chars.forEach((c, i) => {
        const d = D.chars[c];
        const li = make("li", grow ? "grow" : "");
        li.style.setProperty("--i", String(i));
        const cell = make("div", "ne-root");
        const syl = make("span", "ne-syl", syllables[i]);
        syl.lang = "ko";
        cell.append(syl, make("span", "hanja ne-glyph", c));
        if (d.jp && d.jp !== c) cell.append(make("span", "hanja ne-jpmark", d.jp));
        const reading = make("span", "ne-reading");
        reading.lang = "ko";
        if (d.hun) reading.append(make("span", "ne-hun", `${d.hun} `));
        reading.append(make("b", null, d.eum));
        const ja = make("span", "ne-ja", d.ja);
        ja.lang = "ja";
        cell.append(reading, ja);
        if (notes) {
          const n = notes[i];
          const note = make("span", n === 0 ? "ne-note is-new" : "ne-note is-again");
          if (n === 0) note.textContent = S.rootNew;
          else note.append(S.rootAgain, make("br"), fill(S.rootAgainCount, { n: n + 1 }));
          cell.append(note);
        }
        li.append(cell);
        ol.append(li);
      });
      return ol;
    }
    function nextButton() {
      const all = D.examples.every((w) => collected.includes(w));
      const button = make("button", "btn-quiet ne-next", all ? S.restart : S.next);
      button.type = "button";
      button.addEventListener("click", all ? restart : next);
      return button;
    }
    function begin() {
      typing++;
      msg.hidden = true;
      welcome.hidden = true;
      result.hidden = false;
      result.textContent = "";
      result.classList.remove("in");
      void result.offsetWidth;
      result.classList.add("in");
    }

    // Looked up: the roots, and how many words collecting it would open.
    function show(word) {
      begin();
      result.append(names(word), gloss(word), roots(word, null, false));
      if (collected.includes(word)) {
        result.append(make("p", "ne-already", fill(S.already, { w: word })), nextButton());
        return;
      }
      const gain = opens(word).length;
      if (gain > 0) {
        const line = make("p", "ne-gainline");
        line.append(make("span", null, S.beforeHead), make("strong", null, String(gain)), make("span", null, fill(S.beforeTail, { n: gain })));
        result.append(line);
      } else {
        const have = owned();
        const fresh = charsOf(word).filter((c) => !have.has(c)).length;
        result.append(make("p", "ne-before", fresh === 0 ? S.known : fill(S.firstRoots, { n: fresh })));
      }
      const button = make("button", "btn ne-collect", S.collect);
      button.type = "button";
      button.addEventListener("click", () => collect(word));
      result.append(button);
    }

    // Collected: each root new or met again, the words it opened (the biggest thing), and what it links to.
    function collect(word) {
      const notes = charsOf(word).map((c) => collected.filter((w) => charsOf(w).includes(c)).length);
      const links = charsOf(word)
        .map((c) => ({ c, words: collected.filter((w) => charsOf(w).includes(c)) }))
        .filter((l) => l.words.length);
      const gained = opens(word);
      collected.push(word);
      for (const b of examples) if (collected.includes(b.dataset.word)) b.dataset.done = "";
      begin();
      const done = make("p", "ne-done");
      done.innerHTML = CHECK;
      done.append(fill(S.collected, { w: word }));
      result.append(done, names(word), gloss(word), roots(word, notes, !reduceMotion));
      if (gained.length) {
        const box = make("p", "ne-gain");
        const num = make("strong", null, `+${gained.length}`);
        box.append(num, make("span", null, fill(S.afterTail, { n: gained.length })));
        result.append(box);
        countUp(num, gained.length);
        const list = make("ul", "ne-opened");
        for (const w of gained) {
          const li = make("li");
          li.append(names(w, "ne-head ne-head-small"), gloss(w));
          list.append(li);
        }
        result.append(list);
      }
      if (links.length) {
        const list = make("ul", "ne-links");
        for (const l of links) {
          const li = make("li");
          const words = make("span", "ne-linkwords");
          l.words.slice(0, 3).forEach((w, i) => {
            if (i) words.append(lang === "en" ? ", " : "・");
            const s = make("span", "ne-linkword", w);
            s.lang = "ko";
            words.append(s);
          });
          const tail = make("span", `ne-linktail ne-linktail-${lang}`, S.linked);
          li.append(make("span", "hanja ne-linkchar", l.c));
          if (lang === "en") li.append(tail, words);
          else li.append(words, tail);
          list.append(li);
        }
        result.append(list);
      }
      const total = readable(owned()).length;
      if (total > 0) {
        const card = make("div", "ne-card");
        card.append(make("p", "ne-card-title", fill(S.readable, { n: total })), make("p", "ne-card-note", S.readableNote));
        result.append(card);
      }
      result.append(nextButton());
    }

    // The gain counts up from zero when it is more than one, as in the app.
    function countUp(node, n) {
      if (n <= 1 || reduceMotion) return;
      const start = performance.now();
      const duration = Math.min(900, 300 + n * 40);
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        node.textContent = `+${Math.round(n * (1 - Math.pow(1 - p, 3)))}`;
        if (p < 1) requestAnimationFrame(step);
      };
      node.textContent = "+0";
      requestAnimationFrame(step);
    }

    function lookup(raw) {
      const q = raw.trim();
      if (!q) return;
      const word = Object.keys(D.words).find((w) => w === q || D.words[w].hanja === q || D.words[w].jp === q);
      if (!word) {
        typing++;
        result.hidden = true;
        msg.textContent = S.notInDemo;
        msg.hidden = false;
        return;
      }
      show(word);
    }

    // An example is typed into the field the way an IME builds it (ㅎ 하 학 학ㅅ 학새 학생), then looked up.
    function stages(word) {
      const out = [];
      let typed = "";
      for (const ch of word) {
        const code = ch.charCodeAt(0) - 0xac00;
        if (code < 0 || code > 11171) {
          typed += ch;
          out.push(typed);
          continue;
        }
        const l = Math.floor(code / 588);
        const v = Math.floor((code % 588) / 28);
        out.push(typed + JAMO[l], typed + String.fromCharCode(0xac00 + l * 588 + v * 28));
        if (code % 28) out.push(typed + ch);
        typed += ch;
      }
      return out;
    }
    async function typeOut(word) {
      const my = ++typing;
      msg.hidden = true;
      if (reduceMotion) input.value = word;
      else {
        for (const s of stages(word)) {
          if (my !== typing) return;
          input.value = s;
          await new Promise((r) => setTimeout(r, 95));
        }
      }
      await new Promise((r) => setTimeout(r, 220));
      if (my !== typing) return;
      lookup(word);
    }

    function next() {
      typing++;
      result.hidden = true;
      result.textContent = "";
      msg.hidden = true;
      input.value = "";
      if (!window.matchMedia("(hover: none)").matches) input.focus({ preventScroll: true });
    }
    function restart() {
      collected.length = 0;
      for (const b of examples) delete b.dataset.done;
      next();
      welcome.hidden = false;
      grow();
    }
    function grow() {
      ground.classList.remove("wait", "grow");
      void ground.offsetWidth;
      ground.classList.add("grow");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      typing++;
      lookup(input.value);
    });
    for (const b of examples) b.addEventListener("click", () => typeOut(b.dataset.word));

    // The first screen's roots grow when the demo comes into view (drawn already without scripts). The observer can
    // miss a fast scroll, so the scroll position is checked too; whichever comes first grows it, once.
    if (!reduceMotion && ground.getBoundingClientRect().top > window.innerHeight) {
      ground.classList.add("wait");
      let seen = null;
      const stop = () => {
        window.removeEventListener("scroll", check);
        if (seen) seen.disconnect();
      };
      const check = () => {
        const r = ground.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
          stop();
          grow();
        }
      };
      if ("IntersectionObserver" in window) {
        seen = new IntersectionObserver(
          (entries) => {
            if (!entries.some((e) => e.isIntersecting && e.intersectionRatio >= 0.5)) return;
            stop();
            grow();
          },
          { threshold: [0, 0.5, 1] }
        );
        seen.observe(ground);
      }
      window.addEventListener("scroll", check, { passive: true });
    }
  }

  // ---------- ことのえだ: 上げてみる ----------
  // The same message, said to people higher and higher. Each step underlines what changed from the one below, and the
  // raised words among the changes come up a step, with the everyday word they stand for above them. わたし's line is
  // heard first, then the person answers in their own voice.
  function eda(root) {
    const D = data.eda;
    const S = D.strings;
    const stage = root.querySelector(".eda-stage");
    const actions = root.querySelector(".eda-actions");
    const people = [...root.querySelectorAll(".eda-person")];
    const UP =
      '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 15.5v-11M5.5 9 10 4.5 14.5 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const REPLAY =
      '<svg class="i" viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10a5.5 5.5 0 1 0 1.8-4.1M4.5 4v3.4h3.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let at = 0;
    const clip = (name) => `${BASE}assets/audio/eda/${name}.mp3`;

    // Where each mark sits: the first place its text occurs that no earlier mark has taken.
    function place(ko, marks) {
      const out = [];
      for (const [text, kind, ruby] of marks) {
        let from = 0;
        let start = ko.indexOf(text, from);
        while (start >= 0 && out.some((m) => start < m.end && start + text.length > m.start)) start = ko.indexOf(text, (from = start + 1));
        if (start >= 0) out.push({ start, end: start + text.length, kind, ruby });
      }
      return out.sort((a, b) => a.start - b.start);
    }

    // Letters added since the step below: those outside a longest common subsequence of the two lines.
    function addedSince(prev, next) {
      const a = prev, b = next;
      const L = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
      for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      const added = new Array(b.length).fill(true);
      for (let i = 0, j = 0; i < a.length && j < b.length; ) {
        if (a[i] === b[j]) { added[j] = false; i++; j++; }
        else if (L[i + 1][j] >= L[i][j + 1]) i++;
        else j++;
      }
      return added;
    }

    // A Korean line: changed letters underlined, words lit, and the everyday word over each raised one.
    function korean(ko, marks, added) {
      const frag = document.createDocumentFragment();
      const letters = (from, to, into) => {
        let k = from;
        while (k < to) {
          const isNew = !!(added && added[k]);
          let e = k;
          while (e < to && !!(added && added[e]) === isNew) e++;
          const s = ko.slice(k, e);
          into.append(isNew ? make("ins", "eda-ins", s) : document.createTextNode(s));
          k = e;
        }
      };
      let at = 0;
      for (const m of place(ko, marks)) {
        if (m.start > at) letters(at, m.start, frag);
        const word = make("span", m.kind === "raised" ? "eda-lit" : m.kind === "si" ? "eda-si" : "eda-base");
        const rises = m.kind === "raised" && added && added.slice(m.start, m.end).some(Boolean);
        if (rises && !reduceMotion) word.classList.add("eda-rise");
        if (m.ruby) {
          const ruby = make("ruby");
          letters(m.start, m.end, ruby);
          ruby.append(make("rt", null, m.ruby));
          word.append(ruby);
        } else {
          letters(m.start, m.end, word);
        }
        frag.append(word);
        at = m.end;
      }
      if (at < ko.length) letters(at, ko.length, frag);
      return frag;
    }

    function lineView(l, who, big, added, withPlay) {
      const box = make("div", "eda-line");
      box.append(make("p", "eda-who", who));
      const row = make("div", "eda-row");
      const text = make("p", big ? "eda-ko eda-big" : "eda-ko");
      text.lang = "ko";
      text.append(korean(l.ko, l.marks, added));
      row.append(text);
      if (withPlay) {
        const button = make("button", "eda-play");
        button.type = "button";
        button.setAttribute("aria-label", S.play);
        button.innerHTML = SPEAKER;
        button.addEventListener("click", () => hear(at));
        row.append(button);
      }
      box.append(row);
      if (l.gloss) box.append(make("p", "eda-gloss", l.gloss));
      return box;
    }

    function render(sound) {
      const s = D.steps[at];
      const prev = at > 0 ? D.steps[at - 1].said.ko : null;
      const added = prev ? addedSince(prev, s.said.ko) : null;
      people.forEach((b, i) => {
        b.classList.toggle("is-here", i === at);
        b.classList.toggle("is-past", i < at);
        if (i === at) b.setAttribute("aria-current", "step");
        else b.removeAttribute("aria-current");
      });
      const view = make("div", "eda-step");
      view.append(lineView(s.said, `${D.me} → ${s.to}`, true, added, true));
      const reply = make("div", "eda-reply");
      reply.append(lineView(s.reply, `${s.to} → ${D.me}`, false, null, false));
      view.append(reply);
      stage.replaceChildren(view);

      actions.replaceChildren();
      if (at < D.steps.length - 1) {
        const up = make("button", "btn");
        up.type = "button";
        up.innerHTML = UP;
        up.append(make("span", null, S.up), make("span", "eda-to", D.steps[at + 1].to));
        up.lastChild.lang = "ko";
        up.addEventListener("click", () => go(at + 1));
        actions.append(up, make("span", "demo-note", S.soundNote));
      } else {
        actions.append(make("p", "eda-top", S.top));
        const again = make("button", "btn-quiet");
        again.type = "button";
        again.innerHTML = REPLAY;
        again.append(make("span", null, S.again));
        again.addEventListener("click", () => go(0));
        actions.append(again);
      }
      if (sound) hear(at);
    }

    // わたし's line, a breath, then the person's answer. A newer tap or another demo stops it (takeTurn moves the run on).
    async function hear(i) {
      const my = takeTurn(self);
      const s = D.steps[i];
      await play(clip(s.said.audio));
      if (my !== run) return;
      await wait(350);
      if (my !== run) return;
      await play(clip(s.reply.audio));
    }

    function go(i) {
      at = i;
      render(true);
    }

    function halt() {}

    people.forEach((b, i) => b.addEventListener("click", () => go(i)));
    const self = { halt };
    render(false);
    return self;
  }

  const ameRoot = document.querySelector('[data-demo="ame"]');
  if (ameRoot) demos.push(ame(ameRoot));
  const otoRoot = document.querySelector('[data-demo="oto"]');
  if (otoRoot) demos.push(oto(otoRoot));
  const neRoot = document.querySelector('[data-demo="ne"]');
  if (neRoot) ne(neRoot);
  const edaRoot = document.querySelector('[data-demo="eda"]');
  if (edaRoot) demos.push(eda(edaRoot));
})();
