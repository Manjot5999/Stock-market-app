import React from 'react';
import Card from './Card';

const Overview = ({ symbol, price, change, changePercent, currency }) => {
  return (
    <Card className='bg-white shadow-md'>
      <span className='absolute left-4 top-4 text-neutral-400 text-xl 2xl:text-2xl'>
        {symbol}
      </span>
      <div className='w-full h-full flex items-center justify-around'>
        <span className='text-2xl xl:text-3xl 2xl:text-4xl font-semibold flex items-center'>
          ${price}
          <span className='text-base xl:text-lg 2xl:text-xl text-neutral-400 ml-2'>
            {currency}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change > 0 ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
