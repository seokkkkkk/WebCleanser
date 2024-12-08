import React from 'react';
import styled from 'styled-components';
import example from '../../assets/img/example.png';

const CommentItem = ({ status, time, comment, title, link, img }) => {
  const convertTime = (time) => {
    const currentTime = new Date();
    const commentTime = new Date(time);
    const diff = currentTime - commentTime;
    const sec = Math.floor(diff / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (day > 0) {
      return `${day}일 전`;
    }
    if (hour > 0) {
      return `${hour}시간 전`;
    }
    if (min > 0) {
      return `${min}분 전`;
    }
    return `${sec}초 전`;
  };
  return (
    <CommentContainer>
      <div className="header">
        {status === 'new' && (
          <div className="status">
            <p>{status}</p>
          </div>
        )}
        <p className="time">{convertTime(time)}</p>
        <p className="dot">·</p>
        <p className="type">댓글</p>
      </div>
      <div className="comment">
        <p>{comment}</p>
      </div>
      <SiteInfo>
        <img src={img ? img : example} alt="favicon" />
        <div>
          <p className="title">{title}</p>
          <p>{link}</p>
        </div>
      </SiteInfo>
    </CommentContainer>
  );
};

const SiteInfo = styled.div`
  background-color: #f0f0f0;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
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
    p {
      font-size: 12px;
      color: #8d8d8d;
      font-weight: 500;
      max-width: 300px;
    }
    .title {
      font-size: 15px;
    }
  }
`;

const CommentContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 375px;
  min-height: 143px;
  padding: 14px 10px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .comment {
    margin-left: 8px;
    p {
      font-size: 15px;
      color: #4b4b4b;
      font-weight: 600;
      line-height: 150%;
      max-width: 380px;
    }
  }

  .header {
    margin-top: 2px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    .status {
      background-color: #2273ff;
      border-radius: 6.39px;
      color: white;
      height: 25.62px;
      padding: 0 6.31px;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 12.5px;
        line-height: 120%;
        font-weight: 600;
        text-align: center;
        margin-top: -3px;
      }
    }
    .time {
      font-size: 12px;
      color: #2273ff;
      margin-left: 11px;
      font-weight: 400;
    }
    .dot {
      margin: 0 5px;
      font-size: 10px;
      font-weight: 400;
    }
    .type {
      font-size: 12px;
      color: #4b4b4b;
      font-weight: 400;
    }
  }
`;

export default CommentItem;
