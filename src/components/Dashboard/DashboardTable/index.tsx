import TableRow from "./TableRow";
import Pagination from "./Pagination";
import TableHeader from "./TableHeader";
import { UserDetail } from "../../../../types";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";

const userTableHeadings = [
  "#",
  "User",
  "Date Created",
  "Role",
  "Status",
  "Actions",
];

const rowDetails: UserDetail[] = [
  {
    name: "John Doe",
    email: "johndoe@email.com",
    status: "active",
    Role: "managing director",
    createdAt: "2023-10-13T09:22:33.635Z",
    imageUrl: "https://source.unsplash.com/user/wsanter",
  },
  {
    name: "Fo Dela",
    email: "fodela@email.com",
    status: "inactive",
    Role: "developer",
    createdAt: "2023-10-13T09:22:33.635Z",
    imageUrl: "https://source.unsplash.com/user/wsanter",
  },
  {
    name: "Laura Scholauranstein",
    email: "laurascholauranstein@email.com",
    status: "suspended",
    Role: "financial secretary",
    createdAt: "2023-10-13T09:22:33.635Z",
    imageUrl: "https://source.unsplash.com/user",
  },
  {
    name: "Keli Boost",
    email: "kelibst@email.com",
    status: "active",
    Role: "product designer",
    createdAt: "2023-10-13T09:22:33.635Z",
    imageUrl: "https://source.unsplash.com/300x300",
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    status: "active",
    Role: "product designer",
    createdAt: "2023-10-13T09:22:33.635Z",
    imageUrl: "https://source.unsplash.com/user/300x300",
  },
  {
    name: "John Doe",
    email: "johndoe@email.com",
    status: "inactive",
    Role: "accountant",
    createdAt: "2023-10-13T09:22:33.635Z",
    imageUrl: "https://source.unsplash.com/user/wsanter",
  },
];

const UserTable = () => {
  return (
    <>
      <h2 className="heading_tertiary">Users</h2>
      <div className="flex justify-between">
        <div className="bg-white px-2 dark:bg-white/10 shadow-lg flex rounded-lg  items-center">
          <input
            type="search"
            className="p-3 rounded-lg bg-transparent"
            placeholder="Search user"
          />
          <BiSearch size={25} className="opacity-30" />
        </div>
        <button className="btn_primary flex gap-1 items-center">
          Add user <AiOutlineUserAdd size={25} />
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 divide-y-2">
        <table className="w-full border-collapse  text-left text-sm">
          <TableHeader headings={userTableHeadings} />
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {rowDetails.map((detail, index) => (
              <TableRow key={index} idx={index} userDetail={detail} />
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );
};

export default UserTable;
