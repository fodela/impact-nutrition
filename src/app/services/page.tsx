'use client'

import React from "react";
import Image from "next/image"


const services = () => {
  return <main>
    <main >
      <div className="grid grid-cols-2  gap-8  sm:grid-cols-1 text-2xl p-2  md:grid-cols-2">
        <div className="mt-20">
          <h1 className="font-semibold mb-10 text-3xl">Services</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime nemo sit, cum asperiores perferendis sed aperiam voluptatibus veritatis repudiandae itaque perspiciatis amet nobis. Saepe pariatur neque excepturi perspiciatis, deserunt quod.</p>
          {/* <button className=' p-2 text-white rounded-xl bg-blue mt-5' >Discover More</button> */}
        </div>
        <Image src='/assets/Images/Rectangle 30.png' width={600} height={100} alt="img hero" />
      </div>

      {/* Service */}
      <div>
        <div className=" text-center mt-20">
          <h1 className="text-center font-semibold text-3xl">OUR SERVICES</h1>
          <p className="text-2xl mt-6">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores laborum tenetur nam vero quisquam nisi commodi blanditiis corporis obcaecati dignissimos?</p>
        </div>

        <div className="grid grid-cols-2 mt-14 gap-10 sm:grid-cols-1 text-2xl p-2  md:grid-cols-2">
          <div className=" grid place-items-center text-center">
            <Image className="" src='/assets/Images/service-1.png' width={100} height={100} alt="img hero" />
            <h2>Simply dummy text</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nesciunt, ab non cum voluptas molestias.</p>
          </div>

          <div className=" grid place-items-center text-center">
            <Image src='/assets/Images/service-2.png' width={100} height={100} alt="img hero" />
            <h2>Simply dummy text</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nesciunt, ab non cum voluptas molestias.</p>
          </div>

          <div className=" grid place-items-center text-center">
            <Image src='/assets/Images/service-3.png' width={100} height={100} alt="img hero" />
            <h2>Simply dummy text</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nesciunt, ab non cum voluptas molestias.</p>
          </div>

          <div className=" grid place-items-center text-center">
            <Image src='/assets/Images/service-4.png' width={100} height={100} alt="img hero" />
            <h2>Simply dummy text</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi nesciunt, ab non cum voluptas molestias.</p>
          </div>

        </div>

      </div>
    </main>
  </main>;
};

export default services;