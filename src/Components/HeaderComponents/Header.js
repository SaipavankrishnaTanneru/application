import React from 'react';
import LogoComponent from '../../Components/HeaderComponents/LogoComponent';
import SearchComponent from '../../Components/HeaderComponents/SearchComponent';
import UserInfoComponent from '../../Components/HeaderComponents/UserInfoComponent';
import '../../Components/HeaderComponents/header.css';

const Header = () => {
  return (
    <header className="top_header">
       <div className='logo-item'>
           <LogoComponent/>
       </div>
       <div className='left_header'>
          <SearchComponent/>
          <UserInfoComponent/>
       </div>
    </header>
  );
};

export default Header;
