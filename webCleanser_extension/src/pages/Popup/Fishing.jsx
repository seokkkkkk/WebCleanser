import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import cancle from '../../assets/img/cancle.svg';
import cancle_small from '../../assets/img/cancle_small.svg';
import back from '../../assets/img/back.svg';
import Dropdown from './Dropdown';
import SiteItem from './SiteItem';

const Fishing = () => {
  const [isWarning, setIsWarning] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [siteData, setSiteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      chrome.storage.local.get(null, (items) => {
        const sites = Object.values(items).filter((item) => item && item.url);
        setSiteData(sites);
        setIsLoading(false);
      });
    };

    loadData();

    const handleStorageChange = (changes, areaName) => {
      if (areaName === 'local') {
        loadData();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get(['siteFilterOn'], (result) => {
      const filterOn =
        result.siteFilterOn !== undefined ? result.siteFilterOn : true;
      setIsWarning(!filterOn);
    });
  }, []);

  const handleSiteClick = (site) => {
    setSelectedSite(site);
    setIsDetail(true);
  };

  const handleSortChange = (option) => {
    const sortedSites = [...siteData];
    if (option === '최신순') {
      sortedSites.sort((a, b) => new Date(b.visitTime) - new Date(a.visitTime));
    } else if (option === '오래된순') {
      sortedSites.sort((a, b) => new Date(a.visitTime) - new Date(b.visitTime));
    }
    setSiteData(sortedSites);
  };

  if (isLoading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return isDetail ? (
    <Detail>
      <div className="header">
        <img src={back} alt="back" onClick={() => setIsDetail(false)} />
        <p>사이트 상세 요약</p>
        <img
          src={cancle}
          alt="cancle"
          onClick={() => {
            window.close();
          }}
        />
      </div>
      <div className="body">
        {selectedSite && (
          <>
            <SiteInfo>
              <img src={selectedSite.favicon} alt="favicon" />
              <div className="site-text">
                <p className="title-text">{selectedSite.title}</p>
                <p>{selectedSite.url}</p>
              </div>
            </SiteInfo>
            <SiteDetail>
              <div>
                <p className="title-text">방문 시간</p>
                <p className="sub-text">{selectedSite.visitTime}</p>
              </div>
              <div>
                <p className="title-text">위험 가능성</p>
                <p className="sub-text">{selectedSite.riskInfo}</p>
              </div>
              <div>
                <p className="title-text">페이지 주요 정보</p>
                <ul className="sub-text line-height">
                  {selectedSite.siteDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </SiteDetail>
          </>
        )}
      </div>
    </Detail>
  ) : (
    <Container>
      {isWarning && (
        <Warning>
          <p className="title-text">피싱사이트 차단이 현재 꺼져있습니다.</p>
          <p>개인정보 보호를 위해 피싱사이트 차단 활성화를 추천합니다.</p>
          <img
            src={cancle_small}
            alt="cancle"
            onClick={() => setIsWarning(false)}
            width={8}
            height={8}
          />
        </Warning>
      )}
      <Dropdown onSelect={handleSortChange} />
      <ListContainer>
        {siteData.length > 0 ? (
          siteData.map((site) => (
            <SiteItem
              key={site.url}
              site={site}
              onClick={() => handleSiteClick(site)}
            />
          ))
        ) : (
          <EmptyMessage>저장된 사이트 데이터가 없습니다.</EmptyMessage>
        )}
      </ListContainer>
    </Container>
  );
};

export default Fishing;

// Styled Components
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: #4b4b4b;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #757575;
  font-size: 14px;
  margin-top: 50px;
`;

const SiteDetail = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  font-size: 12.62px;
  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 350px;
  }
  .title-text {
    font-weight: 600;
    color: #4b4b4b;
  }
  .sub-text {
    font-weight: 400;
    color: #757575;
  }
  .line-height {
    line-height: 1.5;
  }
  ul {
    list-style-type: none;
    margin-left: 8px;
    padding: 0;
  }

  ul li {
    position: relative;
    padding-left: 15px;
  }

  ul li::before {
    content: '•';
    position: absolute;
    left: 0;
  }
`;

const SiteInfo = styled.div`
  background-color: #f0f0f0;
  border-radius: 24px;
  padding: 20px 37px;
  display: flex;
  align-items: center;
  gap: 15.28px;

  img {
    width: 37.6px;
    height: 37.6px;
    border-radius: 30px;
    object-fit: cover;
  }

  .site-text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    font-size: 11.75px;
    font-weight: 500;
    color: #616161;

    .title-text {
      font-size: 17.63px;
      color: #2d2d2d;
    }

    p {
      max-width: 240px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

const Detail = styled.div`
  position: absolute;
  background-color: white;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .header {
    display: flex;
    align-items: center;
    width: calc(100% - 46px);
    justify-content: space-between;
    margin: 13px 23px;
    margin-bottom: 33px;

    p {
      font-size: 15px;
      font-weight: 600;
      color: #4b4b4b;
    }

    img {
      cursor: pointer;
    }
  }

  .body {
    background-color: #f8f8f8;
    margin: 0 11px;
    border-radius: 24px;
    height: 480px;
    overflow-y: auto;
    padding: 20px;
  }
`;

const ListContainer = styled.div`
  background-color: #f8f8f8;
  width: 394px;
  border-radius: 25px;
  overflow-y: scroll;
  height: calc(100% - 34px);
  padding: 17px;

  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const Container = styled.div`
  margin: 0px 11px;
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 471px;
`;

const Warning = styled.div`
  background-color: #ffd2d7;
  border-radius: 15px;
  height: 74px;
  width: 352px;
  padding: 0 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  position: relative;
  margin-top: 13px;

  p {
    font-size: 11px;
    color: #4b4b4b;
    font-weight: 400;
  }
  .title-text {
    font-size: 15px;
    font-weight: 600;
  }
  img {
    position: absolute;
    right: 14px;
    top: 13px;
    cursor: pointer;
  }
`;
