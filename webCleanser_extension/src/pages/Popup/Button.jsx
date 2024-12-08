import React from 'react';
import { StyledButton } from './Popup.styled';

const Button = ({ text, category, isClicked, onClick }) => {
  return (
    <StyledButton className={isClicked ? category : ''} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
