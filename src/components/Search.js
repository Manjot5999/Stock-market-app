import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import { searchSymbol } from '../utils/api/stock-api';
import SearchResults from './SearchResults';
import { SearchIcon, XIcon } from '@heroicons/react/solid';
import StockContext from '../context/StockContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const { darkMode } = useContext(ThemeContext);

  const [input, setInput] = useState('');
  const [bestMatches, setBestMatches] = useState([]);

  const {setStockSymbol}=useContext(StockContext)

  const navigate=useNavigate()
  

  const updateBestMatches = async () => {
    try {    
        const searchResults = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=DX3744UOTZI0MZZ9`);
        const result = await searchResults.json();
        const data=result.bestMatches
        setBestMatches(data);
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const handleSubmit= async()=>{
    setStockSymbol(input)
    clear()
    navigate(`/${input}`)
  }


  const clear = () => {
    setInput('');
    setBestMatches([]);
  };

  return (
    <div
      className={`flex items-center my-4 border rounded-md relative z-50 w-96 ${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-neutral-200 shadow-md'
      }`}
    >
      <input
        type='text'
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-neutral-700'
        }`}
        placeholder='Search stock...'
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            updateBestMatches();
          }
        }}
      />
      {input && (
        <button onClick={clear} className='m-1'>
          <XIcon className='h-4 w-4 text-gray-500' />
        </button>
      )}
      <button
        onClick={handleSubmit}
        className='h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400'
      >
        <SearchIcon className='h-4 w-4 text-white' />
      </button>
      {bestMatches.length > 0
        ? (
          <SearchResults results={bestMatches} clear={clear} />
          )
        : null}
    </div>
  );
};

export default Search;
