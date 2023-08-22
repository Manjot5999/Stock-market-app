import React from "react";

const ShimmerTable = () => {
  const shimmerRows = Array.from({ length: 5 }).map((_, index) => (
    <tr
      key={index}
      className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
    >
      <td className="px-4 py-2">
        <div className="h-5 w-40 bg-gray-300 animate-pulse"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-5 w-20 bg-gray-300 animate-pulse"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-5 w-20 bg-gray-300 animate-pulse"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-5 w-20 bg-gray-300 animate-pulse"></div>
      </td>
      <td className="px-4 py-2">
        <div className="h-5 w-20 bg-gray-300 animate-pulse"></div>
      </td>
    </tr>
  ));

  return (
    <div className=" text-center p-6">
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-semibold mb-4">
          <div className="w-40 h-6 bg-gray-300 animate-pulse"></div>
        </h1>
        <table className="w-full border-collapse text-black">
          <thead className="bg-indigo-600">
            <tr>
              <th className="px-4 py-2 text-left text-white">
                <div className="w-40 h-6 bg-gray-300 animate-pulse"></div>
              </th>
              <th className="px-4 py-2 text-left text-white">
                <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
              </th>
              <th className="px-4 py-2 text-left text-white">
                <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
              </th>
              <th className="px-4 py-2 text-left text-white">
                <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
              </th>
              <th className="px-4 py-2 text-left text-white">
                <div className="w-20 h-6 bg-gray-300 animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {shimmerRows}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="w-10 h-10 bg-gray-300 rounded-full animate-pulse mx-4"
            style={{ margin: "0.25rem" }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerTable;
