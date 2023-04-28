import Hero from "@/components/Hero";

import SectionAnalytics from "@/components/Home/SectionAnalytics";
import SectionServices from "@/components/Home/SectionServices";
import SectionNewsLetter from "@/components/Home/SectionNewsLetter";
import SectionTestimonial from "@/components/Home/SectionTestimonial";

// const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  return (
    <main className="main">
      <Hero />
      <SectionAnalytics />
      <SectionServices />
      <SectionNewsLetter />
      <SectionTestimonial />
    </main>
  );
}
