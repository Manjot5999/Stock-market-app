import React, { useContext } from 'react';
import Card from './Card';
import ThemeContext from '../context/ThemeContext';

const Details = ({ details }) => {
  console.log(details);
  const { darkMode } = useContext(ThemeContext);

  const detailsList = {
    name: 'Name',
    country: 'Country',
    currency: 'Currency',
    exchange: 'Exchange',
    ipo: 'IPO Date',
    marketCapitalization: 'Market Cap',
    finnhubIndustry: 'Industry'
  };

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  return (
    <Card className={`bg-${darkMode ? 'gray-900' : 'white'} p-4`}>
      <div className='flex items-center justify-center mb-4'>
        <a href={details.weburl}><img src={details.logo} alt={details.name} className='w-16 h-16 object-contain' /></a>
      </div>
      <ul className='space-y-3'>
        {Object.keys(detailsList).map((item) => (
          <li key={item} className='flex items-center justify-between'>
            <span className='text-gray-600'>{detailsList[item]}</span>
            <span className='font-semibold'>
              {item === 'marketCapitalization'
                ? `${convertMillionToBillion(details[item])}B`
                : details[item]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Details;
