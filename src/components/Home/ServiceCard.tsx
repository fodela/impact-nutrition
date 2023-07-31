import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type ServiceCardProps = {
  service: {
    imageLink: string;
    title: string;
    content: string;
  };
};

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  return (
    <div
      className="flex flex-col items-center justify-between gap-5 rounded-lg shadow-lg p-4 bg-white dark:border-t-2 dark:border-r-2 border-slate-500 hover:border-colorPrimary/10 hover:shadow-xl text-center min-w-['299px'] 
    group
    hover:-translate-y-4 transition-all duration-300 bg-black/5 dark:bg-white/5"
    >
      <div className="h-20">
        <Image
          src={service.imageLink.toString()}
          alt="an illustration of a health of personnel teaching a group of people"
          width={94}
          height={96}
        />
      </div>
      <h2 className="text-xl font-bold">{service.title}</h2>
      <p>{service.content}</p>
      <Link
        href="/services"
        className="capitalize border border-inherit  group-hover:border-colorPrimary rounded py-2 px-4 text-colorPrimary hover:bg-green-600 hover:text-white transition-all duration-300"
      >
        Learn More
      </Link>
    </div>
  );
};

export default ServiceCard;
