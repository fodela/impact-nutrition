"use client"
import { BsBookFill, BsFillAlarmFill } from "react-icons/bs";
import AnalyticContent from "../AnalyticContent";
import { AiFillRobot } from "react-icons/ai";
import { FaBookMedical, FaResearchgate, FaUserNurse } from "react-icons/fa";

const SectionAnalytics = () => {
  return (
    <section className="bg-blue-100 pt-8 md:pb-24">
      <div className="max-w-screen-xl px-2 md:mx-auto">
        <h2 className="text-4xl font-bold text-center mt-10 text-blue-800">Services</h2>
        <h3 className="text-3xl font-bold text-center mt-6">What we offer!</h3>
        <p className="text-center text-2xl mx-auto my-6 max-w-screen-lg bg-white rounded-lg py-8">
          We provide a comprehensive and holistic counseling on food and nutrition and their link with health in a sustainable manner to our societies. We seek to research into and promote awareness on the nutritional value of available local foods to our customers. To empower the people we serve to be the doctors of the food they eat and to use food as a weapon to boost immunity and to fight diseases.
        </p>
        <div className="section_grid">
          <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-sm gap-4">
            <div className="flex justify-center items-center">
              <AiFillRobot size={100} />
              <h5 className="text-xl md:text-3xl font-bold ml-6">Health and Nutrition Education</h5>
            </div>

            <div className="mx-4">
              <p className="text-xl">
                We offer comprehensive health and nutrition education services, empowering individuals to make informed decisions about their well-being. Our dedicated team of experts is committed to providing valuable knowledge and resources to promote healthy lifestyles and improve overall wellness.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-sm gap-4">
            <div className="flex justify-center items-center">
              <FaUserNurse size={100} />
              <h5 className="text-xl md:text-3xl font-bold ml-6">CPD Programs for all Allied Health professionals</h5>
            </div>

            <div className="mx-4">
              <p className="text-xl">
                At INC, we offer a diverse range of Continuous Professional Development (CPD) programs tailored to meet the needs of allied health professionals. Our commitment to supporting professional growth and excellence in the field is reflected in our comprehensive offerings.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-sm gap-4">
            <div className="flex justify-center items-center">
              <FaBookMedical size={100} />
              <h5 className="text-xl md:text-3xl font-bold ml-6">Research and Data Analysis Services</h5>
            </div>

            <div className="mx-4">
              <p className="text-xl">
                We provide a comprehensive suite of research and data analysis services to support individuals and organizations in their pursuit of knowledge and academic excellence. Our experienced team of professionals is dedicated to delivering high-quality solutions tailored to meet your specific research needs.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg shadow-sm gap-4">
            <div className="flex justify-center items-center">
              <BsBookFill size={100} />
              <h5 className="text-xl md:text-3xl font-bold ml-6">Development of dietary plans for clients</h5>
            </div>

            <div className="mx-4">
              <p className="text-xl">
                Our team of Nutritionists is dedicated to providing personalized advice and developing customized dietary plans for clients who may benefit from them. With their expertise in nutrition and wellness, our team works closely with individuals to create tailored plans that align with their unique goals and requirements.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SectionAnalytics;
