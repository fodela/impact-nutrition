"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { getAllUsers } from "@/app/redux/slices/userSlice";
import { useEffect } from "react";
import * as XLSX from "xlsx";

const Page = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.users);

  // useEffect(() => {
  //   handleGetUsers();
  // }, []);

  const handleGetUsers = () => {
    dispatch(getAllUsers());
  };

  const handlePasswordReset = (userId: string) => {
    // Implement the password reset logic here
    console.log(`Reset password for user with ID: ${userId}`);
  };

  const generateExcelReport = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, "Users_Report.xlsx");
  };

  return (
    <div className="text-center mx-auto my-4">
      <button
        className="px-4 py-2 mb-4 rounded-md bg-green-800 text-white"
        onClick={handleGetUsers}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Loading...' : 'Get Users'}
      </button>
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      {status === 'succeeded' && (
        <div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Profession
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.name}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.profession}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.email}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{user.role}</td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <button
                        className="px-4 py-2 rounded-md bg-blue-600 text-white"
                        onClick={() => handlePasswordReset(user.id)}
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className="px-4 py-2 mb-4 rounded-md bg-green-800 text-white"
            onClick={generateExcelReport}
          >
            Download Excel Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;