// Page behaviour: the language a visitor picks, the promo videos, the names on the rain of dots, copying the address,
// and which section the header points at. Everything here only adds to a page that already works without it.
(() => {
  "use strict";

  // The language a visitor picks is remembered, so the Japanese page does not send them away again.
  for (const a of document.querySelectorAll(".lang a[data-lang]")) {
    a.addEventListener("click", () => {
      try {
        localStorage.setItem("lang", a.dataset.lang);
      } catch (e) {
        /* storage blocked: the switch still works, it just isn't remembered */
      }
    });
  }

  // ---------- Videos: muted while on screen, paused off screen. ----------
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const boxes = [...document.querySelectorAll("[data-video]")];
  const pausedByVisitor = new WeakSet();
  const play = (video) => {
    video.preload = "auto";
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
  };

  for (const box of boxes) {
    const video = box.querySelector("video");
    const ctl = box.querySelector(".video-ctl");
    const toggle = ctl.querySelector('[data-act="toggle"]');
    const sound = ctl.querySelector('[data-act="sound"]'); // a film with no sound has no sound button
    video.removeAttribute("controls");
    ctl.hidden = false;

    const sync = () => {
      const playing = !video.paused;
      box.toggleAttribute("data-playing", playing);
      toggle.setAttribute("aria-label", playing ? toggle.dataset.pause : toggle.dataset.play);
      if (!sound) return;
      box.toggleAttribute("data-sound", !video.muted);
      sound.setAttribute("aria-pressed", String(!video.muted));
      sound.setAttribute("aria-label", video.muted ? sound.dataset.on : sound.dataset.off);
    };
    for (const type of ["play", "pause", "volumechange"]) video.addEventListener(type, sync);

    toggle.addEventListener("click", () => {
      if (video.paused) {
        pausedByVisitor.delete(box);
        play(video);
      } else {
        pausedByVisitor.add(box);
        video.pause();
      }
    });
    sound?.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted) {
        document.dispatchEvent(new CustomEvent("portfolio:sound", { detail: video }));
        if (video.paused) {
          pausedByVisitor.delete(box);
          play(video);
        }
      }
    });
    sync();

    // Scene names beside a phone film: the one on screen is marked, and picking one plays from there.
    const list = box.querySelector("[data-chapters]");
    if (list) {
      const items = [...list.querySelectorAll("button[data-at]")].map((b) => ({ b, at: Number(b.dataset.at) }));
      let shown = null;
      const mark = () => {
        const t = video.currentTime;
        const now = items.filter((x) => x.at <= t + 0.05).pop() || items[0];
        if (now === shown) return;
        if (shown) shown.b.removeAttribute("aria-current");
        now.b.setAttribute("aria-current", "step");
        shown = now;
      };
      video.addEventListener("timeupdate", mark);
      video.addEventListener("seeked", mark);
      for (const x of items) {
        x.b.addEventListener("click", () => {
          // Before the film has loaded, a seek only takes once its length is known.
          if (video.readyState >= 1) video.currentTime = x.at;
          else video.addEventListener("loadedmetadata", () => { video.currentTime = x.at; }, { once: true });
          pausedByVisitor.delete(box);
          play(video);
        });
      }
      mark();
    }
  }

  if (boxes.length && "IntersectionObserver" in window) {
    const seen = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const box = entry.target;
          const video = box.querySelector("video");
          if (entry.isIntersecting) {
            if (!reduce.matches && !pausedByVisitor.has(box)) play(video);
          } else if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.35 }
    );
    for (const box of boxes) seen.observe(box);
  }

  // One sound at a time: a demo or another video starting with sound mutes the rest.
  document.addEventListener("portfolio:sound", (e) => {
    for (const box of boxes) {
      const video = box.querySelector("video");
      if (video !== e.detail && !video.muted) video.muted = true;
    }
  });

  // ---------- The rain of things made: a name for each dot ----------
  const plot = document.querySelector(".rc-plot");
  if (plot) {
    const tip = plot.querySelector(".rc-tip");
    const tipName = tip.querySelector(".rc-tip-name");
    const tipMeta = tip.querySelector(".rc-tip-meta");
    let current = null;
    const show = (cell) => {
      if (current === cell) return;
      if (current) current.removeAttribute("data-on");
      current = cell;
      cell.setAttribute("data-on", "");
      tipName.textContent = cell.dataset.name;
      tipMeta.textContent = `${cell.dataset.when} · ${cell.dataset.status}`;
      tip.hidden = false;
      const box = plot.getBoundingClientRect();
      const r = cell.getBoundingClientRect();
      // Centred over the dot, but never past the edges of the chart.
      const half = tip.offsetWidth / 2;
      const x = Math.max(half, Math.min(box.width - half, r.left + r.width / 2 - box.left));
      tip.style.left = `${x}px`;
      tip.style.top = `${r.top - box.top}px`;
    };
    const hide = () => {
      if (current) current.removeAttribute("data-on");
      current = null;
      tip.hidden = true;
    };
    plot.addEventListener("pointerover", (e) => {
      const cell = e.target.closest(".rc-cell");
      if (cell) show(cell);
    });
    // A mouse leaving hides it; a finger lifts off at once, so a tap keeps it until the next tap elsewhere.
    plot.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") hide();
    });
    document.addEventListener("pointerdown", (e) => {
      if (!e.target.closest(".rc-cell")) hide();
    });
    plot.addEventListener("focusin", (e) => {
      const cell = e.target.closest(".rc-cell");
      if (cell) show(cell);
    });
    plot.addEventListener("focusout", hide);
  }

  // ---------- Filter the list of works by kind (the works page of the hierarchical version) ----------
  const filters = document.querySelector(".filters");
  if (filters) {
    const items = [...document.querySelectorAll(".ledger > li")];
    filters.hidden = false;
    filters.addEventListener("click", (e) => {
      const button = e.target.closest("button[data-filter]");
      if (!button) return;
      const pick = button.dataset.filter;
      for (const b of filters.querySelectorAll("button")) b.setAttribute("aria-pressed", String(b === button));
      for (const li of items) li.hidden = pick !== "all" && li.dataset.cat !== pick;
    });
  }

  // ---------- Copy the address ----------
  const copy = document.querySelector("[data-copy]");
  if (copy) {
    const label = copy.querySelector("span");
    const original = label.textContent;
    const address = document.querySelector(".mail-address");
    copy.hidden = false;
    copy.addEventListener("click", () => {
      const select = () => {
        const range = document.createRange();
        range.selectNodeContents(address);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      };
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        select();
        return;
      }
      navigator.clipboard.writeText(copy.dataset.copy).then(
        () => {
          label.textContent = copy.dataset.done;
          setTimeout(() => (label.textContent = original), 2000);
        },
        select
      );
    });
  }

  // ---------- The header points at the section in view ----------
  const links = new Map(
    [...document.querySelectorAll('.nav a[href^="#"]')].map((a) => [a.getAttribute("href").slice(1), a])
  );
  if (links.size && "IntersectionObserver" in window) {
    const where = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // The top of the page (#top) is not in the header, so it clears the mark.
          for (const [id, a] of links) {
            if (id === entry.target.id) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of ["top", ...links.keys()]) {
      const section = document.getElementById(id);
      if (section) where.observe(section);
    }
  }
})();
