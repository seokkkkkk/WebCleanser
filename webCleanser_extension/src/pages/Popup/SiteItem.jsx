import React from 'react';
import styled from 'styled-components';
import Category from './Category';

const SiteItem = ({ site, onClick }) => {
  return (
    <LinkItem onClick={onClick}>
      <div className="site-info">
        <img src={site.favicon} alt="favicon" />
        <div>
          <p className="title-text">{site.title}</p>
          <p className="url-text">{site.url}</p>
        </div>
      </div>
      <div className="category">
        {site.categories && site.categories.length > 0 ? (
          site.categories.map((category, index) => (
            <Category key={index} text={category} />
          ))
        ) : (
          <p className="no-category">카테고리 없음</p>
        )}
      </div>
    </LinkItem>
  );
};

export default SiteItem;

const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  background-color: white;
  border-radius: 15px;
  padding: 0 11px;
  padding-top: 14px;
  padding-bottom: 16.38px;
  cursor: pointer;

  .site-info {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #f0f0f0;
    padding: 10px 16px;
    border-radius: 15px;

    img {
      width: 38px;
      height: 38px;
      border-radius: 30px;
      object-fit: cover;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .title-text {
        font-size: 15px;
        font-weight: bold;
        color: #4b4b4b;
      }

      .url-text {
        font-size: 12px;
        color: #4b4b4b;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 250px;
      }

      .visit-time,
      .risk-info {
        font-size: 10px;
        color: #757575;
      }
    }

    transition: transform 0.2s ease;

    &:hover {
      transform: scale(0.98);
    }
  }

  .category {
    display: flex;
    gap: 6.31px;

    .no-category {
      font-size: 10px;
      color: #757575;
    }
  }
`;
