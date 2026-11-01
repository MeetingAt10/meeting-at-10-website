import { Reveal } from "@meetingat10/design-system/react";
import { ModuleExplorer } from "./ModuleExplorer";

const flow = [
  { name: "Visitors", detail: "Students, professors, staff" },
  { name: "CloudFront", detail: "One distribution per site" },
  { name: "Amazon S3", detail: "Next.js landing, Vite SPA portal" },
  { name: "Express API", detail: "AWS Lambda" },
  { name: "Data", detail: "Reachable only through the API" },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="mt-section mt-arch" aria-labelledby="architecture-title">
      <div className="mt-arch__head">
        <Reveal><h2 id="architecture-title" className="mt-h2">58 modules, seven subdomains, ten roles</h2></Reveal>
        <Reveal index={1}><p className="mt-body">The DOC003 inventory lists every module. Filter by subdomain or role to see what each role gets.</p></Reveal>
      </div>
      <Reveal variant="fade"><ModuleExplorer /></Reveal>
      <Reveal className="mt-diagram">
        <h3 className="mt-h3">How a request reaches the data</h3>
        <ol className="mt-flow" aria-label="Request path">
          {flow.map((n) => <li key={n.name} className="mt-flow__node"><strong>{n.name}</strong><span>{n.detail}</span></li>)}
        </ol>
        <p className="mt-flow__ship">GitHub Actions builds and tests each site, then uploads it to S3. The API deploys to Lambda.</p>
      </Reveal>
    </section>
  );
}
