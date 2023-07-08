"use client";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import LoginForm from "../signin/page";

const contact_us = () => {
  return (
    <div>
      <div className="max-w-screen-lg p-4 md:p-2  md:mx-auto">
        <h1 className="text-4xl font-bold text-center mt-20">
          Get in touch with Us
        </h1>
<<<<<<< HEAD
        <p className="mt-10 text-xl">
          Our goal is to provide a comprehensive and holistic counseling on food
          and nutrition and their link with health in a sustainable manner to
          our societies. We seek to research into and promote awareness on the
          nutritional value of available local foods to our customers. To
          empower the people we serve to be the doctors of the food they eat and
          to use food as a weapon to boost immunity and to fight diseases.
=======
        <p className="mt-10 mx-2 text-xl md:text-4xl">
          Our goal is to provide a comprehensive and holistic counseling on food and nutrition and their link with health in a sustainable manner to our societies. We seek to research into and promote awareness on the nutritional value of available local foods to our customers. To empower the people we serve to be the doctors of the food they eat and to use food as a weapon to boost immunity and to fight diseases.
>>>>>>> 1ed8918530cf62e89000e48e6809562a824deaf4
        </p>
        <div className="">
          <h4 className="text-2xl text-center my-5 font-bold">Follow us</h4>
          <div className="flex gap-2 justify-center">
            <a href="https://instagram.com/impact_nutrition_consult">
              <BsInstagram color="green" size={60} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100091143753921&mibextid=LQQJ4d">
              <FaFacebook color="green" size={60} />
            </a>
            <a href="https://twitter.com/incghana?s=21&t=-GfSfOpaIp5lObBXXSu1JQ">
              <BsTwitter color="green" size={60} />
            </a>
          </div>
        </div>
        <div className="p-4 min-w-96 ">
          <h3 className="font-bold text-xl">Reach out to us now</h3>
          <form className="flex flex-col bg-transparent gap-2 ">
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="p-2 border-2 border-black/10 dark:border-white/10 rounded bg-inherit"
                type="text"
                placeholder="First name"
              />
              <input
                className="p-2 border-2 border-black/10 dark:border-white/10 rounded bg-inherit"
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              className="p-2 border-2 border-black/10 dark:border-white/10 rounded bg-inherit"
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
            />
            <textarea
              className="p-2 border-2 border-black/10 dark:border-white/10 rounded bg-inherit"
              name=""
              id=""
              rows={4}
              placeholder="Query"
            />
            <button className="bg-colorPrimary w-fit py-2 px-4 text-white/80 font-bold rounded">
              Send now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default contact_us;
