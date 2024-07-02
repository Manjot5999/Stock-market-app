import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import Details from './Details';
import Chart from './Chart';
import { fetchStockDetails, fetchQuote } from '../utils/api/stock-api';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  const { symbol } = useParams();

  const updateStockDetails = async () => {
    try {
      const result = await fetchStockDetails(symbol);
      setStockDetails(result);
    } catch (error) {
      setStockDetails({});
      console.log(error);
    }
  };

  const updateStockOverview = async () => {
    try {
      const result = await fetchQuote(symbol);
      setQuote(result);
    } catch (error) {
      setQuote({});
      console.log(error);
    }
  };
  useEffect(() => {
      updateStockDetails();
      updateStockOverview();  
  }, [symbol]);

  return (
    (Object.keys(stockDetails).length !== 0 && Object.keys(quote).length !== 0) && (
      <div
        className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
          darkMode ? 'bg-gray-900 text-gray-300' : 'bg-neutral-100'
        }`}
      >
        <div className='md:col-span-2 row-span-4'>
          <Chart />
        </div>

        <div className='row-span-2 xl:row-span-3'>
          <Details details={{ ...stockDetails, price: quote.pc, change: quote.d, changePercent: quote.dp }} />
        </div>
      </div>
    )
  );
};

export default Dashboard;
