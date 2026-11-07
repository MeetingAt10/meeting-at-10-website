export type Member = { name: string; role: string; focus?: string; hour: number };

/** Every member holds an hour on the clock face. The tenth hour belongs to the meeting. */
export const groups: { name: string; note?: string; pairs?: boolean; members: Member[] }[] = [
  { name: 'Engineering', members: [
    { name: 'Reyes', role: 'Lead Developer', focus: 'Architecture, the shared codebase and releases.', hour: 12 },
    { name: 'Dela Cruz', role: 'Fullstack Developer', focus: 'Features from the SPA to the API.', hour: 1 },
    { name: 'Jumuad', role: 'Project Manager, Backend Developer', focus: 'Planning, delivery and the Express API.', hour: 2 },
  ] },
  { name: 'Design and analysis', members: [
    { name: 'Sebial', role: 'UI/UX Developer', focus: 'Interface design and the Office Hours system.', hour: 3 },
    { name: 'Añonuevo', role: 'System Analyst', focus: 'Requirements and user stories.', hour: 4 },
  ] },
  { name: 'Documentation and research', pairs: true, note: 'Technical writing and background research.', members: [
    { name: 'Balili', role: 'Documentation Head, Researcher', focus: 'Leads the written record.', hour: 5 },
    { name: 'Alaña', role: 'Documentation, Researcher', hour: 6 },
    { name: 'Belardo', role: 'Documentation, Researcher', hour: 7 },
    { name: 'Comawas', role: 'Documentation, Researcher', hour: 8 },
  ] },
  { name: 'Finance and logistics', members: [
    { name: 'Magpantay', role: 'Finance Head', focus: 'Budget and team resources.', hour: 9 },
    { name: 'Suico', role: 'Logistics', focus: 'Schedules, materials and coordination.', hour: 11 },
  ] },
];

export const members = groups.flatMap(group => group.members);
export const memberId = (name: string) => `member-${name.toLowerCase().normalize('NFD').replace(/[^a-z]/g, '')}`;
