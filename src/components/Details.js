import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import {useDispatch,useSelector} from 'react-redux'
import {updateItemasync } from './wishlistSlice';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';


const Details = ({ details }) => {
  const {user}=useUserAuth()


  const { darkMode } = useContext(ThemeContext);

  const dispatch=useDispatch()
  const store=useSelector(store=>store.cart.items)
  const navigate=useNavigate()
  

  let id = null
  let WishList=null
  console.log('store',store)

  if(user){
    const userInfo= store.filter((item)=>(item.Email.toLowerCase()===user.email.toLowerCase()))
    console.log('userInfo',userInfo)
    id=userInfo[0].id
    WishList=userInfo[0].Wishlist
  }

  
  const addToWatchlist = () => {
    if (user) {
      const stockToAdd = { name: details.name, symbol: details.ticker, logo: details.logo };
      const isStockAlreadyAdded = WishList.some(item => item.symbol === stockToAdd.symbol);
  
      if (!isStockAlreadyAdded) {
        const updatedWishlist = [...WishList, stockToAdd];
        dispatch(updateItemasync(id, { Wishlist: updatedWishlist }));
      } else {
        alert('Stock is already in your watchlist.');
      }
    } else {
      alert('Need to Login first');
      navigate('/login');
    }
  };
  

  const detailsList = {
    ticker:'Symbol',
    name: 'Name',
    currency: 'Currency',
    country: 'Country',
    exchange: 'Exchange',
    price:'Current Price',
    marketCapitalization: 'Market Cap',
    finnhubIndustry: 'Industry',
    change:'Change($)',
    changePercent:'Change(%)',
    ipo: 'IPO Date',
  };

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };
  return (
    <div className={`bg-white border-neutral-200 w-full rounded-md relative p-3 border-2`}>
      <div className=' items-center justify-center mb-4'>
        <a href={details.weburl}>
          <img src={details.logo} alt={details.name} className='w-16 h-16 object-contain' />
        </a>
        <button className='border-1 rounded-md cursor-pointer p-2 my-4 text-indigo-300 hover:bg-indigo-600' onClick={()=>{addToWatchlist()}}>Add to watchlist</button>
      </div>
      <ul className='space-y-3'>
        {Object.keys(detailsList).map((item) => (
          <li key={item} className='flex items-center justify-between'>
            <span className='text-gray-600'>{detailsList[item]}</span>
            <span className={`font-semibold ${
              (item === 'change' || item === 'changePercent') && details.change < 0
                ? 'text-red-500'
                : (item === 'change' || item === 'changePercent') && details.change > 0
                ? 'text-green-500'
                : ''
            }`}>
              {item === 'marketCapitalization'
                ? `${convertMillionToBillion(details[item])}B`
                : details[item]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;