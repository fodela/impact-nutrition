"use client";
import AnimateRevealUp from "@/app/utils/AnimateRevealUp";
import ServiceCard from "../ServiceCard";
const services = [
  {
    imageLink: "/assets/svg/education.svg",
    title: "Health and Nutrition Education",
    content:
      "We offer comprehensive health and nutrition education services designed to empower individuals in making informed decisions about their well-being.",
  },
  {
    imageLink: "/assets/svg/cpd.svg",
    title: "Continuous Professional Development",
    content:
      "We offer a diverse range of Continuous Professional Development (CPD) programs tailored to meet the needs of allied health professionals.",
  },
  {
    imageLink: "/public/assets/svg/research.svg",
    title: "Research and Data Analysis Services",
    content:
      "We offer a comprehensive suite of research and data analysis services to support individuals and organizations in their pursuit of knowledge and academic excellence. ",
  },
  {
    imageLink: "/public/assets/svg/guidance.svg",
    title: "Comprehensive Meal Planning and Guidance",
    content:
      "We offer personalized advice and create customized dietary plans to empower clients with tailored solutions for their specific needs and goals.",
  },
];

const SectionServices = () => {
  return (
    <section className="bg-[#EDF6EF] dark:bg-black py-24 pt-16 ">
      <AnimateRevealUp>
        <div className="max-w-screen-xl px-2 md:mx-auto my-2 ">
          <h2 className="text-xl font-bold text-center mt-10 text-colorPrimary">
            Our Services
          </h2>
          <h3 className="text-3xl font-bold text-center">What we offer</h3>
          <p className="text-center mx-auto my-4 max-w-screen-sm rounded-lg">
            We are dedicated to offering comprehensive and holistic counseling
            on food and nutrition, emphasizing their profound impact on health
            in a sustainable manner for our communities.
          </p>
        </div>
      </AnimateRevealUp>
      <div className=" pt-8 py-5  px-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-screen-xl mx-auto">
        {services.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div>
    </section>
  );
};

export default SectionServices;
