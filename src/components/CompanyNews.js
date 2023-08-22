import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyNews = () => {
  const [newsData, setNewsData] = useState([]);

  const {symbol}=useParams()

  const getCurrentDate = () => {
    const now = new Date();
    const previousDay = new Date(now);
    previousDay.setDate(previousDay.getDate() - 1);
  
    const currentDate = now.toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const previousDate = previousDay.toISOString().split("T")[0]; // Get previous day's date in YYYY-MM-DD format
  
    return { previousDate, currentDate };
  };


  const fetchData = async () => {
    try {
      const { previousDate, currentDate } = getCurrentDate();
      const res = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${previousDate}&to=${currentDate}&token=cj9i7mpr01qmcldumi6gcj9i7mpr01qmcldumi70`);
      const data = await res.json();
      console.log('llll',data)
      setNewsData(data.splice(0, 10));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(newsData)

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Company News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsData.map((newsItem, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md shadow-md border border-gray-200"
          >
            <img
              src={newsItem.image}
              alt={newsItem.headline}
              className="mb-2 rounded-md"
            />
            <h2 className="text-lg font-semibold mb-2">{newsItem.headline}</h2>
            <p className="text-gray-600 mb-4">{newsItem.summary}</p>
            <a
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyNews;
