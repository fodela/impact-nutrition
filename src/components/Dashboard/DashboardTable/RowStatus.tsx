import { capitalizeWord } from "@/app/utils/capitalizeWord";
import React from "react";

const RowStatus = ({ status }: { status: string }) => {
  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return {
          container: "bg-green-50 dark:bg-green-600",
          dot: "bg-green-600 dark:bg-green-300",
          text: "text-green-600 dark:text-green-50",
        };

      case "pending_review":
        return {
          container: "bg-yellow-50 dark:bg-yellow-600",
          dot: "bg-yellow-600 dark:bg-yellow-300",
          text: "text-yellow-600 dark:text-yellow-50",
        };

      case "draft":
        return {
          container: "bg-gray-50 dark:bg-gray-600",
          dot: "bg-gray-600 dark:bg-gray-300",
          text: "text-gray-600 dark:text-gray-50",
        };

      case "deleted":
        return {
          container: "bg-red-50 dark:bg-red-600",
          dot: "bg-red-600 dark:bg-red-300",
          text: "text-red-600 dark:text-red-50",
        };

      default:
        return {
          container: "",
          dot: "",
          text: "",
        };
    }
  };

  const statusClasses = getStatusClasses(status);

  return (
    <td className="px-6 py-4">
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${statusClasses.container} ${statusClasses.text}`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${statusClasses.dot}`}
        ></span>
        {capitalizeWord(status)}
      </span>
    </td>
  );
};

export default RowStatus;
