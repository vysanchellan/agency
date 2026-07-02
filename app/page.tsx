import Capabilities from "@/components/sections/Capabilities";
import ContactCTA from "@/components/sections/ContactCTA";
import Hero from "@/components/sections/Hero";
import SiteHeader from "@/components/sections/SiteHeader";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import Testimonial from "@/components/sections/Testimonial";
import WorkShowcase from "@/components/sections/WorkShowcase";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <WorkShowcase />
      <Capabilities />
      <Process />
      <Stats />
      <Testimonial />
      <ContactCTA />
    </main>
  );
}
