"use client";
import { FC, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
type AccordionProps = {
  faq: {
    id: number;
    title: string;
    content: string;
  };
  isOpen: boolean;
};
const Accordion: FC<AccordionProps> = ({ faq, isOpen }) => {
  return (
    <div className={`flex flex-col shadow-lg ${isOpen && "sm:row-span-2"}`}>
      <header className="flex gap-2 items-center justify-between bg-[#EDF6EF] dark:bg-[hsl(133,33%,10%)] rounded-t-lg p-4">
        <h2>{faq.title} </h2>{" "}
        <IoIosArrowDown
          className={`${
            isOpen && "rotate-180 "
          } transition-transform ease-in-out`}
          size={20}
        />
      </header>
      <div className={`${!isOpen && "hidden"} revealFromTop`}>
        <p className=" p-4">{faq.content}</p>
      </div>
    </div>
  );
};

export default Accordion;
