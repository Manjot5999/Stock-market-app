import React, { useContext, useEffect, useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import Overview from './Overview';
import Details from './Details';
import Chart from './Chart';
import StockContext from '../context/StockContext';
import { fetchStockDetails, fetchQuote } from '../utils/api/stock-api';
import { useUserAuth } from '../context/UserAuthContext';
import { db } from '../Firebase/Firebase-app';
import { getDocs,collection, doc,updateDoc } from 'firebase/firestore';
import { getActiveNameFromCSV } from '../utils/helpers/csv-helper';
import { useSelector } from 'react-redux';



const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  
  const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  const userCollection=collection(db,'UserId')

  const {user}=useUserAuth()

  const store=useSelector(store=>store.cart.items)
  console.log(store)



  let id =null

  const handleAddToWishlist=async()=>{
      // const data=await getDocs(userCollection)
      // const userData=await data.docs.map((doc)=>({
      //   ...doc.data(),
      //   id:doc.id
      // }))
      
      // userData.forEach((item)=>{
      //   if(item.Email===user.email){
      //     id=item.id
      //   }
      // })

      // const WatchList = doc(db, "UserId", id);
      // await updateDoc(WatchList, { Wishlist: [{'Name':'MSFT'}] });

      
  }


  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);


  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand ${
        darkMode ? 'bg-gray-900 text-gray-300' : 'bg-neutral-100'
      }`}
    >
      <div className='md:col-span-2 row-span-4'>
        <Chart />
      </div>
      {/* <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
          logo={stockDetails.logo}
          onAddToWishlist={handleAddToWishlist}
          name={stockDetails.name}
        />
      </div> */}
      <div className='row-span-2 xl:row-span-3'>
        <Details details={{...stockDetails,'price':quote.pc,'change':quote.d,'changePercent':quote.dp}} />
      </div>

    </div>
  );
};

export default Dashboard;
