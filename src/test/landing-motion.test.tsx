import { useRef } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLandingMotion } from "@/hooks/use-landing-motion";

const { mountMotion, stopMotion } = vi.hoisted(() => ({
  mountMotion: vi.fn(),
  stopMotion: vi.fn(),
}));
vi.mock("@/assets/portfolio-editorial-motion.js", () => ({ mountEditorialMotion: mountMotion }));

function Preview() {
  const homeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { cursorRef } = useLandingMotion(homeRef, progressRef);
  return (
    <>
      <div ref={homeRef} data-testid="home">
        <div ref={cursorRef} data-testid="cursor" data-visible="false" />
        <div ref={progressRef} />
        <section className="fig-hero">Hero</section>
      </div>
      <div data-testid="outside">Case study portal</div>
    </>
  );
}

beforeEach(() => {
  mountMotion.mockReset().mockReturnValue(stopMotion);
  stopMotion.mockReset();
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("pointer: fine"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function move(target: HTMLElement, x: number, y: number) {
  const event = new MouseEvent("pointermove", { bubbles: true, clientX: x, clientY: y });
  Object.defineProperty(event, "pointerType", { value: "mouse" });
  fireEvent(target, event);
}

describe("Landing motion lifecycle", () => {
  it("starts the export's complete animation engine without waiting for remote fonts", async () => {
    const fonts = Object.getOwnPropertyDescriptor(document, "fonts");
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: { ready: new Promise(() => {}) },
    });
    try {
      const view = render(<Preview />);
      await waitFor(() => expect(mountMotion).toHaveBeenCalledOnce());
      view.unmount();
      expect(stopMotion).toHaveBeenCalledOnce();
    } finally {
      if (fonts) Object.defineProperty(document, "fonts", fonts);
      else Reflect.deleteProperty(document, "fonts");
    }
  });

  it("shows the animated pointer on the landing page and restores the normal pointer over case-study portals", async () => {
    render(<Preview />);
    await act(async () => {});
    move(screen.getByTestId("home"), 120, 80);
    expect(screen.getByTestId("cursor")).toHaveAttribute("data-visible", "true");
    expect(screen.getByTestId("cursor").style.transform).toContain("120px, 80px");
    expect(screen.getByTestId("home")).toHaveClass("landing-cursor-active");
    move(screen.getByTestId("outside"), 160, 100);
    expect(screen.getByTestId("cursor")).toHaveAttribute("data-visible", "false");
    expect(screen.getByTestId("home")).not.toHaveClass("landing-cursor-active");
  });
});
