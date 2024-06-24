"use client";
import Image from "next/image";
import Link from "next/link";
import { HeroDetail } from "../../types";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = ({ heroDetail }: { heroDetail: HeroDetail }) => {
  return (
    <section className="section_grid mt-20">
      <div className="max-w-2xl mx-auto p-10 mt-16 md:mt-10 text-center md:text-left">
        <h1 className="heading_primary text-4xl   lg:text-5xl font-bold uppercase mb-4">
          {heroDetail.heading
            ? heroDetail.heading
            : "Empowering health and nutrition excellence"}
        </h1>
        <p className="md:text-xl mb-10 ">
          {heroDetail.content
            ? heroDetail.content
            : "Your dedicated partners in reaching your health goals, one step at a time."}
        </p>
        <div className="flex gap-4 text-sm md:text-md lg:text-lg justify-center md:justify-start">
          {heroDetail.showMainButton && (
            <Link
              href={heroDetail.mainLink ? heroDetail.mainLink : "/auth/signin"}
              className="capitalize bg-colorPrimary rounded py-2 px-4 text-white  hover:bg-green-600 transition-all duration-300"
            >
              <Button variant="primary">Get Started</Button>
            </Link>
          )}
          {heroDetail.showSecondaryButton && (
            <Link
              href={
                heroDetail.secondaryLink
                  ? heroDetail.secondaryLink
                  : "/services"
              }
              className="capitalize"
            >
              <Button
                variant="expandIcon"
                Icon={ArrowRight}
                iconPlacement="right"
              >
                Explore our services
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Image
        src={
          heroDetail.imageLink
            ? heroDetail.imageLink
            : "/assets/Images/Professional2.jpg"
        }
        alt="a grid of four amazing Ghanaian foods"
        width={836.5}
        height={680}
      />
    </section>
  );
};

export default Hero;
