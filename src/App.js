import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter and other components from react-router-dom
import './App.css';
import Dashboard from './components/Dashboard';
import News from './components/News'; // Import the News component
import StockContext from './context/StockContext';
import ThemeContext from './context/ThemeContext';
import LoginForm from './components/Login';
import Register from './components/Register';
import { UserAuthContextProvider } from './context/UserAuthContext';
import StockList from './components/StockList';

function App () {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState('');

  return (
    <UserAuthContextProvider>

    <Router>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
          <Routes>
            {/* Define your routes */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<Register />} />
            <Route path='/news' element={<News />} />
            <Route path='/list' element={<StockList />} />
          </Routes>
        </StockContext.Provider>
      </ThemeContext.Provider>
    </Router>
    </UserAuthContextProvider>
  );
}

export default App;
