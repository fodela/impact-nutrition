"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaBullseye, FaEye, FaFlag } from "react-icons/fa";

const about = () => {
  return (
    <main>
      <section className="grid md:grid-cols-2 max-w-screen-xl p-10 gap-10 mx-auto">
        <article className="md:row-span-2 self-end text-colorPrimary text-8xl font-semibold revealFromLeft anim">
          <p>Our</p>
          <p>Mission</p>
          <p>& Vision</p>
        </article>
        <Image
          src="/assets/svg/about_us.svg"
          width={604}
          height={328}
          alt="an illustration of people collaborating"
        />
        <article className="flex flex-col gap-4 ">
          <h2 className="text-4xl text-colorPrimary font-bold revealFromRight ">
            About Us
          </h2>
          <p className="revealFromDown ani-delay_1s">
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
        </article>
      </section>
      <section className="grid md:grid-cols-3 max-w-screen-xl mx-auto gap-10 p-10">
        <article className="flex flex-col gap-4 justify-between p-6 border-2 border-colorPrimary rounded revealFromLeft ani-delay-500ms">
          <header className="flex gap-2 items-center">
            <Image
              src="/assets/svg/mission.svg"
              width={25}
              height={25}
              alt="an icon of mission"
            />{" "}
            <h3 className="text-4xl font-bold ">Mission</h3>
          </header>
          <p>
            To provide a broad based nutrition and diets related services in an
            effective way to combat the emergence of non-communicable diseases
            in recent times. To be agent of nutrition promotion and advocacy for
            good eating practices.
          </p>
        </article>
        <article className="flex flex-col gap-4 justify-between p-6 border-2 border-colorPrimary rounded revealFromLeft ani-delay_1s">
          <header className="flex gap-2 items-center">
            <Image
              src="/assets/svg/vision.svg"
              width={25}
              height={25}
              alt="an icon of an eye"
            />{" "}
            <h3 className="text-4xl font-bold ">Vision</h3>
          </header>
          <p>
            To establish a suitable and an effective nutrition education and
            counseling system in Ghana and to be projected on the global map.
          </p>
        </article>
        <article className="flex flex-col gap-4 justify-between p-6 border-2 border-colorPrimary rounded revealFromLeft ani-delay_1500ms">
          <header className="flex gap-2 items-center">
            <Image
              src="/assets/svg/goal.svg"
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
        </article>

        <dialog id="mine">
          <p>I am in a dialog</p>
        </dialog>
        {/* <button onClick={() => mine.showModal()}></button> */}
      </section>
    </main>
  );
};

export default about;
