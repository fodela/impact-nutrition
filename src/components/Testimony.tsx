import Image from "next/image";
import { use, useState } from "react";
import { BsQuote } from "react-icons/bs";
const Testimony = () => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div className="p-10 max-w-md shadow-md md:shadow-xl dark:shadow-white relative my-8">
      <BsQuote className="absolute right-1 top-1 text-6xl text-black/50 dark:text-white/50 rotate-180" />
      <p className="mb-4">
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
      <div className="flex items-center gap-4 flex-nowrap">
        <Image
          className={`w-24 h-24 rounded-full mx-auto ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}

          src="https://impactnutritionconsult.com/assets/Saadong.jpg"
          alt="executive director's image"
          width={484}
          height={612}

          onLoadingComplete={() => setIsLoading(false)}
        />
        <div className="flex flex-col ">
          <p className="font-bold text-xl">Executive Director&apos;s Message</p>
          <p className="text-sm"> Executive Director, INC</p>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
