"use client";
import { capitalizeWord } from "@/app/utils/capitalizeWord";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const categories = [
  { name: "published", isSelected: false },
  { name: "drafted", isSelected: true },
  { name: "reviewed", isSelected: false },
  { name: "deleted", isSelected: false },
  { name: "canceled", isSelected: false },
];

const title = "category";

const Header = () => {
  const [isDropDownHidden, setIsDropDownHidden] = useState(true);
  const [categoryList, setCategoryList] = useState(categories);

  const handleCheckboxChange = (index: number) => {
    setCategoryList((prevCategoryList) => {
      const updatedCategoryList = [...prevCategoryList];
      updatedCategoryList[index].isSelected =
        !updatedCategoryList[index].isSelected;
      return updatedCategoryList;
    });
  };

  const toggleFilterMenu = () => {
    setIsDropDownHidden(!isDropDownHidden);
  };
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-black/80">
      {/* <label for="table-search" class="sr-only">Search</label> */}
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>

      <div className="relative pl-10">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown load"
          className="flex gap-1 items-center border-2 px-4 py-2 rounded-lg text-lg"
          type="button"
          onClick={toggleFilterMenu}
        >
          <FiFilter />
          Filter
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          id="dropdown"
          className={` 
           ${isDropDownHidden ? "hidden" : ""}
           absolute top-14 right-0  z-10 py-2
             pl-3 pr-10  rounded-lg shadow-lg dark:shadow-green-5 bg-white dark:bg-gray-700
             animate-fadeIn`}
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            {capitalizeWord(title)}
          </h6>
          <ul className="space-y-2 text-sm " aria-labelledby="dropdownDefault">
            {categories.map((cat, index) => (
              <li className="flex items-center">
                <input
                  id="apple"
                  type="checkbox"
                  checked={cat.isSelected}
                  onChange={() => handleCheckboxChange(index)}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />

                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {cat.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
