import React, { useEffect, useState } from "react";
import Pagination from "./Pagination"; // Import the pagination component

export default function StockList() {
  const [data, setData] = useState({
    topGainers: [],
    topLosers: [],
    activelyTraded: [],
  });

  const [currentPage, setCurrentPage] = useState({
    topGainers: 1,
    topLosers: 1,
    activelyTraded: 1,
  });

  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=DX3744UOTZI0MZZ9"
      );
      const apiData = await res.json();
      setData({
        topGainers: apiData["top_gainers"],
        topLosers: apiData["top_losers"],
        activelyTraded: apiData["most_actively_traded"],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStockTable = (title, stocks, tableKey) => {
    const startIndex = (currentPage[tableKey] - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStocks = stocks.slice(startIndex, endIndex);

    return (
      <div className="mb-8 border rounded p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-1/6 px-4 py-2">Ticker</th>
                <th className="w-1/6 px-4 py-2">Price</th>
                <th className="w-1/6 px-4 py-2">Change Amount</th>
                <th className="w-1/6 px-4 py-2">Change Percentage</th>
                <th className="w-1/6 px-4 py-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {currentStocks.map((stock, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{stock.ticker}</td>
                  <td className="px-4 py-2">{stock.price}</td>
                  <td className="px-4 py-2">{stock.change_amount}</td>
                  <td className="px-4 py-2">{stock.change_percentage}</td>
                  <td className="px-4 py-2">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage[tableKey]}
          totalPages={Math.ceil(stocks.length / itemsPerPage)}
          onPageChange={(page) => handlePageChange(page, tableKey)}
        />
      </div>
    );
  };

  const handlePageChange = (page, tableKey) => {
    setCurrentPage((prev) => ({
      ...prev,
      [tableKey]: page,
    }));
  };

  return (
    <div className="bg-gray-900 text-white text-center p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Cryptocurrency Prices by Market Cap
      </h1>
      <div className="flex flex-wrap space-x-4">
        <div className="w-full md:w-1/3 mb-4">
          {data.topGainers &&
            renderStockTable("Top Gainers", data.topGainers, "topGainers")}
        </div>
        <div className="w-full md:w-1/3 mb-4">
          {data.topLosers &&
            renderStockTable("Top Losers", data.topLosers, "topLosers")}
        </div>
        <div className="w-full md:w-1/3 mb-4">
          {data.activelyTraded &&
            renderStockTable("Actively Traded", data.activelyTraded, "activelyTraded")}
        </div>
      </div>
    </div>
  );
}
