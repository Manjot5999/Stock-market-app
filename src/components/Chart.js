import React, { useContext, useEffect, useState } from 'react';
import ChartFilter from './ChartFilter';
import Card from './Card';
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip
} from 'recharts';
import ThemeContext from '../context/ThemeContext';
import { fetchData } from '../utils/api/stock-api';

import { chartConfig } from '../constants/config';
import { useParams } from 'react-router-dom';

const Chart = () => {
  const [filter, setFilter] = useState('1W');

  const { darkMode } = useContext(ThemeContext);

  const { symbol } = useParams();

  const [data, setData] = useState({
    dailyData: [],
    weeklyData: [],
    monthlyData: []
  });

  async function getData (params) {
    const res = await fetchData(params);
    
    let count = 0;
    const lastFiveEntries = [];
    const category = {
      '1D': '60min',
      '1W': 'Daily',
      '1M': 'Monthly'
    };
    const obj = filter === '1M' ? res['Monthly Time Series'] : res[`Time Series (${category[filter]})`];
    for (const key in obj) {
      if (count >= 5) {
        break; 
      }
      lastFiveEntries.push({
        date: filter === '1D' ? key.substring(11, 19) : key,
        value: obj[key]['4. close']
      });
      count++;
    }
    console.log('last five entries',lastFiveEntries)
   
    if (filter === '1D') {
      setData({
        dailyData: lastFiveEntries,
        monthlyData: [],
        weeklyData: []
      });
    } else if (filter === '1W') {
      setData({
        dailyData: [],
        monthlyData: [],
        weeklyData: lastFiveEntries
      });
    } else {
      setData({
        dailyData: [],
        monthlyData: lastFiveEntries,
        weeklyData: []
      });
    }
  }

  
  useEffect(() => {
    let params;
    if (filter === '1D') {
      params = {
        interval: '60min',
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        datatype: 'json',
        output_size: 'compact'
      };
      getData(params);
    } else if (filter === '1W') {
      params = {
        function: 'TIME_SERIES_DAILY',
        symbol,
        datatype: 'json'
      };
      getData(params);
    } else {
      params = {
        function: 'TIME_SERIES_MONTHLY',
        symbol,
        datatype: 'json'
      };
      getData(params);
    }
  }, [filter, symbol]);

  return (
    <Card>

      {/* Filters rendering logic */}
      <ul className='flex absolute top-2 right-2 z-40'>
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>


      {/* Graph rendering logic */}

      <ResponsiveContainer width='100%' height={400}>
        <AreaChart data={(filter === '1D' && data.dailyData) || (filter === '1W' && data.weeklyData) || (filter === '1M' && data.monthlyData)}>
          <defs>
            <linearGradient id='chartColor' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor={darkMode ? '#312e81' : 'rgb(199, 210, 254)'} stopOpacity={0.8} />
              <stop offset='95%' stopColor={darkMode ? '#312e81' : 'rgb(199, 210, 254)'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: '#111827', border: '1px solid #818cf8' } : null}
            itemStyle={darkMode ? { color: '#818cf8' } : null}
          />
          <Area
            type='monotone'
            dataKey='value'
            stroke='#312e81'
            fill='url(#chartColor)'
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <XAxis dataKey='date' tick={{ fontSize: 12 }} />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
            allowDataOverflow
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
