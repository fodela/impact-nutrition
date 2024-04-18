"use client";

import Image from "next/image";
import React from "react";

const services = () => {
  return (
    <main>
      <div className="max-w-screen-xl p-4 md:p-2  md:mx-auto">
        <div className="block md:grid grid-cols-2  gap-8  sm:grid-cols-1 text-2xl p-2  md:grid-cols-2">
          <Image
            src="https://impactnutritionconsult.com/assets/Images/Rectangle 30.png"
            width={600}
            height={100}
            alt="img hero"
          />
          <div className="mt-20">
            <h1 className="font-semibold mb-10 text-3xl">Services</h1>
            <p>
              Welcome to Impact Nutrition Consult, where we are committed to
              combating the rise of non-communicable diseases through our
              effective nutrition and diet-related services. As passionate
              agents of nutrition promotion and advocacy, we empower individuals
              with the knowledge and support they need to adopt and maintain
              good eating practices. With a clear vision to establish a robust
              nutrition education and counseling system in Ghana and create a
              global impact, our goal is to provide comprehensive services that
              effectively address the pressing challenges of our time.
            </p>
            {/* <button className=' p-2 text-white rounded-xl bg-blue mt-5' >Discover More</button> */}
          </div>
        </div>

        {/* Service */}
        <div className="max-w-screen-xl p-4 md:p-2  md:mx-auto">
          <div className=" text-center mt-20">
            <h1 className="text-center font-semibold text-3xl">Learn at your Covenience</h1>
            <p className="text-2xl mt-6">
              We offer top-tier accredited online CPD courses and e-Learning services tailored for professionals in Ghana and worldwide. Our courses are conveniently accessible from any location, at any hour, and on any device.
            </p>
          </div>

          <div className="block md:grid grid-cols-2 mt-14 gap-10 sm:grid-cols-1 text-2xl p-2  md:grid-cols-2">
            <div className=" grid place-items-center text-center">
              <Image
                className=""
                src="https://impactnutritionconsult.com/assets/Images/service-1.png"
                width={100}
                height={100}
                alt="img hero"
              />
              <h2 className="font-bold my-3 py-3">Unlock Your Potential: Elevate Your Career with CPD Education</h2>
              <p>
                Empower Your Career Growth: Bridge Skill Gaps and Boost Your CV with CPD.
                Experience cutting-edge online education and training programs designed for ambitious individuals dedicated to continuous professional development.
              </p>
            </div>

            <div className=" grid place-items-center text-center">
              <Image
                src="https://impactnutritionconsult.com/assets/Images/service-2.png"
                width={100}
                height={100}
                alt="img hero"
              />
              <h2 className="font-bold my-3 py-3">Join Forces with Us: Together, Building a Brighter Future for Health Professionals in Ghana</h2>
              <p>
                We aspire to play a role in your journey. We aim to contribute to your career and support the advancement of healthcare professionals throughout Ghana.
              </p>
            </div>

            <div className=" grid place-items-center text-center">
              <Image
                src="https://impactnutritionconsult.com/assets/Images/service-3.png"
                width={100}
                height={100}
                alt="img hero"
              />
              <h2 className="font-bold my-3 py-3">Unlock New Horizons: Expand Your Network and Expertise Through Our Engaging Courses</h2>
              <p>
                Embark on a journey of growth and collaboration as you engage with our courses, connecting with a diverse community of health professionals nationwide.
              </p>
            </div>

            <div className=" grid place-items-center text-center">
              <Image
                src="https://impactnutritionconsult.com/assets/Images/service-4.png"
                width={100}
                height={100}
                alt="img hero"
              />
              <h2 className="font-bold my-3 py-3">Empowering Connections: Expand Your Network and Expertise Through Our Courses</h2>
              <p>
                Our courses offer a dynamic platform for learning and collaboration, connecting you with fellow health professionals nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default services;
