import { Badge, Hero, Logo, Timetable, type TimetableDay, type TimetableEvent } from "@meetingat10/design-system/react";

const TODAY: TimetableDay[] = [{ id: "today", label: "Today", fullLabel: "A working day at Meeting At 10", isToday: true }];
const DAY: TimetableEvent[] = [
  { id: "standup", day: "today", start: 10, end: 10.5, title: "Standup", meta: "Everyone, 15 minutes" },
  { id: "build", day: "today", start: 10.5, end: 12.5, title: "Build", meta: "Pairs, one task each", lane: "consult" },
  { id: "lunch", day: "today", start: 12.5, end: 13.5, title: "Lunch", form: "taken", stateLabel: "Away" },
  { id: "review", day: "today", start: 13.5, end: 15, title: "Review", meta: "Demo what changed", lane: "community" },
  { id: "ship", day: "today", start: 16, end: 17, title: "Ship", meta: "Tag, deploy, write it down" },
];

export default function Home() {
  return (
    <main>
      <Hero
        plate={<Logo size="lg" />}
        title="We meet at 10. Then we ship."
        lead="Meeting At 10 is the capstone team behind ACCS, a college workspace for the College of Computer Studies."
        actions={<Badge tone="info" form="pending">Coming soon</Badge>}
        note="The now-line on our day sheet never moves. It is always 10:00."
        art={<Timetable label="A working day at Meeting At 10" days={TODAY} events={DAY} now={10} startHour={8} endHour={18} isolate={false} />}
      />
    </main>
  );
}
