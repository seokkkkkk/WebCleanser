import React from 'react';
import styled from 'styled-components';

const MenuBar = ({ isFiltering, setIsFiltering, setIsFishing }) => {
  return (
    <MenuContainer>
      <MenuItem
        className={isFiltering ? 'selected' : ''}
        onClick={() => {
          setIsFiltering();
        }}
      >
        <p>필터링</p>
      </MenuItem>
      <MenuItem
        className={isFiltering ? '' : 'selected'}
        onClick={() => {
          setIsFishing();
        }}
      >
        <p>피싱 사이트 감지</p>
      </MenuItem>
      <Slider active={isFiltering} />
    </MenuContainer>
  );
};

export default MenuBar;

const MenuContainer = styled.div`
  position: relative;
  margin: 0 11px;
  border-radius: 19px;
  background-color: #f8f8f8;
  height: 42px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const MenuItem = styled.div`
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  width: 214px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  height: 32px;
  position: relative;
  z-index: 1;
  color: #4b4b4b;
  transition: color 0.3s ease;

  &.selected {
    color: white;
  }
`;

const Slider = styled.div`
  position: absolute;
  width: 50%;
  height: 32px;
  background-color: #2273ff;
  border-radius: 16px;
  top: 5px;
  left: ${({ active }) => (active ? '4px' : 'calc(50% + -4px)')};
  transition: left 0.3s ease;
`;
