"use client"
import Image from "next/image";
import { BsFillAlarmFill } from "react-icons/bs";
const AnalyticContent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-4 gap-4">
      <div>
        <BsFillAlarmFill size={100} />
      </div>
      <div>
        <h5 className="heading_tertiary">Sed ut perspiciatis</h5>
        <p className="text-lg">
          Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam.
        </p>
      </div>
    </div>
  );
};

export default AnalyticContent;
