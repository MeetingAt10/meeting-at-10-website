type Tone = "eng" | "design" | "docs" | "ops";
type Member = { name: string; role: string; portrait: string; size?: number; focus?: string };
export const groups: { name: string; tone: Tone; note?: string; pairs?: boolean; members: Member[] }[] = [
  { name: "Engineering", tone: "eng", members: [
    { name: "Reyes", portrait: "reyes", role: "Lead Developer", focus: "Architecture, the shared codebase and releases." },
    { name: "Dela Cruz", portrait: "dela-cruz", role: "Fullstack Developer", focus: "Features from the SPA to the API." },
    { name: "Jumuad", portrait: "jumuad", size: 400, role: "Project Manager, Backend Developer", focus: "Planning, delivery and the Express API." },
  ] },
  { name: "Design and analysis", tone: "design", members: [
    { name: "Sebial", portrait: "sebial", role: "UI/UX Developer", focus: "Interface design and the Office Hours system." },
    { name: "Añonuevo", portrait: "anonuevo", role: "System Analyst", focus: "Requirements, modules and user stories." },
  ] },
  { name: "Documentation and research", tone: "docs", pairs: true, note: "Technical writing and background research.", members: [
    { name: "Balili", portrait: "balili", role: "Documentation Head, Researcher", focus: "Leads the written record." },
    { name: "Alaña", portrait: "alana", role: "Documentation, Researcher" },
    { name: "Belardo", portrait: "belardo", role: "Documentation, Researcher" },
    { name: "Comawas", portrait: "comawas", role: "Documentation, Researcher" },
  ] },
  { name: "Finance and logistics", tone: "ops", pairs: true, members: [
    { name: "Magpantay", portrait: "magpantay", size: 300, role: "Finance Head", focus: "Budget and team resources." },
    { name: "Suico", portrait: "suico", role: "Logistics", focus: "Schedules, materials and coordination." },
  ] },
];
