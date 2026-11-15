import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LandingFooterMotion } from "@/components/landing-footer-motion";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

function setup(fine = true) {
  vi.spyOn(window, "matchMedia").mockReturnValue({
    matches: fine,
    media: "(pointer: fine)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
  const homeRef = createRef<HTMLDivElement>();
  const onOpen = vi.fn();
  render(
    <div ref={homeRef}>
      <div className="footer-scene">
        <span
          className="footer-project"
          style={{ "--dx": "0px", "--dy": "0px" } as React.CSSProperties}
        >
          <button onClick={onOpen}>Open project</button>
        </span>
        <LandingFooterMotion homeRef={homeRef} />
      </div>
    </div>,
  );
  const button = screen.getByRole("button", { name: "Open project" });
  const card = button.parentElement!;
  card.setPointerCapture = vi.fn();
  card.hasPointerCapture = vi.fn(() => false);
  card.releasePointerCapture = vi.fn();
  const pointer = (type: string, x: number, y: number) => {
    const event = new MouseEvent(type, { bubbles: true, clientX: x, clientY: y, button: 0 });
    Object.defineProperty(event, "pointerId", { value: 1 });
    fireEvent(button, event);
  };
  return { button, card, pointer, onOpen };
}

describe("Landing footer collage", () => {
  it("drags cards without opening a project and restores their positions with Tidy up", () => {
    const { button, card, pointer, onOpen } = setup();
    pointer("pointerdown", 100, 100);
    pointer("pointermove", 160, 130);
    expect(card.style.getPropertyValue("--dx")).toBe("60px");
    expect(card.style.getPropertyValue("--dy")).toBe("30px");
    expect(card).toHaveClass("is-dragging");
    pointer("pointerup", 160, 130);
    fireEvent.click(button);
    expect(onOpen).not.toHaveBeenCalled();
    expect(card).not.toHaveClass("is-dragging");
    fireEvent.click(screen.getByRole("button", { name: /Tidy up/ }));
    expect(card.style.getPropertyValue("--dx")).toBe("0px");
    expect(card.style.getPropertyValue("--dy")).toBe("0px");
    expect(screen.queryByRole("button", { name: /Tidy up/ })).not.toBeInTheDocument();
  });

  it("keeps normal project clicks working when the pointer moves less than the drag threshold", () => {
    const { button, card, pointer, onOpen } = setup();
    pointer("pointerdown", 100, 100);
    pointer("pointermove", 102, 101);
    pointer("pointerup", 102, 101);
    fireEvent.click(button);
    expect(onOpen).toHaveBeenCalledOnce();
    expect(card.style.getPropertyValue("--dx")).toBe("0px");
  });

  it("leaves touch scrolling and project activation available on coarse pointers", () => {
    const { button, card, pointer, onOpen } = setup(false);
    pointer("pointerdown", 100, 100);
    pointer("pointermove", 160, 130);
    pointer("pointerup", 160, 130);
    fireEvent.click(button);
    expect(onOpen).toHaveBeenCalledOnce();
    expect(card.style.getPropertyValue("--dx")).toBe("0px");
    expect(screen.queryByText(/Psst/)).not.toBeInTheDocument();
  });
});
