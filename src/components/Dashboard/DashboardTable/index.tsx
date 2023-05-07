import React from "react";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";

const rowDetails = [
  {
    name: "John Doe",
    email: "johndoe@email.com",
    status: "published",
    Role: "product designer",
    teams: ["design", "product", "developer"],
    imageUrl: "https://source.unsplash.com/user/wsanter",
  },
  {
    name: "Fo Dela",
    email: "fodela@email.com",
    status: "draft",
    Role: "product designer",
    teams: ["design", "product", "developer"],
    imageUrl: "https://source.unsplash.com/user/wsanter",
  },
  {
    name: "Laura Scholauranstein",
    email: "laurascholauranstein@email.com",
    status: "deleted",
    Role: "product designer",
    teams: ["design", "product", "developer"],
    imageUrl: "https://source.unsplash.com/user",
  },
  {
    name: "Keli Boost",
    email: "kelibst@email.com",
    status: "",
    Role: "product designer",
    teams: ["design", "product", "developer"],
    imageUrl: "https://source.unsplash.com/300x300",
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    status: "draft",
    Role: "product designer",
    teams: ["design", "product", "developer"],
    imageUrl: "https://source.unsplash.com/user/300x300",
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    status: "pending_review",
    Role: "product designer",
    teams: ["design", "product", "developer"],
    imageUrl: "https://source.unsplash.com/user/wsanter",
  },
];

const DashboardTable = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
      <table className="w-full border-collapse  text-left text-sm">
        <TableHeader />
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {rowDetails.map((detail) => (
            <TableRow rowDetail={detail} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default DashboardTable;
