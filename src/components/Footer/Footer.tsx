"use client"
import FooterColOne from "./FooterColOne";
import FooterColThree from "./FooterColThree";
import FooterColTwo from "./FooterColTwo";

const Footer = () => {
  return (
    <footer className="block md:flex max-w-screen-xl md:p-6 md:pb-0 md:mx-auto flex-col divide-y-2 gap-4 mt-20 full_bleed">
      <div className="block md:flex justify-between text-black/80 dark:text-white/80">
        <FooterColOne />
        <FooterColTwo />
        <FooterColThree />
      </div>
      <p className="p-4 md:pt-4">
        © Nutrition Consult Ghana, Inc. 2019. We love our users!
      </p>
    </footer>
  );
};

export default Footer;
