const caseNumbers: Record<string, string> = {
  FadäRhy: "01",
  Jia: "02",
  "Donot Fraud AI": "03",
  Dwellinn: "04",
};
export function caseStudyNumber(title: string) {
  return caseNumbers[title] ?? "";
}
