"use client";

import Hero from "@/components/Hero";
import { FaBullseye, FaEye, FaFlag } from "react-icons/fa";

const about = () => {
  return (
    <main>
      <Hero />
      <section
        className="my-24 mx-auto flex flex-col gap-12 max-w-screen-xl text-center text-xl
      "
      >
        <article className="flex max-w-screen-lg mx-auto flex-col items-center">
          <header className="text-center">
            <FaBullseye size={100} />
            <h6 className="text-4xl my-6 font-bold">Goal</h6>
          </header>
          <p className="text-xl max-w-screen-lg mx-auto md:text-2xl">
            To provide a comprehensive and holistic counseling on food and
            nutrition and their link with health in a sustainable manner to our
            societies. We seek to research into and promote awareness on the
            nutritional value of available local foods to our customers. To
            empower the people we serve to be the doctors of the food they eat
            and to use food as a weapon to boost immunity and to fight diseases.
          </p>
        </article>

        <article className="flex max-w-screen-lg mx-auto flex-col items-center">
          <header className="text-center">
            <FaEye size={100} className="mx-auto" />
            <h6 className="text-4xl my-6 font-bold">Vision</h6>
          </header>
          <p className="text-xl max-w-screen-lg mx-auto md:text-2xl">
            To provide a broad based nutrition and diets related services in an
            effective way to combat the emergence of non-communicable diseases
            in recent times. To be agent of nutrition promotion and advocacy for
            good eating practices.
          </p>
        </article>

        <article className="flex max-w-screen-lg mx-auto flex-col items-center">
          <header className="text-center">
            <FaFlag size={100} className="mx-auto" />
            <h6 className="text-4xl my-6 font-bold">Mission</h6>
          </header>
          <p className="text-xl max-w-screen-lg mx-auto md:text-2xl">
            To establish a suitable and an effective nutrition education and
            counseling system in Ghana and to be projected on the global map.
          </p>
          <p className="text-xl max-w-screen-lg mx-auto md:text-2xl">
            We anticipate that in the near future IMPACT NUTRITION CONSULT will
            be placed on top of a pedestal as one of the leading nutrition
            consulting mediums globally.
          </p>
        </article>
        <figure className="md:flex mx-auto bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
          <img
            className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=495&q=80"
            alt="executive director's image"
            width="484"
            height="612"
          />
          <div className="pt-6 mx-auto md:p-8 text-center md:text-left space-y-4">
            <h3 className="text-4xl font-bold">Executive Director&apos;s Message</h3>
            <blockquote>
              <p className="text-lg font-medium">
                “As professionals we believe in our capabilities and we cannot
                afford to disappoint our devotees. We have a strong conviction
                in the route we have taken and we are confident we will
                certainly get to our destination. We shall continue to work hard
                in order to attain success. As a young NGO and with the capacity
                of our team at the moment, we are confident there will be a lot
                of successes moving into the future as we are determined to
                shape the nutrition space of Ghana, Africa and beyond. Our
                upcoming Continuous Professional Development (CPD) programs,
                Community projects and our daily Nutrition tips on our social
                media handles among others will be mind-blowing so you should
                watch out for Impact Nutrition Consult.”
              </p>
            </blockquote>
            <figcaption className="font-medium">
              <div className="text-sky-500 dark:text-sky-400">Mr Executive</div>
              <div className="text-slate-700 dark:text-slate-500">
                Executive Director, INC
              </div>
            </figcaption>
          </div>
        </figure>
      </section>
    </main>
  );
};

export default about;
