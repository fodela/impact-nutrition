"use client"
import Testimony from "../Testimony";

const SectionTestimonial = () => {
  return (
    <section className="max-w-screen-xl mpx-2 md:mx-auto">
      <h2 className="heading_secondary">What are we saying?</h2>
      <div className="block md:flex justify-between">
        <Testimony />
        <Testimony />
        <Testimony />
      </div>
    </section>
  );
};

export default SectionTestimonial;
