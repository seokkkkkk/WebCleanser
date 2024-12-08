import React from 'react';
import alert from '../../assets/img/alert.svg';
import background from '../../assets/img/background.svg';
import styled from 'styled-components';

const Blocked = () => {
  const queryParams = new URLSearchParams(window.location.search);
  let url = queryParams.get('url');
  const threatType = queryParams.get('threatType');

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }

  const getThreatDescription = (type) => {
    switch (type) {
      case 'MALWARE':
        return (
          <>
            해당 사이트는 악성 소프트웨어를 설치할 가능성이 있는 것으로
            판단되었습니다.
            <br />
            {url}의 공격자가 사용자 기기에 바이러스나 기타 유해한 소프트웨어를
            설치할 수 있습니다.
          </>
        );
      case 'SOCIAL_ENGINEERING':
        return (
          <>
            해당 사이트는 소셜 엔지니어링 공격을 시도할 가능성이 있는 것으로
            판단되었습니다.
            <br />
            {url}의 공격자가 사용자를 속여 개인정보를 유출하도록 유도할 수
            있습니다.
          </>
        );
      case 'UNWANTED_SOFTWARE':
        return (
          <>
            해당 사이트는 원치 않는 소프트웨어를 설치할 가능성이 있는 것으로
            판단되었습니다.
            <br />
            {url}에서 제공하는 소프트웨어가 원하지 않는 동작을 수행할 수
            있습니다.
          </>
        );
      case 'POTENTIALLY_HARMFUL_APPLICATION':
        return (
          <>
            해당 사이트는 잠재적으로 위험한 애플리케이션을 제공할 가능성이 있는
            것으로 판단되었습니다.
            <br />
            {url}에서 제공하는 애플리케이션이 사용자의 기기에 해를 끼칠 수
            있습니다.
          </>
        );
      default:
        return (
          <>
            해당 사이트에서 알 수 없는 잠재적인 위험이 감지되었습니다.
            <br />
            {url}의 공격자가 소프트웨어를 설치하거나 개인정보를 유출하도록
            유도할 수 있습니다.
          </>
        );
    }
  };

  const getThreatTypeInKorean = (type) => {
    switch (type) {
      case 'MALWARE':
        return '악성 소프트웨어';
      case 'SOCIAL_ENGINEERING':
        return '소셜 엔지니어링';
      case 'UNWANTED_SOFTWARE':
        return '원치 않는 소프트웨어';
      case 'POTENTIALLY_HARMFUL_APPLICATION':
        return '잠재적으로 위험한 애플리케이션';
      default:
        return '알 수 없는 위험';
    }
  };
  return (
    <Alert>
      <Background
        src={background}
        className="App-background"
        alt="background"
      />
      <Wrapper>
        <img src={alert} className="App-logo" alt="logo" />
        <div>
          <p className="title-text">경고</p>
          <p className="sub-text">
            해당 사이트는 사용자에게 잠재적 위험이 있을 가능성이 있습니다.
            <br />
            <p className="threat">
              위험 유형: {getThreatTypeInKorean(threatType)}
            </p>
          </p>
          <p className="desc-text">
            {getThreatDescription(threatType)} <br />
            <p className="google">
              Google은 안전하지 않은 웹 리소스에 관한 가장 정확한 최신 정보를
              제공하기 위해 노력하고 있습니다. <br /> 하지만 Google은 사이트의
              포괄적이고 오류가 없다고 보장할 수 없습니다. <br />
              일부 위험한 사이트는 식별되지 않을 수 있으며, 일부 안전한 사이트는
              잘못 식별될 수 있습니다.
              <br />
              자세한 내용을 확인하려면{' '}
              <a
                href="https://developers.google.com/search/docs/monitor-debug/security/social-engineering"
                target="_blank"
                rel="noopener noreferrer"
              >
                여기를 클릭
              </a>
              하십시오.
            </p>
          </p>
        </div>
      </Wrapper>
      <Footer>
        <p
          onClick={() => {
            window.open(
              'https://safebrowsing.google.com/safebrowsing/report_error/?hl=ko',
              '_blank'
            );
          }}
        >
          잘못 차단된 사이트 신고
        </p>
        <div>
          <button
            onClick={() => {
              window.location.href = url;
            }}
          >
            무시하기
          </button>
          <button
            className="back"
            onClick={() => {
              window.history.back();
            }}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </Footer>
    </Alert>
  );
};

export default Blocked;

const Alert = styled.div`
  position: relative;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 60px;

  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: space-around;

  p {
    font-size: 20px;
    font-weight: 400;
    color: #edf4ff;
    cursor: pointer;
  }

  div {
    display: flex;
    gap: 18px;
    button {
      border: none;
      border-radius: 15px;
      height: 49px;
      padding: 0 30px;
      padding-top: 4px;
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
      color: #2273ff;
      background-color: #b3d0ff;
    }
    .back {
      color: white;
      background-color: #2273ff;
    }
  }
`;

const Background = styled.img`
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  z-index: -1;
  object-fit: cover;
`;

const Wrapper = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: white;

  .title-text {
    font-size: 60px;
    font-weight: bold;
    margin: 0;
  }

  .sub-text {
    font-size: 28px;
    font-weight: medium;
    .threat {
      font-size: 22px;
    }
  }

  .desc-text {
    font-size: 18px;
    font-weight: light;
    line-height: 1.7;
  }

  .google {
    font-size: 12px;
    // 링크 색상 조금 연하게
    a {
      color: #b3d0ff;
    }
  }
`;
