'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Hero = () => {
  const [hero, setHero] = useState({
    header: ' EMPOWERING HEALTH AND NUTRITION EXCELLENCE',
    content: ' Promoting optimal health and nutrition for adequate growth and development',
    link: "/assets/Images/hero.jpg"
  })
  return (<section className="section_grid">
    <div className="max-w-2xl mx-auto p-10 mt-16 md:mt-10 text-center md:text-left">
      <h1 className="heading_primary text-4xl   lg:text-5xl font-bold uppercase mb-4">
        {hero.header}
      </h1>
      {/* <p className="md:text-xl mb-10 ">
          Your dedicated partners in reaching your health goals, one step at a
          time.
        </p> */}
      <p className="md:text-xl mb-10 ">
        {hero.content}
      </p>
      <div className="flex gap-4 text-sm md:text-md lg:text-lg justify-center md:justify-start">
        <Link
          href="/signin"
          className="capitalize bg-colorPrimary rounded py-2 px-4 text-white  hover:bg-green-600 transition-all duration-300"
        >
          Get Started
        </Link>
        <Link
          href="/signin"
          className="capitalize border  border-colorPrimary rounded py-2 px-4 text-colorPrimary hover:bg-green-600 hover:text-white transition-all duration-300"
        >
          Explore our services{" "}
        </Link>
      </div>
    </div>
    <Image
      src={hero.link}
      alt="a grid of four amazing Ghanaian foods"
      width={836.5}
      height={680}
    />
  </section>
  );
};

export default Hero;
