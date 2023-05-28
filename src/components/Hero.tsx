import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="background-image md:py-20">
      <div className="max-w-screen-xl p-4 md:p-2 section_grid md:mx-auto">
        <div className="bg-white/80 text-black p-4">
          <h1 className="heading_primary text-2xl md:text-4xl font-bold uppercase mb-6">
            Impact nutrition consult leaders in nutrition for health
          </h1>
          <p className="md:text-2xl text-xl mb-4 ">
            We are committed to being leaders in the field of nutrition for
            optimal health. Our team of experienced and knowledgeable
            nutritionists are here to provide you with personalized guidance and
            support to help you achieve your health goals
          </p>
          <button className="capitalize bg-colorPrimary rounded py-2 px-4 text-white hover:bg-green-600">
            Get Started
          </button>
          <Link href="#"> Get Started</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
