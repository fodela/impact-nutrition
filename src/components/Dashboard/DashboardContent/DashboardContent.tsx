import Header from "@/components/Header";
import React from "react";
import { FiDollarSign } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import DashboardTable from "../DashboardTable";

const DashboardContent = () => {
  const cards = [
    {
      title: "Users",
      iconName: "FiUsers",
      details: "Total number of users",
      footer: "Something cool",
    },
    {
      title: "Account",
      iconName: "FiDollarSign",
      details: "Total number of amount",
      footer: "Something cool",
    },
    {
      title: "Events",
      iconName: "FiCalendar",
      details: "Total number of events",
      footer: "Something cool",
    },
  ];

  return (
    <div>


      <div className="m-2 flex justify-start">
        {cards.map((card) => (
          <div
            className="rounded-md p-3 shadow-md bg-white dark:bg-zinc-700 mx-2"
            key={card.title}
          >
            <div className="rounded-full w-40">
              <FiCalendar />
            </div>
            <div>{card.title}</div>
            <div>{card.details}</div>
            <div>{card.footer}</div>
          </div>
        ))}

      </div>
      <div className="flex flex-col gap-4 bg-white dark:bg-black/80">
        <DashboardTable />
      </div>
    </div>
  );
};

export default DashboardContent;
