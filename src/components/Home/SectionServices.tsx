"use client"
import Image from "next/image";

const SectionServices = () => {
  return (
    <section className="section_grid max-w-screen-xl md:my-28 px-4 md:mx-auto">
      <div>
        <h3 className="heading_tertiary pt-10">
          The right place to develop your passion in nutritional well-being
        </h3>
        <p className="text-xl">
          We organize development program for Nutritionist of divers background
          and we believe that in unity there is strength.
        </p>
        <p className="text-xl mb-4">
          We organize development program for Nutritionist of divers background
          and we believe that in unity there is strength.
        </p>
      </div>
      <Image src="assets/services_image.svg" width={600} height={400} alt="services image" />
    </section>
  );
};

export default SectionServices;
