import { BsTelephone } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { ImLocation } from "react-icons/im";

const SectionAddress = () => {
  return (
    <section className="max-w-screen-lg sm:flex gap-4 md:gap-8 justify-center md:mx-auto my-10">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full mb-4 shadow-md max-w-fit bg-gray-100 p-6">
          <FiMail className="text-colorPrimary" size={30} />
        </div>
        <div className="font-bold text-xl my-4">Email Address:</div>
        <div>info@impactnutritionconsult.com</div>
        <div>support@impactnutritionconsult.com</div>
      </div>

      <div className="flex m-4 flex-col items-center justify-center">
        <div className="rounded-full mb-4 shadow-md max-w-fit bg-gray-100 p-6">
          <BsTelephone className="text-colorPrimary" size={30} />
        </div>
        <div className="font-bold text-xl my-4">Call us:</div>
        <a href="+233550079311">
          <span className="">+233550079311</span>
        </a>
        <a href="+233546912055">
          <span className="">+233546912055</span>
        </a>
        {/* <a href="+233206349421">
          <span className="">
            {" "}
            +233206349421
          </span>
        </a> */}
      </div>

      <div className="flex m-4 flex-col items-center justify-center">
        <div className="rounded-full mb-4 shadow-md max-w-fit bg-gray-100 p-6">
          <ImLocation className="text-colorPrimary" size={30} />
        </div>
        <div className="font-bold text-xl my-4">Email Address:</div>
        <div className="text-lg">Suncity-Tema West</div>
        <div className="text-lg"> Spring Onion Street</div>
      </div>
    </section>
  );
};

export default SectionAddress;
