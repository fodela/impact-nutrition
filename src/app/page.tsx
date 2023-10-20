import SectionServices from "../components/Home/SectionServices";
import SectionCTA from "@/components/Home/SectionCTA";
import SectionTestimonial from "../components/Home/SectionTestimonial";
import SectionAddress from "../components/Home/SectionAddress";
import SectionFAQ from "@/components/Home/SectionFAQ";
import SectionTeam from "@/components/Home/SectionTeam";
import Hero from "@/components/Hero";
import { HeroDetail } from "../../types";

const homeHeroDetail: HeroDetail = {
  heading: "",
  content: "",
  imageLink: "",
  showMainButton: true,
  showSecondaryButton: true,
  mainButtonName: "",
  secondaryButtonName: "",
  mainLink: "",
  secondaryLink: "",
};

export default async function Home() {
  return (
    <main className="main">
      <Hero heroDetail={homeHeroDetail} />
      <SectionServices />
      <SectionCTA />
      <SectionAddress />
      <SectionTeam />
      <SectionTestimonial />
      <SectionFAQ />
    </main>
  );
}
