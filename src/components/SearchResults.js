import React, { useContext } from 'react';
import StockContext from '../context/StockContext';
import ThemeContext from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ results,clear }) => {

  const { darkMode } = useContext(ThemeContext);

  const { setStockSymbol } = useContext(StockContext);

  const navigate=useNavigate()

  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${
        darkMode
          ? 'bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark'
          : 'bg-white border-neutral-200 custom-scrollbar'
      }`}
    >
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? 'hover:bg-indigo-600' : 'hover:bg-indigo-200 '
            } transition duration-300`}
            onClick={() => {
              setStockSymbol(item['1. symbol'])
              clear()
              navigate(`/${item['1. symbol']}`)
            }}
          >
            <span>{item['1. symbol']}</span>
            <span>{item['2. name']}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
