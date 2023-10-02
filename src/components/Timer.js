import React, { useState, useEffect } from 'react';

const Timer = () => {
  const holidays = [
    // Specify holidays in the format "month/day"
    '01/02',
    '01/16',
    '02/20',
    '04/07',
    '05/29',
    '06/19',
    '07/04',
    '09/04',
    '11/23',
    '12/25'
  ];

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  const isHoliday = (date) => {
    const month = date.getMonth() + 1; // Month is 0-based
    const day = date.getDate();
    const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    return holidays.includes(formattedDate);
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketOpeningTime, setMarketOpeningTime] = useState(calculateMarketOpeningTime());
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const timerInterval = setInterval(updateTimeRemaining, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function calculateMarketOpeningTime () {
    const now = new Date();
    const marketOpeningTime = new Date(now);

    // Check if it's Saturday or Sunday
    if (isWeekend(now)) {
      // Move to Monday
      marketOpeningTime.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
    }

    // Assuming US stock market opens at 9:30 AM local time (adjust this as needed)
    marketOpeningTime.setHours(9, 30, 0, 0);

    // Check if it's a holiday
    while (isHoliday(marketOpeningTime)) {
      marketOpeningTime.setDate(marketOpeningTime.getDate() + 1);
    }

    // If it's already past the opening time, move to the next day
    if (now > marketOpeningTime) {
      marketOpeningTime.setDate(marketOpeningTime.getDate() + 1);
    }

    return marketOpeningTime;
  }

  const updateTimeRemaining = () => {
    const currentTime = new Date();
    const timeDifference = marketOpeningTime - currentTime;

    if (timeDifference <= 0) {
      setTimeRemaining('Market is open');
    } else {
      const hours = Math.floor(timeDifference / 3600000);
      const minutes = Math.floor((timeDifference % 3600000) / 60000);
      const seconds = Math.floor((timeDifference % 60000) / 1000);

      const timeRemaining = `${hours.toString().padStart(2, '0')}:
                            ${minutes.toString().padStart(2, '0')}:
                            ${seconds.toString().padStart(2, '0')}`;

      setTimeRemaining(timeRemaining);
    }
  };

  // Determine whether to show the countdown or "Market is open"
  const showCountdown = currentTime.getHours() >= 16; // Show countdown after 4 PM

  return (
    <>
      {showCountdown
        ? (
          <div className='flex items-center justify-center h-40 w-40 rounded-full border-4 border-indigo-500 shadow-lg'>
            <div className='text-center'>
              <h2 className=''>Market Countdown</h2>
              <div className=''>{timeRemaining}</div>
            </div>
          </div>
          )
        : (
          <div className='bg-green-500 text-white p-4 rounded-lg'>
            <p className='text-xl font-semibold'>Market is Open</p>
            <p className='text-sm'>Happy Trading!</p>
          </div>
          )}
    </>
  );
};

export default Timer;
