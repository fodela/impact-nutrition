import Image from "next/image";
import { BsQuote } from "react-icons/bs";
const Testimony = () => {
  return (
    <div className="p-10 w-96 shadow-xl dark:shadow-white relative">
      <BsQuote className="absolute right-1 top-1 text-6xl text-black/50 dark:text-white/50 rotate-180" />
      <p className="mb-4">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry `&apos;`s standard dummy text ever
        since the 1500s, when an unknown printer{" "}
      </p>
      <div className="flex items-center gap-4 flex-nowrap">
        <Image
          src="/../favicon.ico"
          alt="testimony image"
          width={45}
          height={45}
        />
        <div className="flex flex-col ">
          <p className="font-bold text-xl">Lorem Ipsum</p>
          <p className="text-sm">CEO Organization</p>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
