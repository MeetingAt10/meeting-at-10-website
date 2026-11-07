import { Slot } from '../_components/slot';

export function Lunch() {
  return <Slot id="lunch" time="12:30" title="Lunch" note="Away" from="var(--sun)" to="var(--sun)" count={1} label="lunch-title" className="lunch">
    <h2 id="lunch-title">Lunch.</h2>
    <p>Away until 13:30.</p>
  </Slot>;
}
