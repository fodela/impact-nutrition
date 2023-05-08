

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SectionAnalytics from "../components/Home/SectionAnalytics";
import SectionServices from "../components/Home/SectionServices";
import SectionNewsLetter from "../components/Home/SectionNewsLetter";
import SectionTestimonial from "../components/Home/SectionTestimonial";
import Hero from "../components/Hero";

// const inter = Inter({ subsets: ["latin"] });


export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main className="main">
      <pre>{JSON.stringify(session)} </pre>
      <Hero />
      <SectionAnalytics />
      <SectionServices />
      <SectionNewsLetter />
      <SectionTestimonial />

      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
