import { capitalizeWord } from "@/app/utils/capitalizeWord";
const headings = ["author", "status", "role", "team", "actions"];

const TableHeader = ({ headings }: { headings: string[] }) => {
  return (
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th key={index} scope="col" className="px-6 py-4 font-medium ">
            {capitalizeWord(heading)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
