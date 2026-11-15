import { CaseStudyHeader } from "@/components/case-study/case-study-header";
import {
  CaseStudyImage,
  CaseStudyVideo,
  EditorialContentSection,
  NextProjectNavigation,
  Prose,
  ProjectDetail,
  Reveal,
  ToolsSection,
  type CaseSection,
} from "@/components/case-study/case-study";

export const jiaSections: CaseSection[] = [
  { id: "cs-intro", label: "Intro" },
  { id: "cs-contribution", label: "Contribution" },
  { id: "background", label: "Company background" },
  { id: "introduction", label: "Jia rewards borrowers" },
  { id: "onboarding", label: "Business onboarding" },
  { id: "reflection", label: "Reflection" },
];

/** The full Jia editorial case study body, shared by the /work/jia page and the home-page project overlay. */
export function JiaCaseStudyContent({
  showNextNav = true,
  overlay = false,
}: {
  showNextNav?: boolean;
  overlay?: boolean;
}) {
  return (
    <>
      <header>
        <CaseStudyVideo
          className="cs-cover jia-cover-video"
          src="/videos/jia-showcase.mp4"
          poster="/videos/jia-showcase-poster.jpg"
          label="Showcase video of the Jia loan app's final screens"
        />
        <CaseStudyHeader
          title="Jia"
          showLabel={false}
          category="Loan App — UI/UX case study"
          subtitle="Designing a mobile and web financial experience"
          lede="Jia set out to reward good borrowing: small-business owners who repay on time earn Jia tokens that unlock lower fees and higher limits."
        >
          {null}
        </CaseStudyHeader>
        <Reveal id="cs-contribution" className="cs-contribution">
          <h2 id="cs-contribution-heading" className="cs-section-label" aria-label="Contribution">
            [ CONTRIBUTION ]
          </h2>
          <Prose>
            <p>
              I participated in the complete UX process and was responsible for the initial mobile
              application designs.
            </p>
          </Prose>
          <dl className="project-details cs-facts cs-facts-row">
            <ProjectDetail label="Role" values={["UX designer"]} />
            <ProjectDetail label="Year" values={["2023"]} />
            <ProjectDetail
              label="Project type"
              values={[
                "Mobile loan app",
                "UX case study",
                "Fintech",
                "UX Research",
                "Product Design",
              ]}
              className="col-span-2 sm:col-span-1"
            />
            <ProjectDetail
              label="Scope"
              values={["80+ screens", "1.5 years"]}
              className="col-span-2"
            />
            <ProjectDetail
              label="Process"
              values={["End-to-end UX process — from research to usability testing"]}
              className="col-span-2 sm:col-span-1"
            />
          </dl>
          <ToolsSection
            tools={[
              { name: "Figma", icon: "/portfolio/tools/figma.webp" },
              { name: "Miro", icon: "/portfolio/tools/miro.svg" },
              { name: "Notion", icon: "/portfolio/tools/notion.webp" },
            ]}
          />
        </Reveal>
      </header>

      <EditorialContentSection
        id="background"
        index={1}
        label="Company background"
        title="Designing Jia's Digital Lending Experience from the Ground Up"
      >
        <Prose>
          <p>
            Founded in 2022,{" "}
            <strong>
              Jia is a fintech company focused on making financing more accessible to small
              businesses in emerging markets.
            </strong>{" "}
            In 2023, the company raised <strong>$4.3 million in seed funding</strong>, alongside an
            additional <strong>$1 million in on-chain liquidity</strong>, to support its growth and
            expansion.
          </p>
        </Prose>
        <CaseStudyImage
          className="cs-image-app-window"
          src="/images/jia/lending-dashboard-v3.jpg"
          alt="Jia business lending dashboard showing payment schedule progress, loan terms, projected outstanding balance and Jia rewards points"
        />
        <Prose>
          <p>
            I helped design Jia's digital product from the ground up, leading UX research, defining
            user flows and information architecture, and designing interfaces to simplify onboarding
            and make financial services easier to navigate.
          </p>
        </Prose>
      </EditorialContentSection>

      <EditorialContentSection
        id="introduction"
        index={2}
        label="Jia rewards borrowers"
        title="Making good borrowing pay off"
      >
        <CaseStudyImage
          className="jia-rewards-preview"
          src="/images/jia/borrower-rewards.png"
          alt="Jia rewards program showing activity history and Silver, Platinum and Gold reward tiers with borrowing and supplier benefits"
        />
        <Prose>
          <p>
            Lending apps in Kenya treat every loan as a one-off transaction. A small business owner
            who repays on time gets nothing for it: limits stay as low as KES 1,000, repayment
            windows stay at 30 days, and interest stays high. With no reason to stay, borrowers
            don't. And the people who keep the lending system healthy are the ones it rewards least.
          </p>
          <p>
            I designed Jia, a loan app that treats good borrowers like owners. Repaying on time,
            referring friends and acting as a guarantor earn Jia tokens. The tokens unlock what
            business owners told me they needed to grow: lower interest, higher loan limits, a
            seven-day grace period and access to cheaper suppliers.
          </p>
        </Prose>
      </EditorialContentSection>

      <EditorialContentSection
        id="onboarding"
        index={3}
        label="Business onboarding"
        title="Reducing friction in business onboarding"
      >
        <CaseStudyImage
          className="cs-image-app-window"
          src="/images/jia/business-onboarding-v2.jpg"
          alt="Jia onboarding screen for choosing credit amount, payment term and rewards benefits, with a payment summary"
        />
        <Prose>
          <p>
            Jia provides growth financing to small businesses, but onboarding requires entrepreneurs
            to navigate several steps and provide information about their businesses. My focus was
            on simplifying this journey, making the process easier to understand and complete.
          </p>
          <p>
            I contributed to UX research, examining the existing onboarding experience to identify
            friction points, confusing information and opportunities to improve the user journey. I
            mapped user flows, explored alternative ways to structure the process and developed
            wireframes to clarify the sequence of steps and information presented to users.
          </p>
          <p>
            I translated these decisions into interface designs, refining form layouts, visual
            hierarchy and navigation to make onboarding more intuitive. My contribution connected
            research findings to practical design improvements, helping Jia create a clearer, more
            consistent onboarding experience.
          </p>
        </Prose>
      </EditorialContentSection>

      <EditorialContentSection id="reflection" index={4} label="Reflection" title="What I learned">
        <Prose>
          <p>
            Rewards only motivate when they're clear. Testers liked Jia tokens but kept asking how
            to earn them, so the next version would show progress and the next step after every
            action.
          </p>
          <p>
            Who you interview shapes what you hear. Colour preferences seemed to differ by gender,
            but my sample was too small to tell. Next time I'd recruit a wider mix of people.
          </p>
          <p>
            Users wanted more than a loan. Requests for bookkeeping and cheaper suppliers showed me
            Jia's real opportunity is supporting how a small business runs.
          </p>
        </Prose>
      </EditorialContentSection>

      {showNextNav && <NextProjectNavigation current="Jia" />}
    </>
  );
}
