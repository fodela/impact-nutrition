'use client'

import { ChildrenProps } from "@/components/NextAuthProvider";
import { ReactNode } from "react";

interface DashboardCardProps {
  children: ReactNode,
  detail: {
    label: string,
    quantity: string,
    color: string,
  },
}

const DashboardCard = ({ children, detail }: DashboardCardProps) => {
  return (
    <div className="bg-white dark:bg-white/10 rounded px-2 flex flex-grow flex-col items-center justify-center py-4 shadow-md h-fit">
      <div className={`${detail.color} rounded-full p-4`}>{children}</div>
      <p className="text-3xl font-extrabold">{detail.quantity}</p>
      <p>{detail.label}</p>
    </div>
  );
};

export default DashboardCard;
