"use client";

import { useEffect } from "react";

// Fades elements up as they scroll into view.
// Targets anything marked `data-reveal`, plus the heading and cards on
// employer and information pages, and picks up content added later
// (page navigation, search and filter results).
const AUTO_TARGETS = [
  "main section.rounded-2xl",
  "main h1:not(.tb-hero h1)",
].join(",");

export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("tb-reveal-ready");
    // Elements this run is watching (kept per run so a re-run starts clean).
    const watched = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const prepare = () => {
      document.querySelectorAll<HTMLElement>(AUTO_TARGETS).forEach((el) => {
        if (el.hasAttribute("data-reveal")) return;
        el.setAttribute("data-reveal", "");
        // Bring the badge above a page title and the intro below it in too.
        if (el.tagName === "H1") {
          el.previousElementSibling?.setAttribute("data-reveal", "");
          el.nextElementSibling?.setAttribute("data-reveal", "");
        }
      });

      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)").forEach((el) => {
        if (watched.has(el)) return;
        watched.add(el);
        // Stagger siblings that appear together (e.g. a row of cards).
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal"))
          : [];
        const index = Math.max(0, siblings.indexOf(el));
        el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
        observer.observe(el);
      });
    };

    prepare();
    const mutations = new MutationObserver(() => prepare());
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
