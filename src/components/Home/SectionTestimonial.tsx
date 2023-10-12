"use client";
import Image from "next/image";
import { useState } from "react";
import { BsQuote } from "react-icons/bs";

const SectionTestimonial = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <section className="flex flex-col w-full items-center max-w-screen-xl mx-auto px-8">
      <h2 className="text-4xl sm:text-6xl font-medium text-center">
        Meet Our <strong className="text-colorPrimary">CEO</strong>
      </h2>
      <div className="grid md:grid-cols-3 pt-8 gap-8">
        <Image
          className={`w-400 h-400 mx-auto self-end ${
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          }`}
          src="/assets/Images/Saadong_ceo 1.png"
          // src="https://impactnutritionconsult.com/assets/Saadong.jpg"
          alt="A picture of Mr Saadong Emmanuel in a black suit"
          width={400}
          height={358}
          onLoadingComplete={() => setIsLoading(false)}
        />
        <div className="col-span-2 favicon_bg">
          <p className="text-colorPrimary text-2xl font-medium ">
            Saadong Emmanuel
          </p>
          <div className="my-8 ">
            <BsQuote className="absolute right-0 -top-8 text-6xl text-black/50 dark:text-white/50 rotate-180" />
            <p className="text-xl pr-8">
              “As professionals we believe in our capabilities and we cannot
              afford to disappoint our devotees. We have a strong conviction in
              the route we have taken and we are confident we will certainly get
              to our destination. We shall continue to work hard in order to
              attain success. As a young NGO and with the capacity of our team
              at the moment, we are confident there will be a lot of successes
              moving into the future as we are determined to shape the nutrition
              space of Ghana, Africa and beyond. Our upcoming Continuous
              Professional Development (CPD) programs, Community projects and
              our daily Nutrition tips on our social media handles among others
              will be mind-blowing so you should watch out for Impact Nutrition
              Consult.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonial;
