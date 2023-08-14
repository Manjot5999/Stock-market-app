import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex justify-center mt-6">
      <ul className="flex space-x-2">
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              className={`${
                currentPage === page ? "bg-gray-800" : "bg-gray-600"
              } text-white px-4 py-2`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
