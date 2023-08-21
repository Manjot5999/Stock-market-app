import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'

const WatchList = () => {
  const [userData, setUserData] = useState([]);
  const store = useSelector(store => store.cart.items);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    if (isMounted) {
      setUserData(store[0].Wishlist);
    }

    return () => {
      // Cleanup function
      isMounted = false; // Mark the component as unmounted
    };
  }, [store]);


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Watchlist</h1>
      <div className="grid grid-cols-2 gap-4">
        {userData.map(stock => (
          <div
            key={stock.symbol}
            className="bg-white p-4 rounded-md shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{stock.name}</h2>
            <p className="text-gray-600">{stock.symbol}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;


