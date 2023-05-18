import React from "react";
import {
  FaFacebook,
  FaTelegramPlane,
  FaInstagram,
  FaLinkedin,
  FaSnapchatGhost,
} from "react-icons/fa";
const contact_us = () => {
  return (
    <div className="max-w-screen-xl p-4 md:p-2  md:mx-auto">
      <h1 className="text-3xl font-bold text-center mt-20">
        Get in touch with Us
      </h1>
      <p className="mt-10 text-xl">
        Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        voluptatibus neque possimus tempore sed reiciendis minima itaque
        suscipit distinctio quidem molestias et in consequatur ex iusto
        doloribus illum illo exercitationem deserunt sint harum vitae,
        voluptatum autem. Quod corrupti deserunt excepturi. ipsum dolor sit amet
        consectetur adipisicing elit. Sint incidunt reprehenderit iste dolorum
        optio inventore aliquam deserunt quae doloribus minima.
      </p>
      <div className="">
        <div className="">
          <h4 className="text-2xl text-center my-5 font-bold">Follow us</h4>
          <div className="flex gap-2 justify-center">
            <a href="">
              <FaTelegramPlane color="green" size={60} />
            </a>
            <a href="">
              <FaFacebook color="green" size={60} />
            </a>
            <a href="">
              <FaSnapchatGhost color="green" size={60} />
            </a>
            <a href="">
              <FaLinkedin color="green" size={60} />
            </a>
            <a href="">
              <FaInstagram color="green" size={60} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact_us;