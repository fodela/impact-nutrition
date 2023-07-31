import SectionServices from "../components/Home/SectionServices";
import SectionCTA from "@/components/Home/SectionCTA";
import SectionTestimonial from "../components/Home/SectionTestimonial";
import SectionAddress from "../components/Home/SectionAddress";
import SectionFAQ from "@/components/Home/SectionFAQ";

export default async function Home() {
  return (
    <main className="main">
      <SectionServices />
      <SectionCTA />
      <SectionAddress />
      <SectionTestimonial />
      <SectionFAQ />
    </main>
  );
}
