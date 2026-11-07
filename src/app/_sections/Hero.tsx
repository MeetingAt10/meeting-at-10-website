import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { sites } from '@/lib/sites';
import { Clock } from '../_components/clock';

export function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero__copy">
      <h1 id="hero-title"><span>We meet at 10.</span> <span>Then we ship.</span></h1>
      <p>Eleven QCU students build and run ACCS, the workspace for the College of Computer Studies.</p>
      <div className="hero__actions">
        <a className="pill pill--lg" href={sites.landing}>Visit ACCS<ArrowUpRight size={20} weight="bold" aria-hidden="true" /></a>
        <a className="pill pill--lg pill--line" href="#architecture">See the architecture</a>
      </div>
    </div>
    <div className="hero__clock"><Clock /></div>
  </section>;
}
