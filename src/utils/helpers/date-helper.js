/**
 * Converts a Date Object to a UNIX timestamp
 * @param {Date} date - The Date Object to be converted
 * @param {number} unixTimestamp The corresponding UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 */
export const convertDateToUnixTimestamp = (date) => {
  return Math.floor(date.getTime() / 1000);
};

/**
 * Converts a UNIX timestamp to a Date
 * @param {number} unixTimestamp - UNIX timestamp (seconds elapsed since January 1st, 1970 at UTC)
 * @returns {string} The corresponding Date Object formatted as a string
 */
export const convertUnixTimestampToDate = (unixTimestamp) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return `${day} ${month}`;
};
export const getFiveValuesBetweenStartAndEnd = (data) => {
  if (data.length <= 5) {
    return data; // Return all data if there are 5 or fewer data points
  }
  // Convert date strings to JavaScript Date objects
  const sortedData = [...data].map((item) => {
    const date = new Date(item.date + ' ' + item.year);
    return { ...item, date };
  });

  // Sort the data based on the date
  sortedData.sort((a, b) => a.date - b.date);

  // Get the first and last dates in the sorted data

  // Calculate the step size to select 5 evenly spaced data points
  const step = Math.max(1, Math.floor((sortedData.length - 1) / 4));

  // Filter the data to include only 5 points within the date range
  const hours = ['9:00 am', '11:00 am', '1:00 pm', '3:00 pm', '4:00 pm'];
  const filteredData = sortedData.filter((item, index) => {
    return index % step === 0 || index === sortedData.length - 1;
  }).map((item, index) => {
    if (index < hours.length) {
      item.date = hours[index];
    }
    if (index < 5) {
      return item;
    }
  });
  return filteredData.slice(0, 5);
};
export const getFiveDayValuesBetweenStartAndEnd = (data) => {
  if (data.length <= 5) {
    return data; // Return all data if there are 5 or fewer data points
  }

  // Convert date strings to JavaScript Date objects and format as "DD Mon"
  const sortedData = [...data].map((item) => {
    const date = new Date(item.date + ' ' + item.year);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' })}`;
    return { ...item, date: formattedDate };
  });

  // Sort the data based on the date in descending order (latest date first)
  sortedData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Get the last date in the sorted data
  const lastDate = sortedData[0].date;

  const includedDays = new Set();
  const filteredData = sortedData.filter((item) => {
    const currentDate = item.date;
    const timeDifference = new Date(lastDate).getTime() - new Date(currentDate).getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysDifference >= 0 && daysDifference <= 3 && !includedDays.has(daysDifference)) {
      includedDays.add(daysDifference);
      return true;
    }

    return false;
  });

  return filteredData;
};

export const convertUnixTimestampToYear = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  return year;
};

/**
 * Creates a new date by adding days/weeks/months/years to a given date. Negative values will also work (for past dates)
 * @param {Date} date - The specified date
 * @param {number} days - The number (integer) of days to be added/subtracted
 * @param {number} weeks - The number (integer) of weeks to be added/subtracted
 * @param {number} months - The number (integer) of months to be added/subtracted
 * @param {number} years - The number (integer) of years to be added/subtracted
 * @returns {Date} The new date
 */
export const createDate = (date, days, weeks, months, years) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days + 7 * weeks);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
};
