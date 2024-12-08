import React from 'react';
import styled from 'styled-components';
import check from '../../assets/img/check.svg';

const Category = ({ text }) => {
  return (
    <Container>
      <img src={check} alt="check" />
      <p>{text}</p>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6.31px;
  padding-right: 8.31px;
  border-radius: 6.39px;
  gap: 6.31px;
  background-color: #ec221f;
  height: 25.52px;
  color: #f5f5f5;
  font-size: 13px;
  font-weight: 600;
`;
