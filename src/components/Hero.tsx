import Image from "next/image";

const Hero = () => {
  return (
    <section className="section_grid">
      <div>
        <h1 className="heading_primary text-4xl font-bold uppercase mb-6">
          Impact nutrition consult leaders in nutrition for health
        </h1>
        <p className="text-3xl mb-4 ">
          We are committed to being leaders in the field of nutrition for
          optimal health. Our team of experienced and knowledgeable
          nutritionists are here to provide you with personalized guidance and
          support to help you achieve your health goals
        </p>
        <button className="capitalize bg-colorPrimary rounded py-2 px-4 text-white">
          View more
        </button>
      </div>
      <Image src="./assets/hero_image.svg" width={1800} height={600} alt="hero image" />
    </section>
  );
};

export default Hero;