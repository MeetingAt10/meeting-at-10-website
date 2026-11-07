import { sites } from '@/lib/sites';
import { Slot } from '../_components/slot';

const stats = [
  { id: 'cases', value: 183, label: 'black-box test cases' },
  { id: 'stories', value: 58, label: 'user stories' },
  { id: 'members', value: 11, label: 'team members' },
  { id: 'subdomains', value: 7, label: 'application workspaces' },
  { id: 'sites', value: Object.keys(sites).length, label: 'sites on AWS' },
];

export function Stats() {
  return <Slot id="stats" time="15:30" title="Write-up" note="Count what shipped" from="var(--t1530)" to="var(--t1600)" count={2} label="stats-title" className="stats">
    <h2 id="stats-title">The record in numbers</h2>
    <dl>{stats.map(stat => <div key={stat.id} data-stat={stat.id}><dd data-count={stat.id} data-value={stat.value}>{stat.value}</dd><dt>{stat.label}</dt></div>)}</dl>
  </Slot>;
}
