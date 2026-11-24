import Image from "next/image";
import { groups } from "@/data/team";
import { sites } from "@/lib/sites";

const members = groups.flatMap((group) => group.members);

export function Hero() {
  return (
    <section className="mt-hero" aria-labelledby="hero-title">
      <div className="mt-hero__inner">
        <div className="mt-hero__copy">
          <p className="mt-hero__eyebrow"><span aria-hidden="true" /> Meeting At 10 · QCU CCS</p>
          <h1 id="hero-title" className="mt-hero__title">We meet at 10.<em>Then we ship.</em></h1>
          <p className="mt-hero__lead">Eleven QCU students build and run ACCS, the workspace for the College of Computer Studies.</p>
          <div className="mt-hero__actions">
            <a className="mt-hero__primary" href={sites.landing}>Visit ACCS <span aria-hidden="true">↗</span></a>
            <a className="mt-hero__secondary" href="#architecture">See the architecture <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="mt-orbit" aria-hidden="true">
          <span className="mt-orbit__halo" />
          <span className="mt-orbit__ring" />
          <div className="mt-orbit__center"><span>MEETING AT</span><strong>10:00</strong><small>ELEVEN STUDENTS · ONE TEAM</small></div>
          {members.map((member, index) => {
            const angle = -Math.PI / 2 + index * (2 * Math.PI / members.length);
            const style = { "--x": `${50 + 41 * Math.cos(angle)}%`, "--y": `${50 + 41 * Math.sin(angle)}%`, "--i": index } as React.CSSProperties;
            return <span key={member.name} className="mt-orbit__portrait" data-portrait={member.portrait} style={style}>
              <Image src={`/portraits/${member.portrait}.webp`} alt="" width={member.size ?? 480} height={member.size ?? 480} loading="eager" />
            </span>;
          })}
        </div>
      </div>
    </section>
  );
}
