import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { CaseStudyContent } from "@/components/case-study/generic-case-study";
import { fadarhy } from "@/content/case-studies";

afterEach(cleanup);

it("exposes a named contribution region, meaningful headings, and labelled lists without decorative symbols", () => {
  const { showcase, ...study } = fadarhy;
  render(
    <CaseStudyContent
      study={{
        ...study,
        contribution: {
          role: "Product designer",
          context: "Collaborative project",
          mine: ["Research", "Design", "Implementation"],
          notMine: ["Backend services", "Data collection"],
        },
        sections: [],
      }}
      showNextNav={false}
    />,
  );
  const card = within(screen.getByRole("region", { name: "Contribution" }));
  expect(card.getByRole("heading", { level: 3, name: "My role" })).toBeInTheDocument();
  expect(card.getByRole("heading", { level: 3, name: "What I did" })).toBeInTheDocument();
  expect(card.getByRole("heading", { level: 3, name: "Not my work" })).toBeInTheDocument();
  expect(
    within(card.getByRole("list", { name: "What I did" })).getAllByRole("listitem"),
  ).toHaveLength(3);
  expect(
    within(card.getByRole("list", { name: "Not my work" })).getAllByRole("listitem"),
  ).toHaveLength(2);
  expect(card.queryAllByText(/^[+−]$/)).toHaveLength(0);
});
