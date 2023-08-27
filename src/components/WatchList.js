import { useDeviceLanguage } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchAndInitializeState } from "./wishlistSlice";

const WatchList = () => {
  const [userData, setUserData] = useState([]);
  const store = useSelector(store => store.cart.items);
  const navigate = useNavigate();

  
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setUserData(store[0].Wishlist);
    }

    return () => {
      isMounted = false;
    };
  }, [store]);

  const handleCompanyNewsClick = (symbol) => {
    // Implement your logic here to handle the click event for company news
    navigate(`/news/${symbol}`);
    console.log(`Clicked to watch news for ${symbol}`);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4">Watchlist</h1>
      <div className="grid grid-cols-2 gap-4">
        {userData.map(stock => (
          <div
            key={stock.symbol}
            className="bg-white p-4 rounded-md shadow-md border border-gray-200"
          >
            <div className="flex items-center mb-2">
              <img
                src={stock.logo} // Assuming you have a 'logo' property in your stock object
                alt={`${stock.name} Logo`}
                className="w-4 h-4 mr-2"
              />
              <h2 className="text-lg font-semibold">{stock.name}</h2>
            </div>
            <p className="text-gray-600 text-sm"> {/* Adjusted the font size here */}
              {stock.symbol}
            </p>
            <button
              onClick={() => handleCompanyNewsClick(stock.symbol)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Watch News
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
