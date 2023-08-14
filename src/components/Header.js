import React from 'react';
import Search from './Search';
import ThemeIcon from './ThemeIcon';
import { Link } from 'react-router-dom';

const Header = ({ name, logo }) => {
  return (
    <div className='flex flex-col items-center xl:flex-row xl:items-center justify-between xl:px-32'>
      <div className='flex items-center mb-4 xl:mb-0 xl:mr-4'>
        <img src={logo} alt={name} className='w-12 h-12 mr-4' />
        <h1 className='text-5xl'>{name}</h1>
      </div>
      <div className='flex items-center space-x-4'>
        <Search />
        <Link to='/news' className='text-indigo-600 hover:text-indigo-800'>
          Financial News around the World
        </Link>
        <ThemeIcon />
      </div>
    </div>
  );
};

export default Header;
