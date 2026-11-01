import { AboutSection } from "./_sections/AboutSection";
import { ArchitectureSection } from "./_sections/ArchitectureSection";
import { ContactSection } from "./_sections/ContactSection";
import { Footer } from "./_sections/Footer";
import { Hero } from "./_sections/Hero";
import { Navbar } from "./_sections/Navbar";
import { ProjectSection } from "./_sections/ProjectSection";
import { StatsSection } from "./_sections/StatsSection";
import { TeamSection } from "./_sections/TeamSection";
import { TimelineSection } from "./_sections/TimelineSection";
import { ScrollProgress } from "@meetingat10/design-system/react";

export default function Home() {
  return (
    <>
      <a className="team-skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <ProjectSection />
        <ArchitectureSection />
        <TimelineSection />
        <TeamSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
