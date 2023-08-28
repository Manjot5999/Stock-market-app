import React from 'react';

const Info = () => {
  const imageUrl = 'https://images.livemint.com/img/2023/02/10/1600x900/Stock_market_news_1675988415033_1675988415210_1675988415210.jpg';

  const handleScrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    contentSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto text-left px-8 py-32 relative z-10">
        <h1 className="text-4xl font-semibold text-white mb-4">
          Welcome to Stock Market Insights
        </h1>
        <p className="text-lg text-white mb-8">
          Your gateway to informed investing and market success.Explore the stock market's pulse with Stock Market Insights – track most active stocks, discover top gainers and losers, and effortlessly manage your personalized watchlist for daily email updates.
        </p>
        <button
          className="bg-indigo-500 text-gray-800 py-2 px-6 rounded-full hover:bg-yellow-400 transition duration-300"
          onClick={handleScrollToContent}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Info;
