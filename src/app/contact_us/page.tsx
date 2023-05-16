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
    <div>
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
      <div className="contact">
        <div className="contact-container">
          <div className="contact-wrapper">
            <a href="">
              <FaTelegramPlane />
            </a>
            <a href="">
              <FaFacebook />
            </a>
            <a href="">
              <FaSnapchatGhost />
            </a>
            <a href="">
              <FaLinkedin />
            </a>
            <a href="">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contact_us;