import { Logo, Reveal, Timetable, type TimetableDay, type TimetableEvent } from "@meetingat10/design-system/react";

const TODAY: TimetableDay[] = [{ id: "today", label: "Today", fullLabel: "A working day at Meeting At 10", isToday: true }];
const DAY: TimetableEvent[] = [
  { id: "standup", day: "today", start: 10, end: 10.5, title: "Standup", meta: "Everyone, 15 minutes" },
  { id: "build", day: "today", start: 10.5, end: 12.5, title: "Build", meta: "Pairs, one task each", lane: "consult" },
  { id: "lunch", day: "today", start: 12.5, end: 13.5, title: "Lunch", form: "taken", stateLabel: "Away" },
  { id: "review", day: "today", start: 13.5, end: 15, title: "Review", meta: "Walk through what changed", lane: "community" },
  { id: "ship", day: "today", start: 16, end: 17, title: "Ship", meta: "Tag, deploy, write it down" },
];

export function AboutSection() {
  return (
    <section id="about" className="mt-section mt-about" aria-labelledby="about-title">
      <div className="mt-about__intro">
        <Reveal><h2 id="about-title" className="mt-h2">A small team with a standing appointment</h2></Reveal>
        <Reveal index={1}><p className="mt-body">Meeting At 10 is eleven students from the College of Computer Studies at Quezon City University. We research, specify, design, build and run ACCS, the workspace that brings CCS community, consultations and concern reporting together.</p></Reveal>
        <Reveal index={2}><p className="mt-body">Every day starts with a ten o&apos;clock standup. Work moves in pairs, gets reviewed the same afternoon, and ships with a tag and a written note. The sheet on the right is that day.</p></Reveal>
        <Reveal index={3}><Logo size="lg" /></Reveal>
      </div>
      <Reveal variant="fade" className="mt-about__sheet">
        <Timetable label="A working day at Meeting At 10" days={TODAY} events={DAY} now={10} startHour={8} endHour={18} isolate={false} />
        <p className="mt-caption">Our day sheet. The now-line stays at 10:00.</p>
      </Reveal>
    </section>
  );
}
