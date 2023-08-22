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
import HomeScreen from './components/HomeScreen';
import { Provider } from 'react-redux';
import store from './components/store';
import WatchList from './components/WatchList';
import CompanyNews from './components/CompanyNews';
import ProtectedRoute from './components/ProtectedRoute';

function App () {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState('');

  return (
    <Provider store={store}>

    <UserAuthContextProvider>

    <Router>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
          <Routes>
            <Route path='/' element={<HomeScreen />}>
              <Route path='/' element={<StockList />} />
              <Route path='/news' element={<News />} />
              <Route path='/:symbol' element={<Dashboard />} />
              <Route path='/news/:symbol' element={<CompanyNews />} />
              <Route path='/watchlist' element={<ProtectedRoute><WatchList /></ProtectedRoute>} />
            </Route>
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<Register />} />
            {/* Define your routes */}
          </Routes>
        </StockContext.Provider>
      </ThemeContext.Provider>
    </Router>
    </UserAuthContextProvider>
    </Provider>
  );
}

export default App;
