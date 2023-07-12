import dynamic from "next/dynamic";
import React from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import {
  FaFacebook,
  FaTelegramPlane,
  FaInstagram,
  FaLinkedin,
  FaSnapchatGhost,
} from "react-icons/fa";


const contact_us = () => {
  return (
    <div>
      <div className="max-w-screen-xl p-4 md:p-2  md:mx-auto">
        <h1 className="text-3xl font-bold text-center mt-20">
          Get in touch with Us
        </h1>
        <p className="mt-10 mx-2 text-xl md:text-4xl">
          Our goal is to provide a comprehensive and holistic counseling on food and nutrition and their link with health in a sustainable manner to our societies. We seek to research into and promote awareness on the nutritional value of available local foods to our customers. To empower the people we serve to be the doctors of the food they eat and to use food as a weapon to boost immunity and to fight diseases.
        </p>
        <div className="">
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
        </div>
      </div>
    </div>
  );
};

export default contact_us;