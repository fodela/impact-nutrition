import FooterColOne from "./FooterColOne";
import FooterColThree from "./FooterColThree";
import FooterColTwo from "./FooterColTwo";

const Footer = () => {
  return (
    <footer className="flex flex-col divide-y-2 gap-4">
      <div className="flex justify-between text-black/80 dark:text-white/80">
        <FooterColOne />
        <FooterColTwo />
        <FooterColThree />
      </div>
      <p className="pt-4">
        © Nutrition Consult Ghana, Inc. 2019. We love our users!
      </p>
    </footer>
  );
};

export default Footer;
