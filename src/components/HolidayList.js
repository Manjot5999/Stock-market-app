import React, { useState } from 'react';

const holidays = [
  { date: '01/02', name: "New Year's Day" },
  { date: '01/16', name: 'Martin Luther King Jr. Day' },
  { date: '02/20', name: 'Presidents\' Day' },
  { date: '04/07', name: 'Good Friday' },
  { date: '05/29', name: 'Memorial Day' },
  { date: '06/19', name: 'Juneteenth National Independence Day' },
  { date: '07/04', name: 'Independence Day' },
  { date: '09/04', name: 'Labor Day' },
  { date: '11/23', name: 'Thanksgiving Day' },
  { date: '12/25', name: 'Christmas Day' }
];

const formatDate = (dateString) => {
  const [month, day] = dateString.split('/');
  const monthName = new Date(2023, parseInt(month) - 1, 1).toLocaleString('default', { month: 'short' });
  return `${parseInt(day)} ${monthName}`;
};

const HolidayList = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='text-center'>
      <div className='flex justify-center items-center'>
        <button onClick={toggleList} className='bg-indigo-500 text-white px-4 py-2 rounded-lg inline-block'>
          Show List of Holidays for US Stock Market
        </button>
      </div>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='absolute inset-0 bg-black opacity-50' />
          <div className='z-10 bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>US Stock Market Holidays</h2>
            <ul className='list-disc list-inside'>
              {holidays.map((holiday, index) => (
                <li key={index} className='mb-2'>
                  <span className='font-semibold text-xl'>{formatDate(holiday.date)}</span> - {holiday.name}
                </li>
              ))}
            </ul>
            <button onClick={toggleList} className='bg-red-500 text-white px-4 py-2 rounded-lg mt-4'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayList;
