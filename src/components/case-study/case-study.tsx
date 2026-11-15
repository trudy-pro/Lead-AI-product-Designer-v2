import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { caseStudyNumber } from "@/lib/case-study-meta";
import { useEffect, useRef, useState, type ReactNode } from "react";

export interface CaseSection {
  id: string;
  label: string;
}

/** Tracks which section is currently in view for the sidebar highlight. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/** Shared ZIP sidebar identity; overlays close in place through onBack. */
export function CaseStudySidebarHeader({
  title,
  subtitle,
  onBack,
  fullPageHref,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
  fullPageHref?: LinkProps["to"] | undefined;
}) {
  const back = (
    <>
      <ArrowLeft className="size-4" aria-hidden="true" /> All work
    </>
  );
  return (
    <div className="cs-sidebar-header">
      {onBack ? (
        <button className="cs-wordmark text-left" type="button" onClick={onBack}>
          TRUDY
          <br />
          PORTFOLIO
        </button>
      ) : (
        <Link to="/" hash="projects" className="cs-wordmark">
          TRUDY
          <br />
          PORTFOLIO
        </Link>
      )}
      {onBack ? (
        <button type="button" onClick={onBack} className="playground-back">
          {back}
        </button>
      ) : (
        <Link to="/" hash="projects" className="playground-back">
          {back}
        </Link>
      )}
      <p className="cs-sidebar-index">CASE STUDY {caseStudyNumber(title)}</p>
      {fullPageHref ? (
        <Link
          className="cs-sidebar-title block"
          to={fullPageHref}
          aria-label={`${title} full case study`}
        >
          {title}
        </Link>
      ) : (
        <p className="cs-sidebar-title">{title}</p>
      )}
      <p className="cs-sidebar-subtitle">{subtitle}</p>
      <div className="cs-header-actions">
        <a href="mailto:gnamutebi7@gmail.com" className="playground-contact">
          Get in touch <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export function CaseStudySidebar({
  sections,
  active,
  title,
  subtitle,
}: {
  sections: CaseSection[];
  active: string;
  thumb?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <aside className="cs-sidebar">
      <CaseStudySidebarHeader title={title} subtitle={subtitle} />
      <nav aria-label="Case study sections" className="cs-sidebar-nav">
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(s.id);
                }}
                aria-current={active === s.id ? "true" : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export function MobileCaseNav({ sections, active }: { sections: CaseSection[]; active: string }) {
  return (
    <div className="cs-mobile-nav sticky top-0 z-20 -mx-6 mb-8 border-b border-border bg-background/95 px-6 py-3 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-4 text-[13px]">
        <Link to="/" className="text-muted-foreground">
          ← Projects
        </Link>
        <label className="sr-only" htmlFor="case-nav">
          Jump to section
        </label>
        <select
          id="case-nav"
          value={active}
          onChange={(e) => scrollTo(e.target.value)}
          className="min-w-0 max-w-[60%] rounded-md border border-border bg-background px-2 py-1"
        >
          {sections.map((s, i) => (
            <option key={s.id} value={s.id}>
              {String(i + 1).padStart(2, "0")} — {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function Reveal({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div id={id} ref={ref} data-visible={visible} className={`case-reveal ${className}`}>
      {children}
    </div>
  );
}

export function CaseStudyImage({
  src,
  alt,
  caption,
  className = "",
  eager,
}: {
  src: string;
  alt: string;
  caption?: string | undefined;
  className?: string | undefined;
  eager?: boolean | undefined;
}) {
  return (
    <Reveal className={className}>
      <figure className="cs-figure">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        {caption && (
          <figcaption className="mt-4 text-[13px] text-muted-foreground">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/** Looping, muted showcase video styled to match CaseStudyImage. Shows the poster frame for reduced-motion users. */
export function CaseStudyVideo({
  src,
  poster,
  label,
  caption,
  className = "",
}: {
  src: string;
  poster?: string | undefined;
  label: string;
  caption?: string | undefined;
  className?: string | undefined;
}) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return (
    <Reveal className={className}>
      <figure className="cs-figure">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <video
            src={src}
            poster={poster}
            aria-label={label}
            autoPlay={!reduceMotion}
            muted
            loop
            playsInline
            controls={reduceMotion}
            preload="metadata"
            className="block h-auto w-full"
          />
        </div>
        {caption && (
          <figcaption className="mt-4 text-[13px] text-muted-foreground">{caption}</figcaption>
        )}
      </figure>
    </Reveal>
  );
}

export function EditorialContentSection({
  id,
  index,
  label,
  title,
  children,
  introduction,
  layout,
}: {
  id: string;
  index: number;
  label: string;
  title: string;
  children: ReactNode;
  layout?: "showcase" | undefined;
  introduction?:
    { heading?: string; text: string; label: string; value: string; caption: string } | undefined;
}) {
  if (layout === "showcase") {
    return (
      <section id={id} aria-labelledby={`${id}-h`} className="cs-walkthrough-section">
        <h2 id={`${id}-h`} className="cs-section-label">
          [ {label.toUpperCase()} ]
        </h2>
        <div className="cs-walkthrough-body">{children}</div>
      </section>
    );
  }
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      data-continuation={!title || undefined}
      className="cs-section"
    >
      <p className={title ? "cs-section-label" : "sr-only"}>[ {label.toUpperCase()} ]</p>
      <div
        className={
          introduction
            ? "cs-section-heading grid items-center gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)] md:gap-10"
            : "cs-section-heading"
        }
      >
        <div>
          <h2 id={`${id}-h`} className={title ? "cs-section-title" : "sr-only"}>
            {introduction && title === "One language. Every interface." ? (
              <>
                One language.
                <br />
                Every interface.
              </>
            ) : (
              (title || label).split(/(\*\*.*?\*\*|\*[^*]+\*|\n)/g).map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={i} className="font-bold">
                    {part.slice(2, -2)}
                  </strong>
                ) : part.startsWith("*") && part.endsWith("*") ? (
                  <em key={i}>{part.slice(1, -1)}</em>
                ) : part === "\n" ? (
                  <br key={i} />
                ) : (
                  part
                ),
              )
            )}
          </h2>
          {introduction?.heading && (
            <h3 className="mb-3 text-[23px] font-semibold leading-tight">{introduction.heading}</h3>
          )}
          {introduction && (
            <p className="body-copy max-w-[680px] text-[17px] leading-[1.65] text-muted-foreground sm:text-[20px]">
              {introduction.text}
            </p>
          )}
        </div>
        {introduction && (
          <aside className="rounded-2xl bg-muted p-6 sm:p-8">
            <p className="text-[12px] uppercase text-muted-foreground">{introduction.label}</p>
            <p className="my-4 text-[80px] font-semibold leading-none tracking-[-0.06em] sm:text-[104px]">
              {introduction.value}
            </p>
            <p className="body-copy max-w-[280px] text-[14px] leading-[1.6] text-muted-foreground">
              {introduction.caption}
            </p>
          </aside>
        )}
      </div>
      <div className="cs-section-body">{children}</div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="cs-prose max-w-[660px] space-y-5 text-[17px] leading-[1.7]">{children}</div>
  );
}

const projectSequence = [
  { title: "FadäRhy", href: "/work/fadarhy", label: "Founding Design & Engineering" },
  { title: "Jia", href: "/work/jia", label: "Loan App — UI/UX case study" },
  { title: "Donot Fraud AI", href: "/work/attest", label: "Security UX / Adaptive onboarding" },
  { title: "Dwellinn", href: "/work/dwellinn", label: "Client Redesign & UI Kit" },
] as const;

export function NextProjectNavigation({ current }: { current: string }) {
  const next =
    projectSequence[
      (projectSequence.findIndex((project) => project.title === current) + 1) %
        projectSequence.length
    ]!;
  return (
    <>
      <nav aria-label="More projects" className="cs-next">
        <p className="eyebrow">[ NEXT PROJECT ]</p>
        <Link to={next.href} className="cs-next-link">
          <span className="cs-next-number">{caseStudyNumber(next.title)}</span>
          <span className="cs-next-name">{next.title}</span>
          <span className="cs-next-label">{next.label}</span>
          <ArrowRight className="cs-next-arrow" aria-hidden="true" />
        </Link>
      </nav>
      <footer className="playground-footer">
        <p>© 2026 Gertrude Namutebi</p>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            })
          }
        >
          Back to top ↑
        </button>
        <Link to="/">Back home</Link>
      </footer>
    </>
  );
}

/** Labelled group of chips used in case-study headers (Role, Year, Project type…). */
export function ProjectDetail({
  label,
  values,
  className = "",
}: {
  label: string;
  values: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[13px] font-normal leading-5 text-muted-foreground">{label}</dt>
      <dd className="mt-3 flex flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={value}
            className="rounded-lg bg-foreground/[0.055] px-2.5 py-1 text-[13px] font-normal leading-[21px] text-foreground/75"
          >
            {value}
          </span>
        ))}
      </dd>
    </div>
  );
}

/** "[ TOOLS ]" label with a row of tool icons. */
export function ToolsSection({ tools }: { tools: { name: string; icon: string }[] }) {
  return (
    <section className="cs-tools" aria-labelledby="cs-tools-heading">
      <h2 id="cs-tools-heading" className="cs-section-label" aria-label="Tools">
        [ TOOLS ]
      </h2>
      <ul className="cs-tools-grid" role="list">
        {tools.map((tool) => (
          <li key={tool.name}>
            <img src={tool.icon} alt={tool.name} loading="lazy" />
          </li>
        ))}
      </ul>
    </section>
  );
}
