import { Event, User } from "@prisma/client";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { TfiTrash } from "react-icons/tfi";



const UserTableRow = ({
  idx,
  userDetail,
}: {
  idx: number;
  userDetail: Event;
}) => {
  const date = new Date(userDetail.createdAt);

  const dd = String(date.getUTCDate()).padStart(2, "0"); // Day
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month (+1 because months are zero-based)
  const yy = String(date.getUTCFullYear()).slice(-2); // Last two digits of the year

  const formattedDate = `${dd}/${mm}/${yy}`;

  return (
    <tr className="hover:bg-inherit/80 opacity-80">
      <td className="px-6 py-4 opacity-40 capitalize">{idx + 1}</td>
      <td className="px-6 py-4 capitalize font-bold text-lg opacity-100">
        {userDetail.title}
      </td>

      {/* <RowStatus status={userDetail.status} /> */}
      {/* <td className="px-6 py-4 capitalize">{userDetail.Role}</td> */}
      <td className="px-6 py-4 capitalize opacity-95">
        {userDetail.organizers}
      </td>
      <td className="px-6 py-4 capitalize">{formattedDate}</td>
      <td className="px-6 py-4 capitalize">
        <div className="">
          <p>Oct 10 2023</p>
          <p>8:00am - 11:00am</p>
        </div>
      </td>

      <td className="px-6 py-4 capitalize">5,340</td>
      <td className="px-6 py-4 capitalize">{userDetail.price}</td>
      <td className="px-6 py-4 capitalize">{userDetail.location}</td>
      <td className="px-6 py-4 capitalize">
        <div className="flex gap-2">
          <FiEdit3 size={25} />
          <TfiTrash size={25} className="text-red-500" />
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
