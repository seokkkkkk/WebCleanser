import React, { useEffect, useState } from 'react';
import {
  Container,
  FilterContainer,
  FilterItemContainer,
  FilterSelectContainer,
  FishingContainer,
  Statistics,
  Switch,
  Toggle,
} from './Popup.styled';
import history from '../../assets/img/history.svg';
import Button from './Button';

const socialTypes = ['정치'];
const illegalTypes = ['음란', '폭력'];
const mentalTypes = ['우울'];

const Filtering = ({ onClick }) => {
  const [siteFilterOn, setSiteFilterOn] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState([]);

  useEffect(() => {
    chrome.storage.local.get(['siteFilterOn', 'selectedDetails'], (result) => {
      if (result.siteFilterOn !== undefined) {
        setSiteFilterOn(result.siteFilterOn);
      } else {
        chrome.storage.local.set({ siteFilterOn: true });
        setSiteFilterOn(true);
      }

      if (result.selectedDetails !== undefined) {
        setSelectedDetails(result.selectedDetails);
      }
    });
  }, []);

  const handleToggle = () => {
    const newValue = !siteFilterOn;
    setSiteFilterOn(newValue);
    chrome.storage.local.set({ siteFilterOn: newValue });
  };

  const handleDetailToggle = (detail) => {
    const updatedDetails = selectedDetails.includes(detail)
      ? selectedDetails.filter((d) => d !== detail)
      : [...selectedDetails, detail];
    setSelectedDetails(updatedDetails);
    chrome.storage.local.set({ selectedDetails: updatedDetails });

    chrome.runtime.sendMessage({
      action: 'updateSelectedDetails',
      selectedDetails: updatedDetails,
    });
  };

  return (
    <FilterSelectContainer>
      <Container>
        <FilterContainer>
          <p className="title-text">필터링</p>
          <div className="filter">
            <FilterItem
              title="사회적 유해"
              desc="혐오 발언과 정치적 선전 및 조작 검열"
              types={socialTypes}
              category="social"
              selectedDetails={selectedDetails}
              onToggleDetail={handleDetailToggle}
            />
            <FilterItem
              title="불법 및 위험"
              desc="법적으로 금지되거나 위험한 콘텐츠 검열"
              types={illegalTypes}
              category="illegal"
              selectedDetails={selectedDetails}
              onToggleDetail={handleDetailToggle}
            />
            <FilterItem
              title="정신적 위험"
              desc="정신 건강에 악영향을 미칠 수 있는 콘텐츠 검열"
              types={mentalTypes}
              category="mental"
              selectedDetails={selectedDetails}
              onToggleDetail={handleDetailToggle}
            />
          </div>
        </FilterContainer>
        <FishingContainer>
          <p>피싱 사이트 감지</p>
          <Switch $isOn={siteFilterOn} onClick={handleToggle}>
            <Toggle $isOn={siteFilterOn} />
          </Switch>
        </FishingContainer>
      </Container>
      <Statistics>
        <p>통계</p>
        <img src={history} alt="history" onClick={() => onClick()} />
      </Statistics>
    </FilterSelectContainer>
  );
};

const FilterItem = ({
  title,
  desc,
  types,
  category,
  selectedDetails,
  onToggleDetail,
}) => {
  return (
    <FilterItemContainer>
      <div className="item-header">
        <p className="title-text">{title}</p>
        <p className="sub-text">{desc}</p>
      </div>
      <div className="buttons">
        {types.map((type) => (
          <Button
            key={type}
            text={type}
            category={category}
            isClicked={selectedDetails.includes(type)}
            onClick={() => onToggleDetail(type)}
          />
        ))}
      </div>
    </FilterItemContainer>
  );
};

export default Filtering;
