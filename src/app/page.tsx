'use client'
import SectionAnalytics from "../components/Home/SectionAnalytics";
import SectionServices from "../components/Home/SectionServices";
import SectionNewsLetter from "../components/Home/SectionNewsLetter";
import SectionTestimonial from "../components/Home/SectionTestimonial";



export default async function Home() {
  return (
    <main className="main">
      <SectionAnalytics />
      <SectionServices />
      <SectionNewsLetter />
      <SectionTestimonial />
    </main>
  );
}
