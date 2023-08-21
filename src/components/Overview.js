import React from 'react';
import Card from './Card';

const Overview = ({ symbol, price, change, changePercent, currency, onAddToWishlist,logo }) => {
  return (
      <div className='bg-white shadow-md rounded-md p-2'>
          <img alt={symbol} src={logo} />
          <p className='my-2'>Symbol: <span className='text-l xl:text-3xl 2xl:text-4xl'>{symbol}</span></p>
          <p className='my-2'>Current Price: <span className='text-l xl:text-3xl 2xl:text-4xl'>${price}</span></p>
          {/* <button
            className='my-2 text-sm xl:text-base 2xl:text-lg text-blue-500 hover:underline focus:outline-none'
            onClick={onAddToWishlist}
          >
            Add to Wishlist
          </button> */}
        <div
          className={`text-lg xl:text-xl 2xl:text-2xl mt-2 ${
            change > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          Change: {change} <span>({changePercent}%)</span>
        </div>
      </div>
  );
};

export default Overview;
