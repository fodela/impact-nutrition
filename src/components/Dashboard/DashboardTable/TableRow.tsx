"use client";
import { capitalizeWord } from "@/app/utils/capitalizeWord";
import RowStatus from "./RowStatus";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";

type RowDetail = {
  name: string;
  email: string;
  status: string;
  Role: string;
  teams: string[];
  imageUrl: string;
};

const TableRow = ({ rowDetail }: { rowDetail: RowDetail }) => {
  const [isActionHidden, setIsActionHidden] = useState(true);
  return (
    <tr className="hover:bg-inherit/80">
      <th className="flex gap-3 px-6 py-4 font-normal">
        <div className="relative h-10 w-10">
          <img
            className="h-full w-full rounded-full object-cover object-center"
            src={rowDetail.imageUrl}
            alt=""
          />
          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
        </div>
        <div className="text-sm">
          <div className="font-medium">{rowDetail.name}</div>
          <div className="text-gray-400">{rowDetail.email}</div>
        </div>
      </th>
      <RowStatus status={rowDetail.status} />
      <td className="px-6 py-4">{capitalizeWord(rowDetail.Role)}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          {rowDetail.teams.map((team) => (
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 dark:bg-violet-600 px-2 py-1 text-xs font-semibold text-violet-600 dark:text-violet-50">
              {capitalizeWord(team)}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center gap-4">
          {isActionHidden ? (
            <FiMoreHorizontal
              onClick={() => setIsActionHidden(!isActionHidden)}
            />
          ) : (
            <>
              <a x-data="{ tooltip: 'Delete' }" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </a>
              <a x-data="{ tooltip: 'Edite' }" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </a>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
