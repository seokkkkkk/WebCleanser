import styled from 'styled-components';

export const FilterSelectContainer = styled.div``;

export const Statistics = styled.div`
  height: 69px;
  background-color: #f8f8f8;
  margin: 0px 11px;
  border-radius: 25px;
  margin-top: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
  padding-right: 22px;

  p {
    font-size: 15px;
    font-weight: 600;
    color: #4b4b4b;
  }
  img {
    cursor: pointer;
  }
`;

export const Header = styled.header`
  margin-top: 26px;
  margin-bottom: 22px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    color: #2273ff;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }

  img {
    position: absolute;
    right: 27px;
    top: 4px;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  background-color: #b3d0ff;
  margin: 0px 11px;
  border-radius: 25px;
  height: 438px;
`;

export const FilterContainer = styled.div`
  background-color: #dae8ff;
  border-radius: 25px;
  padding: 0px 41px;
  padding-top: 26px;
  padding-bottom: 44px;
  display: flex;
  flex-direction: column;
  align-items: start;

  .title-text {
    font-size: 15px;
    font-weight: 600;
    color: #2273ff;
    margin-bottom: 30px;
  }

  .filter {
    display: flex;
    flex-direction: column;
    gap: 37px;
  }
`;

export const FishingContainer = styled.div`
  display: flex;
  height: 75px;
  justify-content: space-between;
  align-items: center;
  padding-left: 28px;
  padding-right: 33px;
  p {
    font-size: 15px;
    font-weight: 600;
    color: #2273ff;
  }
`;

export const Switch = styled.div`
  width: 55px;
  height: 25.83px;
  background-color: ${(props) => (props.$isOn ? '#2273FF' : '#F8F8F8')};
  border-radius: 30px;
  position: relative;
  transition: background-color 0.3s;
  cursor: pointer;
`;

export const Toggle = styled.div`
  width: 22.5px;
  height: 22.5px;
  background-color: #ffffff;
  filter: drop-shadow(0px 0px 1.5px #c7c7c7);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 2.5px;
  transform: ${(props) =>
    props.$isOn ? 'translate(28px, -50%)' : 'translateY(-50%)'};
  transition: transform 0.3s;
`;

export const FilterItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .item-header {
    display: flex;
    align-items: baseline;
    gap: 15px;
    .title-text {
      font-size: 15px;
      font-weight: 500;
      color: #4b4b4b;
      margin: 0px;
    }
    .sub-text {
      font-size: 11px;
      font-weight: 400;
      color: #4b4b4b;
    }
  }
  .buttons {
    display: flex;
    gap: 10px;
  }
`;

export const StyledButton = styled.button`
  border-radius: 10px;
  border: none;
  color: #9c9c9c;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  padding: 0px 18px;
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &.social {
    color: #cc13ff;
    background-color: #f5cfff;
  }
  &.illegal {
    color: #ff485d;
    background-color: #ffd2d7;
  }
  &.mental {
    color: #00bb8f;
    background-color: #aaf2e1;
  }
  &.total {
    color: white;
    background-color: #2273ff;
  }
  &:hover {
    transform: scale(0.95);
  }
`;
