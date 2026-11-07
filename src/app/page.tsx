import { About } from './_sections/About';
import { Architecture } from './_sections/Architecture';
import { Contact } from './_sections/Contact';
import { Footer } from './_sections/Footer';
import { Hero } from './_sections/Hero';
import { Lunch } from './_sections/Lunch';
import { Nav } from './_sections/Nav';
import { Process } from './_sections/Process';
import { Projects } from './_sections/Projects';
import { Stats } from './_sections/Stats';
import { Team } from './_sections/Team';

export default function Home() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <Nav />
    <main id="main" tabIndex={-1}>
      <Hero /><About /><Team /><Projects /><Lunch /><Architecture /><Process /><Stats /><Contact />
    </main>
    <Footer />
  </>;
}
