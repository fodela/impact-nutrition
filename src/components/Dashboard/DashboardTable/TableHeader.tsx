import { capitalizeWord } from "@/app/utils/capitalizeWord";
const headings = ["author", "status", "role", "team", "actions"];

const TableHeader = () => {
  return (
    <thead>
      <tr>
        {headings.map((heading) => (
          <th scope="col" className="px-6 py-4 font-medium ">
            {capitalizeWord(heading)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
