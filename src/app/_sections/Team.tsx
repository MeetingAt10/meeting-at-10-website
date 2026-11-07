import { groups, memberId } from '../../data/team';
import { Slot } from '../_components/slot';

export function Team() {
  return <Slot id="team" time="10:15" title="Roll call" note="Eleven of eleven" from="var(--t1000)" to="var(--t1030)" count={2} label="team-title" className="team">
    <h2 id="team-title">Who does what</h2>
    <div className="roster">
      {groups.map(group => <div key={group.name} className="roster__group" data-pairs={!!group.pairs}>
        <div className="roster__head"><h3>{group.name}</h3>{group.note && <p>{group.note}</p>}</div>
        <ul>{group.members.map(member => <li key={member.name}>
          <article id={memberId(member.name)} data-member={member.name} data-role={member.role}>
            <h4>{member.name}</h4>
            <p className="roster__role">{member.role}</p>
            {member.focus && <p>{member.focus}</p>}
          </article>
        </li>)}</ul>
      </div>)}
    </div>
  </Slot>;
}
