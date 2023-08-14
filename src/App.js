import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and other components from react-router-dom
import './App.css';
import Dashboard from './components/Dashboard';
import News from './components/News'; // Import the News component
import StockContext from './context/StockContext';
import ThemeContext from './context/ThemeContext';
import StockTable from './components/StockList';

function App () {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState('MSFT');

  return (
    <Router>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
          <Routes>
            {/* Define your routes */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/news' element={<News />} />
            <Route path='/list' element={<StockTable />} />
          </Routes>
        </StockContext.Provider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
