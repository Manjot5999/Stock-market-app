import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import {useDispatch,useSelector} from 'react-redux'
import {updateItemasync } from './wishlistSlice';
import { useUserAuth } from '../context/UserAuthContext';


const Details = ({ details }) => {
  const {user}=useUserAuth()


  const { darkMode } = useContext(ThemeContext);

  const dispatch=useDispatch()
  const store=useSelector(store=>store.cart.items)

  const userInfo= store.filter((item)=>(item.Email.toLowerCase()===user.email.toLowerCase()))
  const id=userInfo[0].id
  const WishList=userInfo[0].Wishlist
  
  const addToWatchlist=()=>{
    const updatedWishlist=[...WishList,{name:details.name,symbol:details.ticker}]
    dispatch(updateItemasync(id,{
      'Wishlist':updatedWishlist
    }))
  }

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