import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const ShimmerCarousel = () => {
  const chunkedStockData=[1,2,3,4]

  return (
    <>
    <div className="bg-gray-100 p-4 rounded-lg shadow-md ">
        
      <h2 className="text-xl font-semibold mb-4 text-center">Most Actively Traded Stocks</h2>
      <div  className="flex justify-center">
        {chunkedStockData.map((chunk, pageIndex) => (
              <div key={pageIndex} className="p-4 rounded-lg shadow-md border border-gray-300 mx-2 bg-gray-300 cursor-pointer h-60 w-60 animate-pulse">
                
              </div>
        ))}
          </div>
    </div>
    </>
  );
};

export default ShimmerCarousel;
