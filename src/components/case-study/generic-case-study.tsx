import { CaseStudyHeader } from "@/components/case-study/case-study-header";
import {
  CaseStudyImage,
  CaseStudyVideo,
  EditorialContentSection,
  NextProjectNavigation,
  ProjectDetail,
  Prose,
  Reveal,
  ToolsSection,
} from "@/components/case-study/case-study";
import { attestVisuals } from "@/components/case-study/attest-visuals";
import { fadarhyVisuals } from "@/components/case-study/fadarhy-visuals";
import type { CaseStudy, CaseStudyBlock } from "@/content/case-studies";

function Callout({
  tone,
  title,
  text,
}: {
  tone: "evidence" | "boundary" | "extension";
  title: string;
  text: string;
}) {
  const label =
    tone === "evidence" ? "Evidence" : tone === "boundary" ? "Scope boundary" : "Independent work";
  return (
    <Reveal>
      <aside className={`cs-callout cs-callout-${tone}`}>
        <p className="text-[13px] text-muted-foreground">{label}</p>
        <h3 className="mt-2 text-[17px] font-semibold">{title}</h3>
        <p className="body-copy mt-3 text-[16px] leading-[1.7]">{text}</p>
      </aside>
    </Reveal>
  );
}

function Block({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "text":
      return (
        <Prose>
          {block.title && (
            <h3 className="text-[23px] font-semibold leading-tight">{block.title}</h3>
          )}
          {block.paragraphs.map((paragraph, index) => {
            if (typeof paragraph === "string") {
              return <p key={index}>{paragraph}</p>;
            }

            const emphasisIndex = paragraph.text.indexOf(paragraph.strong);
            if (emphasisIndex < 0) {
              return <p key={index}>{paragraph.text}</p>;
            }

            return (
              <p key={index}>
                {paragraph.text.slice(0, emphasisIndex)}
                <strong>{paragraph.strong}</strong>
                {paragraph.text.slice(emphasisIndex + paragraph.strong.length)}
              </p>
            );
          })}
        </Prose>
      );
    case "callout":
      return <Callout tone={block.tone} title={block.title} text={block.text} />;
    case "table":
      return (
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <h3 className="border-b border-border bg-muted px-6 py-4 text-[16px] font-medium">
              {block.title}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[660px] border-collapse text-left text-[14px]">
                <caption className="sr-only">{block.title}</caption>
                <thead>
                  <tr>
                    {block.head.map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="border-b border-border px-6 py-3 text-[12px] font-medium text-muted-foreground"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-border last:border-0">
                      {row.map((cell, index) =>
                        index === 0 ? (
                          <th
                            key={index}
                            scope="row"
                            className="px-6 py-4 align-top font-medium leading-relaxed"
                          >
                            {cell}
                          </th>
                        ) : (
                          <td
                            key={index}
                            className="px-6 py-4 align-top leading-relaxed text-muted-foreground"
                          >
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      );
    case "rows":
      return (
        <Reveal>
          {block.title && (
            <h3
              className={
                block.variant === "stacked"
                  ? "mb-6 text-[23px] font-semibold leading-tight"
                  : "mb-6 text-[13px] text-muted-foreground"
              }
            >
              {block.title}
            </h3>
          )}
          <dl className="max-w-[760px]">
            {block.rows.map(([term, def]) => (
              <div
                key={term}
                className={
                  block.variant === "stacked"
                    ? "space-y-2 py-4"
                    : "grid gap-1 border-t border-border py-4 sm:grid-cols-[240px_1fr] sm:gap-8"
                }
              >
                <dt
                  className={
                    block.variant === "stacked"
                      ? "text-[16px] font-semibold"
                      : "text-[16px] font-medium"
                  }
                >
                  {term}
                </dt>
                <dd className="text-[16px] leading-[1.6] text-muted-foreground">{def}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      );
    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <Prose>
          {block.title && (
            <h3
              className={
                block.title === "What I learned"
                  ? "text-[17px] font-semibold"
                  : "text-[13px] text-muted-foreground"
              }
            >
              {block.title}
            </h3>
          )}
          <ListTag className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5`}>
            {block.items.map((item, index) => {
              if (typeof item === "string") return <li key={index}>{item}</li>;
              const position = item.text.indexOf(item.strong);
              return (
                <li key={index}>
                  {position < 0 ? (
                    item.text
                  ) : (
                    <>
                      {item.text.slice(0, position)}
                      <strong>{item.strong}</strong>
                      {item.text.slice(position + item.strong.length)}
                    </>
                  )}
                </li>
              );
            })}
          </ListTag>
        </Prose>
      );
    }
    case "steps":
      return (
        <Reveal>
          <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {block.steps.map((step, i) => (
              <li key={step.title} className="border-t border-border pt-4">
                <span className="mb-2 block text-[13px] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-medium">{step.title}</h3>
                <p className="body-copy mt-2 text-[16px] leading-[1.6] text-muted-foreground">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      );
    case "figure":
      return (
        <CaseStudyImage
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          className={
            block.variant === "mobile"
              ? "max-w-[420px]"
              : block.variant === "compact"
                ? "max-w-[680px]"
                : undefined
          }
        />
      );
    case "video":
      return (
        <CaseStudyVideo
          src={block.src}
          poster={block.poster}
          label={block.label}
          caption={block.caption}
        />
      );
    case "visual": {
      const Visual = { ...fadarhyVisuals, ...attestVisuals }[block.name];
      return <Visual />;
    }
    case "placeholder":
      // Owner note for evidence still to be added — not shown publicly.
      return null;
  }
}

/** Renders a data-driven case study in the shared editorial layout, used by the /work/* pages and the home-page overlays. */
export function CaseStudyContent({
  study,
  showNextNav = true,
  overlay = false,
}: {
  study: CaseStudy;
  showNextNav?: boolean;
  overlay?: boolean;
}) {
  const factsBelowContribution = study.slug === "fadarhy" && Boolean(study.contribution);
  const facts = (
    <dl className="cs-facts">
      {study.details
        ? study.details.map((detail) => (
            <ProjectDetail key={detail.label} label={detail.label} values={detail.values} />
          ))
        : study.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
    </dl>
  );
  return (
    <>
      <header data-case-study={study.slug}>
        {study.showcase && (
          <CaseStudyVideo
            className="cs-cover case-cover-video"
            src={study.showcase.src}
            poster={study.showcase.poster}
            label={study.showcase.label}
          />
        )}
        <CaseStudyHeader
          title={study.name}
          category={study.category ?? study.subtitle}
          subtitle={study.title ?? study.subtitle}
          lede={study.lede}
        >
          {study.liveUrl && (
            <p className="mt-6 text-[15px]">
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                Try the live app ↗
              </a>
            </p>
          )}
          {!factsBelowContribution && facts}
        </CaseStudyHeader>
        {study.contribution && (
          <Reveal id="cs-contribution" className="cs-contribution">
            {(study.contribution.role || study.contribution.summary) && (
              <h2
                id="cs-contribution-heading"
                className="cs-section-label"
                aria-label="Contribution"
              >
                [ CONTRIBUTION ]
              </h2>
            )}
            {study.contribution.summary ? (
              <Prose>
                <p>{study.contribution.summary}</p>
              </Prose>
            ) : (
              <div
                {...(study.contribution.role
                  ? { role: "region", "aria-labelledby": "cs-contribution-heading" }
                  : {})}
                className={
                  study.contribution.role
                    ? "cs-scope cs-contribution-card fr-theme"
                    : "cs-scope cs-contribution-grid"
                }
              >
                {study.contribution.role ? (
                  <>
                    <div className="cs-scope-grid">
                      <div>
                        <h3 className="cs-scope-label">My role</h3>
                        <p className="cs-scope-role">{study.contribution.role}</p>
                        {study.contribution.context && (
                          <p className="cs-scope-context">{study.contribution.context}</p>
                        )}
                      </div>
                      <div>
                        <h3 id="cs-contribution-mine" className="cs-scope-label">
                          What I did
                        </h3>
                        <ul role="list" aria-labelledby="cs-contribution-mine">
                          {study.contribution.mine.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 id="cs-contribution-not-mine" className="cs-scope-label">
                          Not my work
                        </h3>
                        <ul
                          className="cs-scope-not"
                          role="list"
                          aria-labelledby="cs-contribution-not-mine"
                        >
                          {study.contribution.notMine.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-[13px] text-muted-foreground">What I did</h2>
                      <ul className="cs-reading mt-4 list-disc space-y-2 pl-5 text-[19px] leading-[1.6]">
                        {study.contribution.mine.map((item) => (
                          <li key={item.slice(0, 40)}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-[13px] text-muted-foreground">What I didn't do</h2>
                      <ul className="cs-reading mt-4 list-disc space-y-2 pl-5 text-[19px] leading-[1.6] text-muted-foreground">
                        {study.contribution.notMine.map((item) => (
                          <li key={item.slice(0, 40)}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
            {factsBelowContribution && facts}
            {study.tools && <ToolsSection tools={study.tools} />}
          </Reveal>
        )}
        {!study.contribution && study.tools && (
          <Reveal>
            <ToolsSection tools={study.tools} />
          </Reveal>
        )}
      </header>

      {study.sections.map((section, i) => (
        <EditorialContentSection
          key={section.id}
          id={section.id}
          index={i + 1}
          label={section.label}
          title={section.title}
          introduction={section.introduction}
          layout={section.layout}
        >
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </EditorialContentSection>
      ))}

      {showNextNav && <NextProjectNavigation current={study.name} />}
    </>
  );
}
