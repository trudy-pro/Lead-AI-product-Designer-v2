import { useEffect, useRef, useState, type RefObject } from "react";
import { RotateCcw } from "lucide-react";

/** Restores the export's draggable collage without changing project activation. */
export function LandingFooterMotion({ homeRef }: { homeRef: RefObject<HTMLDivElement | null> }) {
  const [playful, setPlayful] = useState(false);
  const [displaced, setDisplaced] = useState(false);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    const scene = homeRef.current?.querySelector<HTMLElement>(".footer-scene");
    if (!scene) return;
    const cards = Array.from(scene.querySelectorAll<HTMLElement>(".footer-project"));
    const fine = window.matchMedia("(pointer: fine)");
    let zIndex = 4;
    let suppressClick = false;
    let clearClickTimer = 0;
    let drag:
      | {
          card: HTMLElement;
          pointerId: number;
          startX: number;
          startY: number;
          baseX: number;
          baseY: number;
          moved: boolean;
        }
      | undefined;
    const endDrag = () => {
      if (!drag) return;
      drag.card.classList.remove("is-dragging");
      if (drag.card.hasPointerCapture(drag.pointerId))
        drag.card.releasePointerCapture(drag.pointerId);
      suppressClick = drag.moved;
      drag = undefined;
      clearClickTimer = window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    };
    const updatePointerMode = () => {
      setPlayful(fine.matches);
      scene.classList.toggle("is-playful", fine.matches);
      if (!fine.matches) endDrag();
    };
    const pointerDown = (event: PointerEvent) => {
      if (!fine.matches || event.button !== 0 || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(".footer-project");
      if (!card || !scene.contains(card)) return;
      clearTimeout(clearClickTimer);
      suppressClick = false;
      drag = {
        card,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        baseX: parseFloat(card.style.getPropertyValue("--dx")) || 0,
        baseY: parseFloat(card.style.getPropertyValue("--dy")) || 0,
        moved: false,
      };
    };
    const pointerMove = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const dx = event.clientX - drag.startX,
        dy = event.clientY - drag.startY;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      if (!drag.moved) {
        drag.moved = true;
        drag.card.classList.add("is-dragging");
        drag.card.style.zIndex = String(zIndex++);
        drag.card.setPointerCapture(event.pointerId);
        setDisplaced(true);
      }
      drag.card.style.setProperty("--dx", `${drag.baseX + dx}px`);
      drag.card.style.setProperty("--dy", `${drag.baseY + dy}px`);
    };
    const captureClick = (event: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
    };
    resetRef.current = () => {
      endDrag();
      cards.forEach((card) => {
        card.style.setProperty("--dx", "0px");
        card.style.setProperty("--dy", "0px");
        card.style.removeProperty("z-index");
      });
      zIndex = 4;
      setDisplaced(false);
    };
    updatePointerMode();
    fine.addEventListener("change", updatePointerMode);
    scene.addEventListener("pointerdown", pointerDown);
    scene.addEventListener("click", captureClick, true);
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    window.addEventListener("blur", endDrag);
    return () => {
      endDrag();
      clearTimeout(clearClickTimer);
      fine.removeEventListener("change", updatePointerMode);
      scene.classList.remove("is-playful");
      scene.removeEventListener("pointerdown", pointerDown);
      scene.removeEventListener("click", captureClick, true);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", endDrag);
    };
  }, [homeRef]);

  return playful ? (
    <div className="footer-play-hint">
      <span aria-hidden="true">Psst — drag the work around</span>
      {displaced && (
        <button type="button" className="footer-tidy" onClick={() => resetRef.current()}>
          <RotateCcw aria-hidden="true" /> Tidy up
        </button>
      )}
    </div>
  ) : null;
}
