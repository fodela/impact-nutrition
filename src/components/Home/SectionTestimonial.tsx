import Testimony from "../Testimony";

const SectionTestimonial = () => {
  return (
    <section>
      <h2 className="heading_secondary">What People Say About Us</h2>
      <div className="flex justify-center">
        <Testimony />
        <Testimony />
        <Testimony />
      </div>
    </section>
  );
};

export default SectionTestimonial;
