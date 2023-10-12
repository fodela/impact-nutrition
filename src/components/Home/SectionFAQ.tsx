"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { moveVariant } from "@/lib/animationVariants";
const faqs = [
  {
    id: 1,
    title: "What services does the nutrition consult firm offer?",
    content:
      "Our nutrition consult firm offers a wide range of services including nutrition and health education, nutrition outreaches in the community, and professional development programs for continuing professional development (CPD). We also provide promotional materials and support for healthcare professionals.",
  },
  {
    id: 2,
    title: "How can I schedule a nutrition consultation?",
    content:
      "To schedule a nutrition consultation, please contact our office either by phone or email. Our team will assist you in setting up an appointment with one of our qualified nutritionists.",
  },
  {
    id: 3,
    title: "Are the nutritionists at your firm certified?",
    content:
      "Yes, all our nutritionists are certified and have undergone extensive training in nutrition and dietetics. They are knowledgeable and experienced in providing evidence-based advice and recommendations tailored to individual needs.",
  },
  {
    id: 4,
    title: "Do you offer group nutrition education sessions?",
    content:
      "Absolutely! We conduct group nutrition education sessions for various organizations, schools, and community groups. These sessions cover a wide range of topics such as healthy eating, weight management, and disease prevention.",
  },
  {
    id: 5,
    title: "What are the benefits of attending your CPD programs?",
    content:
      "Our CPD programs are designed to enhance the professional skills and knowledge of healthcare providers. By attending our programs, you can stay updated with the latest research and developments in the field of nutrition, earn continuing education credits, and network with other professionals.",
  },
  {
    id: 6,
    title: "What are the benefits of attending your CPD programs?",
    content:
      "Our CPD programs are designed to enhance the professional skills and knowledge of healthcare providers. By attending our programs, you can stay updated with the latest research and developments in the field of nutrition, earn continuing education credits, and network with other professionals.",
  },
];

const SectionFAQ = () => {
  const [activeId, setActiveId] = useState(1);
  const toggleAccordion = (key: number) => {
    if (key == activeId) {
      setActiveId(0);
    } else {
      setActiveId(key);
    }
  };
  return (
    <section className="max-w-screen-xl p-10  mx-auto">
      <header className="max-w-screen-xl px-2 md:mx-auto my-2 ">
        <h2 className="text-xl font-bold text-center mt-10 text-colorPrimary">
          FAQ
        </h2>
        <h3 className="text-4xl sm:text-6xl font-bold text-center">
          Any Questions? Look Here
        </h3>
        <p className="text-center mx-auto my-4 max-w-screen-sm rounded-lg">
          We are dedicated to offering comprehensive and holistic counseling on
          food and nutrition, emphasizing their profound impact on health in a
          sustainable manner for our communities.
        </p>
      </header>
      <div className="grid sm:grid-cols-2 items-start gap-4 ">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`flex flex-col shadow-lg overflow-clip  ${activeId == faq.id && "sm:row-span-2"
              }`}
          >
            <header
              className="flex gap-2 items-center justify-between bg-[#EDF6EF] dark:bg-[hsl(133,33%,10%)] rounded-t-lg p-4 z-10 "
              onClick={() => toggleAccordion(faq.id)}
            >
              <h2>{faq.title} </h2>{" "}
              <IoIosArrowDown
                className={`${activeId == faq.id && "rotate-180 "
                  } transition-transform ease-in-out`}
                size={20}
              />
            </header>
            <AnimatePresence>
              {activeId == faq.id && (
                <motion.div
                  key={faq.id}
                  className={` dark:bg-white/5 dark:border-b dark:border-x border-gray-800 last:col-start-`}
                  variants={moveVariant}
                  initial="top"
                  animate="visible"
                  transition={{ delay: 0, duration: 1, ease: "anticipate" }}
                  exit="exitUp"
                >
                  <p className={`${activeId == faq.id && "p-4"}`}>
                    {faq.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionFAQ;
