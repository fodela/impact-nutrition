"use client"
import AnalyticContent from "../AnalyticContent";

const SectionAnalytics = () => {
  return (
    <section className="max-w-screen-xl px-2 md:mx-auto">
      <h2 className="heading_secondary ">Insights and Analytics</h2>
      <div className="section_grid">
        <AnalyticContent />
        <AnalyticContent />
        <AnalyticContent />
        <AnalyticContent />
      </div>
    </section>
  );
};

export default SectionAnalytics;
