import React from 'react';
import searchIcon from '../../assets/Vector.svg';
import './header.css';

const SearchComponent = () => {
  return (
    <div className="navsearch_item search_component">
      <div className="tophead_searchflex">
        <img src={searchIcon} alt="search icon" className="search_icon" />
        <input
          type="text"
          className="sc_topheader_input"
          placeholder="Ask for anything"
        />
      </div>
    </div>
  );
};

export default SearchComponent;
