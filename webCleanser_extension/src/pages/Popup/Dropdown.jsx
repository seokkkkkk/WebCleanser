import React, { useState } from 'react';
import styled from 'styled-components';
import icon from '../../assets/img/dropdown.svg';

const Dropdown = ({ onSelect }) => {
  const options = ['최신순', '오래된순'];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // 선택된 옵션을 부모 컴포넌트에 전달
  };

  return (
    <DropdownContainer>
      <Label onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <Icon src={icon} alt="아이콘" />
      </Label>
      <OptionList className={isOpen ? 'open' : ''}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleSelect(option)}>
            {option}
          </Option>
        ))}
      </OptionList>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  cursor: pointer;
  font-size: 11px;
  color: #616161;
  padding: 5px 0;
  position: relative;
`;

const Label = styled.div`
  width: 68px;
  background-color: #ffffff;
  border: none;
  text-align: left;
  padding: 10px 5px;
  margin: auto;
  display: flex;
  border-radius: 10px;
`;

const OptionList = styled.ul`
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  background-color: white;
  border: none;
  border-radius: 10px;
  width: 68px;
  box-shadow: 0px 0px 8px 0.1px #bdbdbd;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateY(-10px);
  transition: transform 0.05s ease;

  &.open {
    max-height: 200px;
    opacity: 1;
    transform: translateY(0);
  }
`;

const Option = styled.li`
  padding: 10px;
  cursor: pointer;
  color: #b8b8b8;

  &:hover {
    border-radius: 10px;
    color: #616161;
  }
`;

const Icon = styled.img`
  padding: 0 5px;
  height: 8px;
  width: auto;
  margin: auto;
`;
