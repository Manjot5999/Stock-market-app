import { useEffect, useState } from "react";
import classNames from "classnames";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getActiveNameFromCSV } from "../utils/helpers/csv-helper";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import StockCarousel from "./Carousel";
import { useDispatch } from "react-redux";
import { fetchAndInitializeState } from "./wishlistSlice";
import ShimmerTable from "./Shimmer";
import ShimmerCarousel from "./ShimmerCarousel";
import Info from "./Info";


const StockList = () => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const dispatch=useDispatch()
  const [date, setDate] = useState("");
  const [mostActivelyTraded, setMostActivelyTraded] = useState([]);
  const [activePageTopGainers, setActivePageTopGainers] = useState(1);
  const [activePageTopLosers, setActivePageTopLosers] = useState(1);
  const itemsPerPage = 5;

  useEffect(()=>{
    dispatch(fetchAndInitializeState())
  },[dispatch])


  const fetchData = async () => {


    const TopGainersWithNames = [];
    const MostActivelyTradedWithNames = [];
    const TopLosersWithNames = [];


    try {
      const res = await fetch(
        "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=LD66HKCHONZVJZTR"
      );
      const apiData = await res.json();
      setDate(apiData["last_updated"]);

      for (const item of apiData["top_gainers"]) {
        const name = await getActiveNameFromCSV(item.ticker);
        TopGainersWithNames.push({
          ...item,
          name: name,
        });
      }

      for (const item of apiData["most_actively_traded"]) {
        const name = await getActiveNameFromCSV(item.ticker);
        MostActivelyTradedWithNames.push({
          ...item,
          name: name,
        });
      }

      for (const item of apiData["top_losers"]) {
        const name = await getActiveNameFromCSV(item.ticker);
        TopLosersWithNames.push({
          ...item,
          name: name,
        });
      }

      setTopGainers(TopGainersWithNames);
      setTopLosers(TopLosersWithNames)
      setMostActivelyTraded(MostActivelyTradedWithNames);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = (title, data, activePage, setActivePage) => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    
    return (
      <div className=" text-center p-6">
        <div className="overflow-x-auto">
        <h1 className="text-2xl font-semibold mb-4">{title} for {date.substr(0,10)}</h1>
        <table className="w-full border-collapse text-black">
            <thead className="bg-indigo-600">
              <tr>
                <th className="px-4 py-2 text-left text-white">Name / Symbol</th>
                <th className="px-4 py-2 text-left text-white">Price</th>
                <th className="px-4 py-2 text-left text-white">Change Amount</th>
                <th className="px-4 py-2 text-left text-white">Change Percentage</th>
                <th className="px-4 py-2 text-left text-white">Volume</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((item, index) => (
                <tr
                  key={index}
                  className={(index % 2 === 0) ? "bg-gray-100" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 text-left">
                    {item.name} ({item.ticker})
                  </td>
                  <td className="px-4 py-2 text-left">${item.price}</td>
                  <td
                    className={classNames("px-4 py-2", {
                      "text-green-500": item.change_amount >= 0,
                      "text-red-500": item.change_amount < 0,
                    })}
                  >
                    ${item.change_amount}
                    {item.change_amount >= 0 ? (
                      <i className="ml-1 fas fa-arrow-up"></i>
                    ) : (
                      <i className="ml-1 fas fa-arrow-down"></i>
                    )}
                  </td>
                  <td className="px-4 py-2 text-left">{item.change_percentage}</td>
                  <td className="px-4 py-2 text-left">{item.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        className={classNames("px-2 mx-4 rounded-full", {  // Add 'rounded-full' class for circular buttons
          "bg-indigo-500 text-white": pageNumber === activePage,
          "bg-gray-300 text-gray-800": pageNumber !== activePage,
        })}
        style={{ margin: "0.25rem" }}  // Add margin for spacing between buttons
        onClick={() => setActivePage(pageNumber)}
      >
        {pageNumber}
      </button>
    ))}
        </div>
      </div>
    );
  
  };

  return (
    <>

    <Info />

      <div id='content-section'>

      {
        mostActivelyTraded.length===0 ? (
          <ShimmerCarousel /> 
        ) :(

          <StockCarousel stockData={mostActivelyTraded} date={date}/>
        )
      }
        {topGainers.length === 0 ? (
          <ShimmerTable/> // Display shimmer while data is loading
        ) : (
          renderTable("Top Gainers", topGainers, activePageTopGainers, setActivePageTopGainers)
        )}
        {topLosers.length === 0 ? (
          <ShimmerTable /> // Display shimmer while data is loading
        ) : (
          renderTable("Top Losers", topLosers, activePageTopLosers, setActivePageTopLosers)
        )}
      </div>

    </>
  );
};

export default StockList;