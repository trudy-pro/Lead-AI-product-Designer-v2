import { useEffect, useRef, useState, type RefObject } from "react";

/** Uses the motion engine included in the supplied portfolio export. */
export function useLandingMotion(
  homeRef: RefObject<HTMLDivElement | null>,
  progressRef: RefObject<HTMLDivElement | null>,
) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const home = homeRef.current;
    if (!home) return;
    let disposed = false;
    let stopEditorialMotion: (() => void) | undefined;
    // SplitText autoSplit tracks font changes; motion need not wait for remote fonts.
    void import("@/assets/portfolio-editorial-motion.js")
      .then((motion) => {
        if (!disposed) stopEditorialMotion = motion.mountEditorialMotion();
      })
      .catch((error: unknown) => {
        console.error("Unable to initialize landing-page animations", error);
      });

    // Text reveals are positioned once; re-measure after late layout (videos, fonts, page load)
    // so card text never waits on a stale scroll position.
    const remeasureMotion = () => window.dispatchEvent(new Event("resize"));
    const lateMedia = home.querySelectorAll<HTMLVideoElement>(".case-media video");
    lateMedia.forEach((video) => video.addEventListener("loadedmetadata", remeasureMotion));
    window.addEventListener("load", remeasureMotion);
    void document.fonts?.ready.then(() => {
      if (!disposed) remeasureMotion();
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hero = home.querySelector<HTMLElement>(".fig-hero");
    const cards = home.querySelectorAll<HTMLElement>(".case-item");
    const navLinks = home.querySelectorAll<HTMLAnchorElement>('.hero-dock a[href^="#"]');
    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${range > 0 ? window.scrollY / range : 0})`;
      }
      if (hero) {
        const bounds = hero.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height)));
        const distance =
          bounds.width < 768
            ? Math.min(32, bounds.width * 0.08)
            : Math.min(260, bounds.width * 0.18);
        hero.style.setProperty(
          "--hero-scroll-shift",
          `${reduced.matches ? 0 : progress * distance}px`,
        );
      }
      let active = "top";
      for (const id of ["work", "projects", "about", "contact"]) {
        const section = home.querySelector<HTMLElement>(`#${id}`);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.35)
          active = id;
      }
      navLinks.forEach((link) => {
        if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      setShowBackToTop(window.scrollY > 400);
    };
    const scheduleScroll = () => {
      scrollFrame ||= requestAnimationFrame(updateScroll);
    };
    const observer = new ResizeObserver((entries) => {
      entries.forEach(({ target }) => {
        if (target instanceof HTMLElement && target.matches(".case-item")) {
          target.style.setProperty("--case-height", `${target.getBoundingClientRect().height}px`);
        }
      });
      scheduleScroll();
    });
    cards.forEach((card) => observer.observe(card));
    if (hero) observer.observe(hero);
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);
    reduced.addEventListener("change", scheduleScroll);
    updateScroll();

    let cursorFrame = 0;
    let visible = false;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    const hideCursor = () => {
      visible = false;
      home.classList.remove("landing-cursor-active");
      if (cursorRef.current) cursorRef.current.dataset["visible"] = "false";
      cancelAnimationFrame(cursorFrame);
      cursorFrame = 0;
    };
    const animateCursor = () => {
      const factor = reduced.matches ? 1 : 0.24;
      x += (targetX - x) * factor;
      y += (targetY - y) * factor;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      cursorFrame =
        Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1
          ? requestAnimationFrame(animateCursor)
          : 0;
    };
    const moveCursor = (event: PointerEvent) => {
      if (
        !fine.matches ||
        event.pointerType !== "mouse" ||
        !(event.target instanceof Node) ||
        !home.contains(event.target)
      ) {
        hideCursor();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        visible = true;
        home.classList.add("landing-cursor-active");
        if (cursorRef.current) cursorRef.current.dataset["visible"] = "true";
      }
      if (!cursorFrame) animateCursor();
    };
    const pointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hideCursor();
    };
    document.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerout", pointerOut);
    window.addEventListener("blur", hideCursor);
    fine.addEventListener("change", hideCursor);
    return () => {
      disposed = true;
      stopEditorialMotion?.();
      lateMedia.forEach((video) => video.removeEventListener("loadedmetadata", remeasureMotion));
      window.removeEventListener("load", remeasureMotion);
      observer.disconnect();
      cancelAnimationFrame(scrollFrame);
      hideCursor();
      hero?.style.removeProperty("--hero-scroll-shift");
      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
      reduced.removeEventListener("change", scheduleScroll);
      document.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerout", pointerOut);
      window.removeEventListener("blur", hideCursor);
      fine.removeEventListener("change", hideCursor);
    };
  }, [homeRef, progressRef]);
  return { cursorRef, showBackToTop };
}
