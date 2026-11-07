import { Slot } from '../_components/slot';

const flow = [
  { name: 'Visitors', detail: 'Students, professors, staff' },
  { name: 'CloudFront', detail: 'One distribution per site' },
  { name: 'Amazon S3', detail: 'Next.js landing, Vite SPA portal' },
  { name: 'Express API', detail: 'AWS Lambda' },
  { name: 'Data', detail: 'Reachable only through the API' },
];

export function Architecture() {
  return <Slot id="architecture" time="13:30" title="Review" note="Walk through what changed" from="var(--t1230)" to="var(--t1500)" count={6} label="architecture-title" className="arch">
    <h2 id="architecture-title">How a request reaches the data</h2>
    <ol className="path" aria-label="Request path">{flow.map(node => <li key={node.name}><strong>{node.name}</strong><span>{node.detail}</span></li>)}</ol>
    <p className="arch__ship">GitHub Actions builds and tests each site, then uploads it to S3. The API deploys to Lambda.</p>
  </Slot>;
}
