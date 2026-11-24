import { sites } from "@/lib/sites";

const agenda = [
  { time: "10:00", label: "Standup" },
  { time: "10:30", label: "Build" },
  { time: "13:30", label: "Review" },
  { time: "16:00", label: "Ship" },
];

export function Hero() {
  return (
    <section className="mt-hero" aria-labelledby="hero-title">
      <div className="mt-hero__copy">
        <p className="mt-hero__eyebrow"><span aria-hidden="true" /> MEETING AT 10 · QCU CCS</p>
        <h1 id="hero-title" className="mt-hero__title">We meet at <span>10.</span><br />Then we ship<span>.</span></h1>
        <p className="mt-hero__lead">Eleven QCU students build and run ACCS, the workspace for the College of Computer Studies.</p>
        <div className="mt-hero__actions">
          <a className="mt-hero__primary" href={sites.landing}>Visit ACCS <span aria-hidden="true">↗</span></a>
          <a className="mt-hero__secondary" href="#architecture">See the architecture <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="mt-board" aria-label="A Meeting At 10 day: standup at 10:00, then build, review and ship.">
        <div className="mt-board__top"><span>MEETING AT 10</span><span>THE DAY SHEET</span></div>
        <div className="mt-board__meeting">
          <div className="mt-clock" aria-hidden="true">
            <svg viewBox="0 0 240 240" className="mt-clock__face">
              <circle cx="120" cy="120" r="109" className="mt-clock__ring" />
              {Array.from({ length: 12 }, (_, i) => <line key={i} x1="120" y1="22" x2="120" y2={i % 3 === 0 ? "36" : "30"} transform={`rotate(${i * 30} 120 120)`} className="mt-clock__tick" />)}
              <line x1="120" y1="120" x2="120" y2="67" className="mt-clock__hour" />
              <line x1="120" y1="120" x2="120" y2="42" className="mt-clock__minute" />
              <circle cx="120" cy="120" r="8" className="mt-clock__pin" />
            </svg>
          </div>
          <div className="mt-board__time"><span>STANDING MEETING</span><strong>10:00</strong><span>EVERY DAY WE BUILD</span></div>
        </div>
        <div className="mt-board__agenda">
          <p><span>THE WORKING DAY</span><span>QCU · CCS</span></p>
          <ol>{agenda.map((item) => <li key={item.time}><time>{item.time}</time><strong>{item.label}</strong><span aria-hidden="true">↗</span></li>)}</ol>
        </div>
      </div>
    </section>
  );
}
