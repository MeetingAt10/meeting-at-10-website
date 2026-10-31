import {
  Aurora, Avatar, Badge, Button, CountUp, FloatingArt, Footer, Grid,
  GridBackdrop, Hero, Icon, Logo, Marquee, Navbar, ParallaxScene, Reveal,
  ScrollProgress, Section, SectionHeader, SpotlightCard, Timetable, WordReveal,
  imagery, type ImageryName, type TimetableDay, type TimetableEvent,
} from "@meetingat10/design-system/react";
import { sites } from "@/lib/sites";

const TODAY: TimetableDay[] = [{ id: "today", label: "Today", fullLabel: "A working day at Meeting At 10", isToday: true }];
const DAY: TimetableEvent[] = [
  { id: "standup", day: "today", start: 10, end: 10.5, title: "Standup", meta: "Everyone, 15 minutes" },
  { id: "build", day: "today", start: 10.5, end: 12.5, title: "Build", meta: "Pairs, one task each", lane: "consult" },
  { id: "lunch", day: "today", start: 12.5, end: 13.5, title: "Lunch", form: "taken", stateLabel: "Away" },
  { id: "review", day: "today", start: 13.5, end: 15, title: "Review", meta: "Demo what changed", lane: "community" },
  { id: "ship", day: "today", start: 16, end: 17, title: "Ship", meta: "Tag, deploy, write it down" },
];

const stack = ["React 19", "Next.js 16", "TypeScript", "Vite", "Express 5", "React Aria", "Motion", "Tailwind CSS 4", "AWS CloudFront", "Amazon S3", "AWS Lambda", "CloudFormation", "GitHub Actions"];
const work = [
  { name: "ACCS landing", code: "01 / INTRODUCE", description: "The college workspace, its modules and the people it is for.", image: "linked-c-frosted", href: sites.landing, link: "Explore ACCS" },
  { name: "ACCS Home", code: "02 / BUILD", description: "A capstone prototype for community, consultations and concern reporting.", image: "neural-sphere", href: `${sites.portal}/sign-in`, link: "Open ACCS Home" },
  { name: "Design system", code: "03 / CONNECT", description: "Office Hours: one visual language and component library for every surface.", image: "grid-cube", href: sites.design, link: "Read the design system" },
] as const;
const counts = [
  { id: "modules", value: 58, label: "modules specified" },
  { id: "stories", value: 58, label: "user stories" },
  { id: "cases", value: 183, label: "black-box test cases" },
  { id: "sites", value: Object.keys(sites).length, label: "sites on AWS" },
];
const process = [
  { title: "Specify", description: "Start with the module inventory and user stories. Agree on what belongs." },
  { title: "Design", description: "Use one design system for every surface. Give each lane a clear purpose." },
  { title: "Build", description: "Connect the portal, API, landing and this site. Keep the pieces small." },
  { title: "Verify", description: "Check the black-box blueprint, walk the browser flows and verify CloudFront deploys." },
];
const departments = [
  { name: "Documentation & Research", members: [
    { name: "Alaña", role: "Documentation, Researcher" },
    { name: "Balili", role: "Documentation Head, Researcher" },
    { name: "Belardo", role: "Documentation, Researcher" },
    { name: "Comawas", role: "Documentation, Researcher" },
  ] },
  { name: "Development", members: [
    { name: "Dela Cruz", role: "Fullstack Developer" },
    { name: "Jumuad", role: "Project Manager, Backend Developer" },
    { name: "Reyes", role: "Lead Developer" },
    { name: "Sebial", role: "UI/UX Developer" },
  ] },
  { name: "System Analysis", members: [{ name: "Añonuevo", role: "System Analyst" }] },
  { name: "Finance & Logistics", members: [
    { name: "Magpantay", role: "Finance Head" },
    { name: "Suico", role: "Logistics" },
  ] },
];

function Art({ name, className, depth, delay, priority }: { name: ImageryName; className?: string; depth?: number; delay?: number; priority?: boolean }) {
  const { width, height } = imagery[name];
  return <FloatingArt src={`/imagery/${name}.webp`} width={width} height={height} className={className} depth={depth} delay={delay} priority={priority} />;
}

export default function Home() {
  return (
    <>
      <a className="team-skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Navbar
        brand={<Logo />} brandLabel="Meeting At 10 home"
        links={[{ label: "Work", href: "#work" }, { label: "Process", href: "#process" }, { label: "Team", href: "#team" }, { label: "Day", href: "#day" }]}
        actions={<Button href={sites.landing} size="sm" iconEnd="arrow-up-right">See ACCS</Button>}
        className="team-nav"
      />
      <main id="main" tabIndex={-1}>
        <div className="team-hero-ground">
          <Aurora /><GridBackdrop />
          <Hero
            plate={<Badge tone="info">Eleven people. One capstone.</Badge>}
            title={<WordReveal as="span" text="We meet at 10. Then we ship." />}
            lead="Meeting At 10 is the eleven-person capstone team building ACCS, a college workspace for the QCU College of Computer Studies."
            actions={<><Button href={sites.landing} iconEnd="arrow-up-right">See ACCS</Button><Button href={sites.design} variant="secondary">Read the design system</Button></>}
            note="Capstone prototype. Synthetic data. Built for the college, with no official QCU endorsement."
            art={
              <ParallaxScene className="team-constellation" aria-hidden="true">
                <div className="team-orbit" />
                <Art name="ribbon-torus" className="team-art team-art--torus" depth={26} delay={-3} priority />
                <Art name="fin-sculpture" className="team-art team-art--fin" depth={38} delay={-7} />
                <Art name="wire-cube" className="team-art team-art--cube" depth={-16} delay={-2} />
                <Art name="glass-sphere" className="team-art team-art--sphere" depth={20} delay={-5} />
                <div className="team-calendar"><Logo markOnly size="xl" /><span className="team-calendar__time">10:00 / ALWAYS</span></div>
              </ParallaxScene>
            }
          />
        </div>
        <Marquee label="Our technology stack" className="team-stack">
          {stack.map((item) => <span key={item}>{item}<span aria-hidden="true" className="team-stack__dot">·</span></span>)}
        </Marquee>
        <Section id="work" aria-labelledby="work-title" tone="sheet">
          <Reveal><SectionHeader id="work-title" title="One project. Every surface." description="ACCS brings the CCS community, consultations and concern reporting into one college workspace. These are the places we build it." /></Reveal>
          <Grid columns={3}>
            {work.map((item, i) => (
              <Reveal key={item.name} index={i}>
                <SpotlightCard href={item.href} tilt className="team-work-card">
                  <span className="team-code">{item.code}</span>
                  <div className="team-work-art" aria-hidden="true"><Art name={item.image} /></div>
                  <h3 className="ds-card__title">{item.name}</h3>
                  <p className="ds-card__body">{item.description}</p>
                  <span className="ds-card__action">{item.link}<Icon name="arrow-up-right" size={20} /></span>
                </SpotlightCard>
              </Reveal>
            ))}
          </Grid>
        </Section>
        <Section tight aria-label="Project specification counts">
          <dl className="team-counts">
            {counts.map((item) => <Reveal key={item.id}><div className="team-count"><dt>{item.label}</dt><dd data-count={item.id} data-value={item.value}><CountUp value={item.value} /></dd></div></Reveal>)}
          </dl>
          <p className="team-caption">Specification counts, not usage metrics. Sources: DOC003 module inventory, DOC004 user stories, DOC005 black-box test blueprint and the accs-dev CloudFormation stack.</p>
        </Section>
        <Section id="process" aria-labelledby="process-title" tone="sheet">
          <Reveal><SectionHeader id="process-title" title="Write it down. Make it work." description="A short loop. Then another one." /></Reveal>
          <ol className="team-process">
            {process.map((item, i) => <Reveal key={item.title} as="li" index={i}><span className="team-process__number" aria-hidden="true">0{i + 1}</span><h3 className="ds-card__title">{item.title}</h3><p>{item.description}</p></Reveal>)}
          </ol>
        </Section>
        <Section id="team" aria-labelledby="team-title">
          <Reveal><SectionHeader id="team-title" title="The people at the table." description="Eleven people across research, documentation, development and the work that keeps a project moving." /></Reveal>
          <div className="team-departments">
            {departments.map((department) => <div key={department.name} className="team-department"><h3>{department.name}</h3><div className="team-members">
              {department.members.map((member, i) => <Reveal key={member.name} index={i}><SpotlightCard as="article" className="team-member" data-member={member.name} data-role={member.role}><Avatar name={member.name} size={48} decorative /><div><h4>{member.name}</h4><p>{member.role}</p></div></SpotlightCard></Reveal>)}
            </div></div>)}
          </div>
        </Section>
        <Section id="day" aria-labelledby="day-title" tone="sheet">
          <div className="team-day">
            <Reveal><SectionHeader id="day-title" title="A working day at Meeting At 10." description="The now-line on our day sheet never moves. It is always 10:00." /><p className="team-caption">An illustrative day sheet, not a live schedule.</p><Logo size="lg" /></Reveal>
            <Reveal variant="fade"><Timetable label="A working day at Meeting At 10" days={TODAY} events={DAY} now={10} startHour={8} endHour={18} isolate={false} /></Reveal>
          </div>
        </Section>
      </main>
      <Footer brand={<Logo />} description="The team behind ACCS." columns={[{ title: "Our work", links: [{ label: "ACCS landing", href: sites.landing }, { label: "ACCS Home", href: `${sites.portal}/sign-in` }, { label: "Design system", href: sites.design }] }]} note="Meeting At 10 · QCU College of Computer Studies capstone, 2026." meta="Capstone prototype · Synthetic data" />
    </>
  );
}
