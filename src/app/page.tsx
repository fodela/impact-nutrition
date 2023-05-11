'use client'
import SectionAnalytics from "../components/Home/SectionAnalytics";
import SectionServices from "../components/Home/SectionServices";
import SectionNewsLetter from "../components/Home/SectionNewsLetter";
import SectionTestimonial from "../components/Home/SectionTestimonial";
import Hero from "../components/Hero";



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
