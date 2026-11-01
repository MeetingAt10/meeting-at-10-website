import { Reveal } from "@meetingat10/design-system/react";

const steps = [
  { title: "Specify", text: "The DOC003 module inventory and 58 user stories fix what belongs in scope." },
  { title: "Design", text: "Office Hours tokens and components give every surface the same look." },
  { title: "Build", text: "Portal, API, landing and this site stay small and get reviewed in pairs." },
  { title: "Verify", text: "183 black-box test cases and browser flows run before anything ships." },
  { title: "Deploy", text: "GitHub Actions publish the sites to S3 and CloudFront and the API to Lambda." },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="mt-section mt-timeline" aria-labelledby="timeline-title">
      <Reveal><h2 id="timeline-title" className="mt-h2">From spec to release</h2></Reveal>
      <ol className="mt-steps">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} index={i} className="mt-step">
            <h3 className="mt-h3">{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
