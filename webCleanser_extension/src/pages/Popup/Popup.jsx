import React, { useState } from 'react';
import './Popup.css';
import cancleIcon from '../../assets/img/cancle.svg';

import { Header } from './Popup.styled';
import Filtering from './Filtering';
import FilteredList from './FilteredList';
import MenuBar from './MenuBar';
import Fishing from './Fishing';

const Popup = () => {
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isFilteringVisible, setIsFilteringVisible] = useState(true);

  const handleMenuBarClick = (showFiltering) => {
    setIsFilteringVisible(showFiltering);
  };

  const handleClosePopup = () => {
    window.close();
  };

  return (
    <div className="App">
      <Header>
        <h1>WebCleanser</h1>
        <img src={cancleIcon} alt="Cancel" onClick={handleClosePopup} />
      </Header>
      {isHistoryVisible ? (
        <>
          <MenuBar
            isFiltering={isFilteringVisible}
            setIsFiltering={() => handleMenuBarClick(true)}
            setIsFishing={() => handleMenuBarClick(false)}
          />
          {isFilteringVisible ? <FilteredList /> : <Fishing />}
        </>
      ) : (
        <Filtering onClick={() => setIsHistoryVisible(true)} />
      )}
    </div>
  );
};

export default Popup;
