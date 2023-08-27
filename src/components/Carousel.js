import React, { useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import StockContext from '../context/StockContext';

const StockCarousel = ({ stockData,date }) => {
  

  const chunkSize = 4; // Number of items per page

  const navigate=useNavigate()

  const {setStockSymbol}=useContext(StockContext)
  // Create an array of chunks, each containing up to four items
  const chunkedStockData = [];
  for (let i = 0; i < stockData.length; i += chunkSize) {
    chunkedStockData.push(stockData.slice(i, i + chunkSize));
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-4 text-center">Most Actively Traded Stocks for {date.substr(0,10)}</h2>
      <Carousel autoPlay={true} interval={5000} infiniteLoop={true} showStatus={true} showThumbs={false}>
        {chunkedStockData.map((chunk, pageIndex) => (
          <div key={pageIndex} className="flex justify-center">
            {chunk.map((stock, index) => (
              <div key={index} className="p-4 rounded-lg shadow-md border border-gray-300 mx-2 bg-white cursor-pointer" onClick={()=>{
                setStockSymbol(stock.ticker)
                navigate(`/${stock.ticker}`)
              }}>
                <h1 className="text-xl font-semibold mb-2">{stock.ticker}</h1>
                <h2 className="text-l font-semibold mb-2">{stock.name}</h2>

                <p>Price: ${stock.price} </p>
                <p>
                  Change Amount: <span className={stock.change_amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                    ${stock.change_amount} {stock.change_amount >= 0 ? <i className="fas fa-arrow-up ml-1"></i> : <i className="fas fa-arrow-down ml-1"></i>}
                  </span>
                </p>
                <p>
                  Change Percentage: <span className={stock.change_amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {stock.change_percentage} {stock.change_amount >= 0 ? <i className="fas fa-arrow-up ml-1"></i> : <i className="fas fa-arrow-down ml-1"></i>}
                  </span>
                </p>
                <p>Volume: {stock.volume}</p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default StockCarousel;
