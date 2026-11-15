import type { ReactNode } from "react";
import { caseStudyNumber } from "@/lib/case-study-meta";

/** Shared ZIP-style article header; project copy is supplied by the existing study. */
export function CaseStudyHeader({
  title,
  category,
  subtitle,
  lede,
  children,
}: {
  title: string;
  category: string;
  subtitle: string;
  lede?: string | undefined;
  children: ReactNode;
}) {
  return (
    <section id="cs-intro" className="cs-hero">
      {title === "FadäRhy" ? (
        <h2 className="cs-section-label">[ COMPANY BACKGROUND ]</h2>
      ) : (
        <h2 className="cs-section-label">[ CASE STUDY {caseStudyNumber(title)} ]</h2>
      )}
      <p className="cs-category">{category}</p>
      <h1 className="case-page-title cs-title">
        {title}
        <span className="cs-subtitle">{subtitle}</span>
      </h1>
      {lede?.split("\n\n").map((paragraph, index) => (
        <p key={index} className="case-page-lede cs-lede">
          {paragraph}
        </p>
      ))}
      {children}
    </section>
  );
}
