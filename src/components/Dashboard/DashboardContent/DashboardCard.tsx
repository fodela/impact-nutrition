import { BiUser } from "react-icons/bi";

const DashboardCard = ({ children, detail }) => {
  return (
    <div className="bg-white dark:bg-white/10 rounded px-2 flex flex-grow flex-col items-center justify-center py-4 shadow-md h-fit">
      <div className={`${detail.color} rounded-full p-4`}>{children}</div>
      <p className="text-3xl font-extrabold">{detail.quantity}</p>
      <p>{detail.label}</p>
    </div>
  );
};

export default DashboardCard;
