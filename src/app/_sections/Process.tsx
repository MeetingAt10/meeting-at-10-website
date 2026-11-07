import { Slot } from '../_components/slot';

const steps = [
  { title: 'Specify', text: '58 user stories fix what belongs in scope.' },
  { title: 'Design', text: 'Office Hours tokens and components keep the workspace consistent.' },
  { title: 'Build', text: 'Portal, API, landing and this site stay small and get reviewed in pairs.' },
  { title: 'Verify', text: '183 black-box test cases and browser flows run before anything ships.' },
  { title: 'Deploy', text: 'GitHub Actions publish the sites to S3 and CloudFront and the API to Lambda.' },
];

export function Process() {
  return <Slot id="timeline" time="15:00" title="Check" note="Before anything leaves" from="var(--t1500)" to="var(--t1530)" count={2} label="timeline-title" className="process">
    <h2 id="timeline-title">From spec to release</h2>
    <ol>{steps.map((step, index) => <li key={step.title} style={{ '--i': index } as React.CSSProperties}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
  </Slot>;
}
