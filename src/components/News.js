import React, { useEffect, useState } from 'react';

const News = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default selected category

  const categories = ['Top News', 'Merger', 'Forex', 'Crypto'];

  const fetchData = async () => {
    const res = await fetch(`https://finnhub.io/api/v1/news?category=${selectedCategory}&token=cj9i7mpr01qmcldumi6gcj9i7mpr01qmcldumi70&minId=10`);
    const data = await res.json();

    let filteredNews = data;

    if (selectedCategory !== 'general') {
      filteredNews = data.filter((item) => {
        return item.category.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    setFilteredList(filteredNews.slice(0, 50));
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold mb-2'>News</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-400'
        >
          {categories.map((category) => (
            <option key={category.toLowerCase()} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {filteredList.map((item) => (
          <a key={item.id} href={item.url} target='_blank' rel='noopener noreferrer'>
            <div className='bg-white p-4 shadow-md rounded-lg h-full flex flex-col'>
              <img src={item.image} alt={item.summary} className='w-full h-auto rounded-md' />
              <p className='text-gray-600 mt-2 flex-grow'>{item.headline}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default News;
