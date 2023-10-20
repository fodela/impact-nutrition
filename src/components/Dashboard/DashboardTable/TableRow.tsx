"use client";
import RowStatus from "./RowStatus";
import { FiEdit3 } from "react-icons/fi";
import Image from "next/image";
import { TfiTrash } from "react-icons/tfi";
import { UserDetail } from "../../../../types";

const TableRow = ({
  idx,
  userDetail,
}: {
  idx: number;
  userDetail: UserDetail;
}) => {
  const date = new Date(userDetail.createdAt);

  const dd = String(date.getUTCDate()).padStart(2, "0"); // Day
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month (+1 because months are zero-based)
  const yy = String(date.getUTCFullYear()).slice(-2); // Last two digits of the year

  const formattedDate = `${dd}/${mm}/${yy}`;

  return (
    <tr className="hover:bg-inherit/80">
      <td className="px-6 py-4 opacity-40">{idx + 1}</td>
      <th className="flex gap-3 px-6 py-4 font-normal">
        <div className="relative h-10 w-10">
          <Image
            className="h-full w-full rounded-full object-cover object-center"
            src={userDetail.imageUrl}
            alt=""
            width={100}
            height={100}
          />
          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
        </div>
        <div className="text-sm">
          <div className="font-medium">{userDetail.name}</div>
          <div className="text-gray-400">{userDetail.email}</div>
        </div>
      </th>

      <td className="px-6 py-4 ">{formattedDate}</td>
      <td className="px-6 py-4 capitalize">{userDetail.Role}</td>

      <RowStatus status={userDetail.status} />
      <td className="px-6 py-4 opacity-80">
        <div className="flex gap-2">
          <FiEdit3 size={22} />
          <TfiTrash size={22} className="text-red-500" />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
