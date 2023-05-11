"use client"
import Image from "next/image";

const SectionNewsLetter = () => {
  return (
    <section>
      <h2 className="heading_secondary">Subscribe for our newsletters</h2>
      <div className="section_grid">
        <Image src="assets/newsletter_image.svg" width={600} height={400} alt="newsletter image" />
        <p className="text-2xl">
          We organize multiple CPD programs every year to keep our professionals
          up to and well informed We organize multiple CPD programs every year
          to keep our professionals up to and well informe
        </p>
      </div>
    </section>
  );
};

export default SectionNewsLetter;
