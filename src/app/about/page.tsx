"use client";

import { moveVariant, offscreenVariants } from "@/lib/animationVariants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

const about = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const revealOptions = {
      threshold: 0.5, // Percentage of the element visible in the viewport
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    elements.forEach((element) => {
      revealObserver.observe(element);
    });
  }, []);

  return (
    <main>
      <section className="grid md:grid-cols-2 gap-10 max-w-screen-xl p-10 mx-auto">
        <motion.article
          className="md:row-span-2 self-end text-colorPrimary text-6xl sm:text-8xl font-semibold reveal "
          variants={offscreenVariants}
          initial="left"
          animate="visible"
          transition={{ ease: "easeOut" }}
        >
          <p>Our</p>
          <p>Mission</p>
          <p>& Vision</p>
        </motion.article>
        <Image
          src="https://impactnutritionconsult.com/assets/svg/about_us.svg"
          width={604}
          height={328}
          alt="an illustration of people collaborating"
        />
        <motion.article
          className="flex flex-col gap-4"
          variants={offscreenVariants}
          initial="right"
          animate="visible"
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          <h2 className="text-4xl text-colorPrimary font-bold reveal revealFromRight">
            About Us
          </h2>
          <p className="reveal revealFromDown ">
            Welcome to Impact Nutrition Consult, where we are committed to
            combating the rise of non-communicable diseases through our
            effective nutrition and diet-related services. As passionate agents
            of nutrition promotion and advocacy, we empower individuals with the
            knowledge and support they need to adopt and maintain good eating
            practices. With a clear vision to establish a robust nutrition
            education and counseling system in Ghana and create a global impact,
            our goal is to provide comprehensive services that effectively
            address the pressing challenges of our time.
          </p>
        </motion.article>
      </section>
      <section className="grid md:grid-cols-3 max-w-screen-xl mx-auto gap-10 p-10">
        <motion.article
          className="about_card"
          variants={moveVariant}
          initial="leftBottom"
          animate="visible"
          transition={{ duration: 1, delay: 0.2, ease: "linear" }}
        >
          <header className="flex gap-2 items-center">
            <Image
              src="https://impactnutritionconsult.com/assets/svg/mission.svg"
              width={25}
              height={25}
              alt="an icon of mission"
              className="bg-white rounded-full"
            />{" "}
            <h3 className="text-4xl font-bold">Mission</h3>
          </header>
          <p>
            To provide a broad-based nutrition and diet-related services in an
            effective way to combat the emergence of non-communicable diseases
            in recent times. To be an agent of nutrition promotion
          </p>
        </motion.article>
        <motion.article
          className="about_card"
          variants={moveVariant}
          initial="leftBottom"
          animate="visible"
          transition={{ duration: 1, delay: 0.4, ease: "linear" }}
        >
          <header className="flex gap-2 items-center">
            <Image
              src="https://impactnutritionconsult.com/assets/svg/vision.svg"
              width={25}
              height={25}
              alt="an icon of an eye"
              className="bg-stone-300 rounded-full"
            />{" "}
            <h3 className="text-4xl font-bold ">Vision</h3>
          </header>
          <p>
            To establish a suitable and an effective nutrition education and
            counseling system in Ghana and to be projected on the global map.
          </p>
        </motion.article>
        <motion.article
          className="about_card"
          variants={moveVariant}
          initial="leftBottom"
          animate="visible"
          transition={{ duration: 1, delay: 0.6, ease: "linear" }}
        >
          <header className="flex gap-2 items-center ">
            <Image
              className="bg-white rounded-full"
              src="https://impactnutritionconsult.com/assets/svg/goal.svg"
              width={25}
              height={25}
              alt="an icon of a target"
            />{" "}
            <h3 className="text-4xl font-bold ">Goal</h3>
          </header>
          <p>
            To provide a broad based nutrition and diets related services in an
            effective way to combat the emergence of non-communicable diseases
            in recent times. To be agent of nutrition promotion and advocacy for
            good eating practices.
          </p>
        </motion.article>
      </section>
    </main>
  );
};

export default about;
