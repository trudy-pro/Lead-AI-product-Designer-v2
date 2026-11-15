import { createFileRoute } from "@tanstack/react-router";
import { ContextualPreviewProvider } from "@/components/contextual-preview-overlay";
import { ProjectOverlay } from "@/components/project-overlay";
import { JiaCaseStudyContent, jiaSections } from "@/components/case-study/jia-case-study";
import { CaseStudyContent } from "@/components/case-study/generic-case-study";
import { attest, caseSections, dwellinn, fadarhy } from "@/content/case-studies";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useLandingMotion } from "@/hooks/use-landing-motion";
import { LandingFooterMotion } from "@/components/landing-footer-motion";
import homeCss from "@/portfolio-home.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gertrude Namutebi — Design Engineer · Design Systems" },
      {
        name: "description",
        content:
          "Design Engineer specialising in design systems, frontend engineering and human-centred interfaces.",
      },
      { property: "og:title", content: "Gertrude Namutebi — Design Engineer" },
      { property: "og:image", content: "/portfolio/trudy-portrait-mfI0FsmO.png" },
    ],
    links: [
      { rel: "stylesheet", href: homeCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
  }),
  component: Index,
});

function PortfolioProjectLink({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  "aria-label"?: string;
}) {
  const study = href === "/work/fadarhy" ? fadarhy : href === "/work/dwellinn" ? dwellinn : attest;
  const isJia = href === "/work/jia";
  return (
    <span className={`${className ?? ""} project-link`} {...props}>
      <ProjectOverlay
        trigger={children}
        title={isJia ? "Jia" : study.name}
        subtitle={isJia ? "Loan App — UI/UX case study" : study.subtitle}
        sections={isJia ? jiaSections : caseSections(study)}
        fullPageHref={
          isJia ? "/work/jia" : (href as "/work/fadarhy" | "/work/attest" | "/work/dwellinn")
        }
        {...(isJia
          ? { iconSrc: "/images/jia/jia-logo.svg" }
          : href === "/work/attest"
            ? { iconSrc: "/images/donot-fraud/logo.png" }
            : {})}
      >
        {isJia ? (
          <JiaCaseStudyContent showNextNav={false} overlay />
        ) : (
          <CaseStudyContent study={study} showNextNav={false} overlay />
        )}
      </ProjectOverlay>
    </span>
  );
}

function Index() {
  const homeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { cursorRef, showBackToTop } = useLandingMotion(homeRef, progressRef);
  return (
    <ContextualPreviewProvider>
      <div ref={homeRef} className="portfolio-home min-h-screen bg-background">
        <div ref={cursorRef} className="portfolio-cursor" data-visible="false" aria-hidden="true" />
        <div className="landing-scroll-track" aria-hidden="true">
          <div ref={progressRef} className="landing-scroll-fill" />
        </div>
        <main id="top">
          <section className="fig-hero" aria-labelledby="hero-title">
            <h1 id="hero-title" className="fig-hero-title">
              I design interfaces. I engineer the systems behind them.
            </h1>
            <header className="fig-hero-header">
              <a href="#top" className="fig-hero-name">
                TRUDY
                <br />
                PORTFOLIO
              </a>
              <div className="fig-hero-actions">
                <span className="fig-hero-social" role="group" aria-label="Social media">
                  <a
                    href="https://www.behance.net/gertrudnamutebi"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Behance"
                    title="Behance"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/gertrude-mirriam-89913470/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                      aria-hidden="true"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a
                    href="https://x.com/NamutebiG"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="X"
                    title="X"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="17"
                      height="17"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"></path>
                    </svg>
                  </a>
                </span>
                <a
                  className="fig-hero-email"
                  href="https://github.com/trudy-pro"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github"
                    aria-hidden="true"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </header>
            <a
              className="fig-hero-tag"
              href="https://www.behance.net/gertrudnamutebi"
              target="_blank"
              rel="noreferrer noopener"
            >
              [ BASEL, SWITZERLAND ]
            </a>
            <div className="fig-hero-portrait">
              <img
                src="/portfolio/trudy-portrait-mfI0FsmO.png"
                alt="Portrait of Gertrude Namutebi"
                width="1240"
                height="1748"
                fetchPriority="high"
              />
            </div>
            <p className="fig-hero-word fig-hero-designer">DESIGNER</p>
            <p className="fig-hero-card fig-hero-intro fig-hero-intro-design">
              Product designer specialising in UI design and design systems.
            </p>
            <p className="fig-hero-card fig-hero-chip fig-hero-chip-human">
              HUMAN-AGENT
              <br />
              INTERACTION
            </p>
            <p className="fig-hero-word fig-hero-coder">
              <span aria-hidden="true">&lt;</span>CODER<span aria-hidden="true">&gt;</span>
            </p>
            <p className="fig-hero-card fig-hero-intro fig-hero-intro-code">
              Frontend engineer crafting digital products through code and AI.
            </p>
            <p className="fig-hero-card fig-hero-chip fig-hero-chip-eng">
              DESIGN
              <br />
              ENGINEERING
              <br />
              AGENTIC UX
            </p>
            <a href="#work" className="fig-hero-explore" aria-label="Scroll to about">
              Scroll
            </a>
          </section>
          <section id="work" className="floating-work" aria-labelledby="floating-work-title">
            <div className="floating-work-stage">
              <div className="floating-work-copy">
                <p className="work-tag about-tag">[ Get to know Trudy ]</p>
                <h2
                  id="floating-work-title"
                  className="about-statement"
                  aria-label="I’m Trudy, a Design Engineer. I design and build digital products through both design and frontend code. I use AI-assisted tools to accelerate development while maintaining control over design decisions and code quality."
                >
                  <span className="floating-line" aria-hidden="true">
                    <span className="floating-word">I’m </span>
                    <span className="floating-word">Trudy, </span>
                    <span className="floating-word">a </span>
                    <span className="floating-word">Design </span>
                    <span className="floating-word">Engineer. </span>
                    <span className="floating-word">I </span>
                    <span className="floating-word">design </span>
                    <span className="floating-word">and </span>
                    <span className="floating-word">build </span>
                    <span className="floating-word">digital </span>
                    <span className="floating-word">products </span>
                    <span className="floating-word">through </span>
                    <span className="floating-word">both </span>
                    <span className="floating-word">design </span>
                    <span className="floating-word">and </span>
                    <span className="floating-word">frontend </span>
                    <span className="floating-word">code.</span>
                  </span>
                  <span className="floating-line" aria-hidden="true">
                    <span className="floating-word">I </span>
                    <span className="floating-word">use </span>
                    <span className="floating-word">AI-assisted </span>
                    <span className="floating-word">tools </span>
                    <span className="floating-word">to </span>
                    <span className="floating-word">accelerate </span>
                    <span className="floating-word">development </span>
                    <span className="floating-word">while </span>
                    <span className="floating-word">maintaining </span>
                    <span className="floating-word">control </span>
                    <span className="floating-word">over </span>
                    <span className="floating-word">design </span>
                    <span className="floating-word">decisions </span>
                    <span className="floating-word">and </span>
                    <span className="floating-word">code </span>
                    <span className="floating-word">quality.</span>
                  </span>
                </h2>
              </div>
            </div>
          </section>
          <section id="projects" className="projects-section" aria-label="Projects">
            <div className="featured-section">
              <div className="featured-header">
                <p className="work-tag featured-tag">[ CASE STUDIES ]</p>
                <h2 className="featured-kicker">Projects</h2>
              </div>
              <ol className="case-list">
                <li
                  id="project-1"
                  className="case-item"
                  style={{ "--case-order": "0" } as CSSProperties}
                >
                  <PortfolioProjectLink
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 case-media"
                    aria-label="View case: FadäRhy"
                    href="/work/fadarhy"
                  >
                    <video
                      src="/videos/fadarhy-showcase.mp4"
                      poster="/videos/fadarhy-showcase-poster.jpg"
                      aria-label="FadäRhy"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      width="1920"
                      height="1080"
                    />
                  </PortfolioProjectLink>
                  <div className="case-body">
                    <span className="case-index">1</span>
                    <div className="case-intro">
                      <div>
                        <h3 className="case-title">FadäRhy</h3>
                        <p className="case-subtitle">
                          Founding Design Engineer · AI-ready Design System
                        </p>
                        <p className="case-summary">
                          I built FadäRhy’s design system and made it the single source of truth for
                          designers, developers, and AI coding assistants. FadäRhy matches founders
                          to the right labs, investors, and partners in the Basel and Upper Rhine
                          life sciences ecosystem. It started at a hackathon our team won.
                        </p>
                      </div>
                      <div className="case-preview">
                        <img
                          src="/portfolio/fadarhy-components.webp"
                          alt=""
                          loading="lazy"
                          width="240"
                          height="240"
                        />
                        <PortfolioProjectLink
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 case-view"
                          aria-label="Open case study 1"
                          href="/work/fadarhy"
                        >
                          View case{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </PortfolioProjectLink>
                      </div>
                    </div>
                    <div className="case-bottom">
                      <p className="case-categories">
                        Design engineering, AI-assisted frontend, Hackathon winner
                      </p>
                      <a
                        href="#project-2"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 case-next"
                      >
                        Next project{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-down"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14"></path>
                          <path d="m19 12-7 7-7-7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
                <li
                  id="project-2"
                  className="case-item"
                  style={{ "--case-order": "1" } as CSSProperties}
                >
                  <PortfolioProjectLink
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 case-media"
                    aria-label="View case: Jia Finance"
                    href="/work/jia"
                  >
                    <video
                      src="/videos/jia-showcase.mp4"
                      poster="/videos/jia-showcase-poster.jpg"
                      aria-label="Jia Finance"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      width="1920"
                      height="1080"
                    />
                  </PortfolioProjectLink>
                  <div className="case-body">
                    <span className="case-index">2</span>
                    <div className="case-intro">
                      <div>
                        <h3 className="case-title">Jia Finance</h3>
                        <p className="case-subtitle">End-to-End UX Design</p>
                        <p className="case-summary">
                          A loan app that rewards small-business owners for repaying on time. I took
                          part in the full UX process and designed the initial mobile app
                          interfaces.
                        </p>
                      </div>
                      <div className="case-preview">
                        <img
                          src="/portfolio/jia-preview-5.jpg?v=1"
                          alt=""
                          loading="lazy"
                          width="240"
                          height="240"
                        />
                        <PortfolioProjectLink
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 case-view"
                          aria-label="Open case study 2"
                          href="/work/jia"
                        >
                          View case{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </PortfolioProjectLink>
                      </div>
                    </div>
                    <div className="case-bottom">
                      <p className="case-categories">
                        End-to-end UX, Fintech, Mobile product design
                      </p>
                      <a
                        href="#project-3"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 case-next"
                      >
                        Next project{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-down"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14"></path>
                          <path d="m19 12-7 7-7-7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
                <li
                  id="project-3"
                  className="case-item"
                  style={{ "--case-order": "2" } as CSSProperties}
                >
                  <PortfolioProjectLink
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 case-media"
                    aria-label="View case: Do not fraud AI"
                    href="/work/attest"
                  >
                    <video
                      src="/videos/donot-fraud/verify-identity-home.mp4"
                      poster="/videos/donot-fraud/verify-identity-home-poster.jpg"
                      aria-label="Donot Fraud AI adaptive verification flow"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      width="1280"
                      height="720"
                    />
                  </PortfolioProjectLink>
                  <div className="case-body">
                    <span className="case-index">3</span>
                    <div className="case-intro">
                      <div>
                        <h3 className="case-title">Do not fraud AI</h3>
                        <p className="case-subtitle">Security UX &amp; Interaction Design</p>
                        <p className="case-summary">
                          A mobile identity-verification prototype for Swiss AI Weeks 2026. I
                          designed the UI that turns document, NFC and selfie checks into a guided
                          journey.
                        </p>
                      </div>
                      <div className="case-preview">
                        <img
                          src="/portfolio/donot-preview-2.png?v=1"
                          alt=""
                          loading="lazy"
                          width="240"
                          height="240"
                        />
                        <PortfolioProjectLink
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 case-view"
                          aria-label="Open case study 3"
                          href="/work/attest"
                        >
                          View case{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-arrow-right"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </PortfolioProjectLink>
                      </div>
                    </div>
                    <div className="case-bottom">
                      <p className="case-categories">Security UX, Interaction design, Hackathon</p>
                      <a
                        href="#project-1"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 case-next"
                      >
                        Next project{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-arrow-down"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14"></path>
                          <path d="m19 12-7 7-7-7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </section>
          <section id="about" className="about-section">
            <p className="work-tag about-tag">[ Get to know Trudy ]</p>
            <h2
              className="about-statement scroll-highlight"
              aria-label="Today, my focus is on designing thoughtful interfaces and building scalable design systems that bring design and engineering together."
            >
              <span className="floating-line" aria-hidden="true">
                <span className="floating-word">Today, </span>
                <span className="floating-word">my </span>
                <span className="floating-word">focus </span>
                <span className="floating-word">is </span>
                <span className="floating-word">on</span>
              </span>
              <span className="floating-line" aria-hidden="true">
                <span className="floating-word">designing </span>
                <span className="floating-word">thoughtful</span>
              </span>
              <span className="floating-line" aria-hidden="true">
                <span className="floating-word">interfaces </span>
                <span className="floating-word">and </span>
                <span className="floating-word">building</span>
              </span>
              <span className="floating-line" aria-hidden="true">
                <span className="floating-word">scalable </span>
                <span className="floating-word">design </span>
                <span className="floating-word">systems</span>
              </span>
              <span className="floating-line" aria-hidden="true">
                <span className="floating-word">that </span>
                <span className="floating-word">bring </span>
                <span className="floating-word">design </span>
                <span className="floating-word">and</span>
              </span>
              <span className="floating-line" aria-hidden="true">
                <span className="floating-word">engineering </span>
                <span className="floating-word">together.</span>
              </span>
            </h2>
            <div className="my-start">
              <img
                src="/portfolio/trudy-worked-2.png?v=1"
                alt="Portrait of Gertrude Namutebi"
                loading="lazy"
                width="288"
                height="555"
              />
              <div className="about-body">
                <p className="eyebrow">[ WHERE I HAVE WORKED ]</p>
                <ul className="work-history">
                  <li>
                    <p>
                      <span className="work-history-org">Duda Build</span> — Design Engineer ·
                      Product &amp; Digital (Freelance)
                    </p>
                    <p className="work-history-dates">Dec 2020 – Present</p>
                  </li>
                  <li>
                    <p>
                      <span className="work-history-org">HGK Basel (FHNW) — Master’s</span> — Design
                      Researcher
                    </p>
                    <p className="work-history-dates">Sept 2025 – Sept 2027</p>
                  </li>
                  <li>
                    <p>
                      <span className="work-history-org">FadäRhy (Hackathon, Winning Team)</span> —
                      Cofounder · Life Sciences &amp; Startup Ecosystem (AI)
                    </p>
                    <p className="work-history-dates">Oct 2026 – Present</p>
                  </li>
                  <li>
                    <p>
                      <span className="work-history-org">Donot Fraud AI (Swisscom Challenge)</span>{" "}
                      — Design Lead, AI Builder · Fintech, IT &amp; Digital Trust (Identity Fraud,
                      AI)
                    </p>
                    <p className="work-history-dates">Sept 2026</p>
                  </li>
                  <li>
                    <p>
                      <span className="work-history-org">
                        FHNW · Institute of Interactive Technologies
                      </span>{" "}
                      — Research Associate, HCI &amp; XR · AI
                    </p>
                    <p className="work-history-dates">Sep 2024 – Sep 2025</p>
                  </li>
                  <li>
                    <p>
                      <span className="work-history-org">Jia</span> — Product Designer · Fintech
                      (Lending)
                    </p>
                    <p className="work-history-dates">Jun 2022 – Jun 2023</p>
                  </li>
                  <li>
                    <p>
                      <span className="work-history-org">ClinicMaster INTERNATIONAL</span> —
                      Creative Designer | Digital Marketing Manager · Healthcare (HealthTech)
                    </p>
                    <p className="work-history-dates">Jan 2020 – Jul 2021</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="about-me">
              <p className="eyebrow">[ TODAY ]</p>
              <p>
                I'm currently a Design Researcher at FHNW (HGK) in Basel and am seeking
                opportunities in design, frontend engineering, and design systems.
              </p>
              <div className="about-actions">
                <a
                  href="/Gertrude-Namutebi-CV.pdf"
                  download="Gertrude-Namutebi-CV.pdf"
                  className="resume-link"
                >
                  Download my CV
                </a>
                <a
                  href="https://github.com/trudy-pro"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="secondary-link"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </main>
        <nav aria-label="Main" className="hero-dock persistent-dock">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 dock-link"
          >
            Work
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 dock-link"
          >
            Projects
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 dock-link"
          >
            About
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 dock-contact"
          >
            Let’s talk{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-up-right"
              aria-hidden="true"
            >
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
          {showBackToTop && (
            <a
              href="#top"
              className="dock-top inline-flex items-center justify-center"
              aria-label="Back to top"
              title="Back to top"
            >
              ↑
            </a>
          )}
        </nav>
        <footer id="contact" className="portfolio-footer" aria-labelledby="footer-invitation">
          <div className="footer-scene">
            <LandingFooterMotion homeRef={homeRef} />
            <div className="footer-collage" aria-label="Project previews">
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-1"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "-4deg" } as CSSProperties}
                aria-label="Preview project 1: FadäRhy"
                href="/work/fadarhy"
              >
                <img
                  src="/portfolio/footer/fadarhy-hero.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-2"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "3deg" } as CSSProperties}
                aria-label="Preview project 3: Do not fraud AI"
                href="/work/attest"
              >
                <img
                  src="/portfolio/footer/donot-choose-method.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-3"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "-2deg" } as CSSProperties}
                aria-label="Preview project 2: Jia Finance"
                href="/work/jia"
              >
                <img
                  src="/portfolio/footer/jia-credit-terms.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-4"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "5deg" } as CSSProperties}
                aria-label="Preview project 3: Do not fraud AI"
                href="/work/attest"
              >
                <img
                  src="/portfolio/footer/donot-method-details.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-5"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "-3deg" } as CSSProperties}
                aria-label="Preview project 3: Do not fraud AI"
                href="/work/attest"
              >
                <img
                  src="/portfolio/footer/donot-verified.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-6"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "2deg" } as CSSProperties}
                aria-label="Preview project 2: Jia Finance"
                href="/work/jia"
              >
                <img
                  src="/portfolio/footer/jia-dashboard.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-7"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "-5deg" } as CSSProperties}
                aria-label="Preview project 1: FadäRhy"
                href="/work/fadarhy"
              >
                <img
                  src="/portfolio/footer/fadarhy-problem.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-8"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "4deg" } as CSSProperties}
                aria-label="Preview project 2: Jia Finance"
                href="/work/jia"
              >
                <img
                  src="/portfolio/footer/jia-logo-card.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
              <PortfolioProjectLink
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 footer-project footer-project-9"
                style={{ "--dx": "0px", "--dy": "0px", "--tilt": "-1deg" } as CSSProperties}
                aria-label="Preview project 1: FadäRhy"
                href="/work/fadarhy"
              >
                <img
                  src="/portfolio/footer/fadarhy-pilot.webp"
                  alt=""
                  loading="lazy"
                  width="1000"
                  height="714"
                  draggable={false}
                />
              </PortfolioProjectLink>
            </div>
            <div className="footer-invitation">
              <h2 id="footer-invitation">
                Let's build something
                <br />
                together.
              </h2>
              <div className="footer-actions">
                <a
                  href="mailto:gnamutebi7@gmail.com"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 footer-talk"
                >
                  Let's talk{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-credits">
            <p>© 2026 Gertrude Namutebi</p>
            <span className="footer-social" role="group" aria-label="Social media">
              <a
                href="https://www.behance.net/gertrudnamutebi"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Behance"
                title="Behance"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/gertrude-mirriam-89913470/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://x.com/NamutebiG"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X"
                title="X"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"></path>
                </svg>
              </a>
            </span>
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
            >
              Back to top{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up"
                aria-hidden="true"
              >
                <path d="m5 12 7-7 7 7"></path>
                <path d="M12 19V5"></path>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </ContextualPreviewProvider>
  );
}
