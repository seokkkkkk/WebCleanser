# WebCleanser

**Languages**:  
[한국어](README.md) | [English](README_ENG.md)

![Group 132](https://github.com/user-attachments/assets/f34ac16c-8ce9-4c59-bd72-44b615726a01)

## 데모 영상
[![YouTube Video](https://img.youtube.com/vi/A-pnCqE67OE/0.jpg)](https://www.youtube.com/watch?v=A-pnCqE67OE)

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [세부 개발 내용](#세부-개발-내용)
3. [시스템 구성 및 아키텍처](#시스템-구성-및-아키텍처)
4. [유저 흐름도](#유저-흐름도)
5. [기능 명세](#기능-명세)
6. [실행 방법 및 테스트 환경](#실행-방법-및-테스트-환경)

---

## <a id="프로젝트-소개"></a> 1. 프로젝트 소개

**WebCleanser**는 인터넷 환경에서 발생할 수 있는 다양한 위험 요소로부터 사용자를 보호하여, 모두가 안전하게 웹을 사용할 수 있는 환경을 구축하기 위해 기획된 **웹 콘텐츠 필터링 익스텐션**입니다.

WebCleanser는 Chromium을 기반으로 하는 대부분의 브라우저( Chrome, Microsoft Edge, Brave, Arc, 네이버 웨일 등 )에서 호환가능하며 오픈소스 소프트웨어 프로젝트로 개발되어, 언어 기반 커스텀 및 기능 추가의 확장성이 열려있습니다.

### 개발 배경 및 필요성

인터넷 기술의 발전으로 방대한 콘텐츠가 인터넷에 공유되고 있으며, 그 부작용으로 피싱, 해킹, 유해 콘텐츠 등 다양한 위협이 증가하면서 디지털 격차가 심해지고 있습니다. 디지털 환경에 익숙하지 않은 사용자들은 이러한 위험에 더 쉽게 노출되고 있습니다.

WebCleanser는 이러한 위험으로부터 사용자를 보호 및 안전한 인터넷 환경 제공을 목표로 하는 오픈소스 소프트웨어 개발 프로젝트입니다.

누구나 쉽게 사용할 수 있도록 직관적으로 기능을 제공하여 디지털 격차를 줄이고, 사용자들이 사이버 위협으로부터 자유롭게 인터넷을 이용할 수 있도록 지원하는 것을 목표로 합니다.

이를 통해 디지털 기술에 익숙하지 않은 사용자들도 안심하고 인터넷을 사용할 수 있는 환경을 구축할 것입니다.

### 주요 기능 및 작동 과정

![5 주요 기능 및 작동 과정 url 필터링](https://github.com/user-attachments/assets/b46e5816-2cff-46c7-9fe5-e57f6a7130ad)


1. **URL 필터링:**
    - 사용자가 이동하는 링크를 감지하여, **Google Safe Browsing API**를 활용해 URL의 안정성을 검증합니다. 피싱 사이트나 의심스러운 사이트는 차단하고, 안전한 경우에만 페이지로 이동합니다.
    - **잘못 차단된 사이트 신고 기능**을 통해, 사용자가 차단 오류를 Google에 신고하여 개선에 기여할 수 있습니다.

![7 주요 기능 및 작동 과정 댓글 필터링](https://github.com/user-attachments/assets/2a226d8d-e0bd-419f-a52b-bcb09cc2316d)


1. **댓글 필터링:**
    - **네이버 뉴스**와 **유튜브** 댓글을 분석하여, **AI 기반 필터링**을 통해 유해한 댓글을 차단합니다.
    - 오픈 소스로 공개된 **KcElectra**를 기반으로 하여 정치성 발언, 성적인 발언, 우울한 발언, 공격적인 발언 등으로 분류하며, 사용자는 필요에 따라 특정 유형의 댓글만 필터링하도록 설정할 수 있습니다.
    - **Hazard Filter**와 **Type Filter**라는 2단계 필터링을 도입하여, 먼저 정상 댓글과 유해 댓글로 분류한 뒤, 유해 댓글 내에서 세부 유형을 나누어 더욱 정밀하게 필터링합니다.

### 오픈소스 소프트웨어

- WebCleanser는 MIT 라이센스를 따르며, 구성요소 (WebCleanser_backend, WebCleanser_extension, WebCleanser_model)별 자세한 라이센스 정보는 각 폴더의 LICENSES 폴더에서 확인할 수 있습니다.
- 다양한 사용자 요구에 맞춰 기능을 확장 및 커스터마이징 하거나, WebCleanser를 활용한 다른 소프트웨어 개발을 포함한 모든 활동이 허용됩니다.

---

## <a id="세부-개발-내용"></a> 2. 세부 개발 내용

프로젝트는 크게 세 분류의 요소로 구성되어있습니다.

각 요소는 model, backend, extension 입니다.

### 2.1. Model

![9 ai 모델](https://github.com/user-attachments/assets/a6e9b066-f90e-4b98-b222-5afea9d3ba96)

오픈소스로 공개된 **KcElectra**를 사용하여, 댓글 콘텐츠 필터링 모델을 학습하였습니다.

KcElectra는 한국어로 학습된 Transformer 계열 AI 모델로, 인터넷 뉴스와 댓글 데이터를 기반으로 훈련되었다는 특징을 가지고 있습니다. 이러한 특징이 WebCleanser가 제공하고자 하는 기능과 가깝다고 생각하여 모델을 선택하게 되었습니다.

**Korean Hate Speech Dataset, AIHub의 한국어 감정 정보 데이터셋, 텍스트 윤리 검증 데이터셋**과 함께, 직접 크롤링한 네이버, 유튜브 댓글 등 총 20만 개의 데이터를 기반으로 학습을 진행하였고, 약 80%의 정확도로 타입을 분류합니다.

**2.1.1 데이터셋 구성**

- Korean Hate Speech Dataset
- [https://github.com/kocohub/korean-hate-speech](https://github.com/kocohub/korean-hate-speech)
    - 분류 기준: `contain_gender_bias`, `bias`, `hate`
    - 분류 방식: `false, none, none`인 경우 0번(해당 없음), 나머지는 4번(공격적인 글)으로 분류
    - 총합 결과:
        - 0: 3429개
        - 4: 4945개
- **한국어 감정 정보가 포함된 단발성 대화 데이터셋**
- [https://aihub.or.kr/aihubdata/data/view.do?dataSetSn=270](https://aihub.or.kr/aihubdata/data/view.do?dataSetSn=270)
    - 분류 기준: 감정 유형에 따라 `0(해당 없음)`, `3(우울한 글)`, `4(공격적인 글)`로 분류
    - 총합 결과:
        - 0: 22233개
        - 3: 5267개
        - 4: 16039개
- **YouTube API**
    - 정치성 댓글과 성희롱 댓글을 수집하여 각각 `1(정치성 글)`, `2(성적인 글)`로 분류
    - 정치성 댓글 편향을 방지하기 위해 나무위키를 활용하여 구독자가 가장 많은 진보, 보수 진영의 유튜버 두명의 동영상에서 댓글을 수집함
        - [https://youtu.be/O7lFQHRoiok?si=rtpUaxxXiobGtYFa](https://youtu.be/O7lFQHRoiok?si=rtpUaxxXiobGtYFa%20https://youtu.be/L50FQAAhIVM?si=0cI_esf4lJ3NuLVu)
        - [https://youtu.be/L50FQAAhIVM?si=0cI_esf4lJ3NuLVu](https://youtu.be/O7lFQHRoiok?si=rtpUaxxXiobGtYFa%20https://youtu.be/L50FQAAhIVM?si=0cI_esf4lJ3NuLVu)
        - [https://youtu.be/-eGJjxr1MWU?si=G3waZAHQmmDlcr_H](https://youtu.be/-eGJjxr1MWU?si=G3waZAHQmmDlcr_H)
        - [https://youtu.be/CGM-GzS7Wqs?si=_H9C3in1W5L0Sz7V](https://youtu.be/CGM-GzS7Wqs?si=_H9C3in1W5L0Sz7V)
        - [https://youtu.be/xBPeTy3gxFU?si=nmOJ1nDV7FU7pJGl](https://youtu.be/xBPeTy3gxFU?si=nmOJ1nDV7FU7pJGl%20https://youtu.be/OHtYwkRigy0?si=wJVP7LbNakfD2VKZ)
        - [https://youtu.be/OHtYwkRigy0?si=wJVP7LbNakfD2VKZ](https://youtu.be/xBPeTy3gxFU?si=nmOJ1nDV7FU7pJGl%20https://youtu.be/OHtYwkRigy0?si=wJVP7LbNakfD2VKZ)
        - [https://youtu.be/WEgYxZ8eh14?si=OXfzmIYlXeuQxh_t](https://youtu.be/WEgYxZ8eh14?si=OXfzmIYlXeuQxh_t)
        - [https://youtu.be/LMhXLx_tLro?si=R8XlG6FR5lergsVi](https://youtu.be/LMhXLx_tLro?si=R8XlG6FR5lergsVi)
    - 조회수 기준으로 직캠 영상에서 댓글을 수집
        - [https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk](https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk%20https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7%20https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R%20https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q%20https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK%20https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo)
        - [https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7](https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk%20https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7%20https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R%20https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q%20https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK%20https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo)
        - [https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R](https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk%20https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7%20https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R%20https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q%20https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK%20https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo)
        - [https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q](https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk%20https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7%20https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R%20https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q%20https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK%20https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo)
        - [https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK](https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk%20https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7%20https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R%20https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q%20https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK%20https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo)
        - [https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo](https://youtu.be/ljnr5Rnzy-4?si=TsaNQh7xdRckkrEk%20https://youtu.be/mL5xgpUiESg?si=m_g7rEw75RFQrvq7%20https://youtu.be/gZeyLFXrrkE?si=FwnygohbGB5DCj7R%20https://youtu.be/E4T08bHmEmE?si=PpQ-UxX2Kuug6k_q%20https://youtu.be/OpJOUU5rePY?si=6eIEuk1Yu49QkGvK%20https://youtu.be/0rvDDFBoxII?si=qSsJXcNhh99MB9Mo)
    - 총합 결과:
        - 0: 22233개
        - 1: 26778개
        - 2: 643개
        - 3: 5267개
        - 4: 16039개
- **텍스트 윤리 검증 데이터셋**
- [https://aihub.or.kr/aihubdata/data/view.do?currMenu=&topMenu=&aihubDataSe=data&dataSetSn=558](https://aihub.or.kr/aihubdata/data/view.do?currMenu=&topMenu=&aihubDataSe=data&dataSetSn=558)
    - 분류 기준: `sexual`이 포함된 경우 2번, `immoral_none`인 경우 0번, 나머지는 4번으로 필터링
    - 총합 결과:
        - 0: 188695개
        - 2: 19390개
        - 4: 89080개
- **감성 대화 말뭉치**
- [https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=86](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=86)
    - train 데이터셋의 슬픔에 해당하는 데이터의 사람 문장1을 데이터로 하여 정제함
    - 데이터 9125개 추가
        - 총합 결과
            - 0: 188695개
            - 1: 26778개
            - 2: 19390개
            - 3: 14392개
            - 4: 89080개

**2.1.2 모델 학습 과정**

**데이터 타입 분류**

- 일반 0
- 정치성 글 1
- 성적인 글 2
- 우울한 글 3 (슬픔)
- 공격적인 글 4 (분노, 혐오)
1. Type Filter

<img width="464" alt="361302204-0d27237b-3f4a-4074-97c4-79248f37c07b" src="https://github.com/user-attachments/assets/4da46d0b-8a23-4895-8fdd-0cba222bbd0a">

- **결과 분석**
    - 1번(정치성 글)으로의 오분류가 많았다.
    - 그러나 사용성을 생각했을 때 해당이 없는 데이터를 오인식하는 것은 매우 불편하게 느껴질 것이라고 판단하였다.
1. Hazard Filter
- **모델 구성**
    - 사용자가 정상 댓글을 유해 댓글로 오분류하는 경우 불편을 느낄 수 있다는 점을 고려하여, 1번 타입(정치성 글)을 제거하고 0(정상)과 1(유해)로 나머지 댓글을 분류하는 Hazard Filter 모델을 개발했다.
- **학습 결과**
    - Hazard Filter 모델은 정상 댓글을 최대한 정확하게 분류하면서 유해 댓글을 탐지하는 데 중점을 두어 학습되었다.

<img width="467" alt="361302217-82409bd0-27c0-4e0c-842c-88dfa85dce77" src="https://github.com/user-attachments/assets/25c97fff-26e0-4faa-9312-77df83af2b00">


**최종 구조**

- **1차 필터링: Hazard Filter 모델**
    - 댓글의 유해성을 1차적으로 필터링
- **2차 필터링: Type Filter 모델**
    - Hazard Filter 모델에서 유해한 것으로 분류된 댓글을 다시 세부적으로 유형(일반, 정치, 성적, 우울, 공격적)으로 분류

이와 같은 구조로 최종 필터링 시스템을 구축하여 인터넷상에서 부정적인 영향을 미칠 수 있는 다양한 유형의 정보를 효율적으로 필터링할 수 있게 하였습니다.

### 2.2. Backend

**Spring**

사용자는 Extension을 통해 Spring 서버로 요청을 보내게 되며, Spring 서버는 이 요청을 중계하여 Google Safe Browsing API, Flask를 통해 URL 필터링, 댓글 필터링 기능을 제공합니다.

**Flask**

KcElectra 모델을 기반으로 학습시킨 AI 모델을 Spring 서버에 제공하는 역할을 합니다.

### 2.3. Extension

사용자와 상호작용하는 인터페이스 입니다.

React 환경에서 개발되었으며, 오픈소스로 공개되어있는 chrome-extension-boilerplate-react를 활용하여 개발하였습니다.

---

## <a id="시스템-구성-및-아키텍처"></a> 3. 시스템 구성 및 아키텍처

서버: AWS EC2에 Docker Compose를 활용하여 2개의 Docker (Spring, Flask)를 이용하였으며, Spring은 Google Safe Browsing을 활용하여 사용자에게 사이트 링크 검사 기능을 제공하고, Flask는 직접 활용한 두 개의 필터링 모델(Type Filter, Hazard Filter)를 활용하여 텍스트를 필터링합니다.

클라이언트: React를 활용하여 Web Extension을 개발하였으며, background 및 content script에서 링크와 텍스트를 검사하고 필터링합니다. popup에서는 필터링, 차단 히스토리와 기능 활성화 여부를 선택할 수 있습니다.

![image](https://github.com/user-attachments/assets/c2e55924-871a-4543-8e40-6d181235a1c1)

---

## <a id="유저-흐름도"></a> 4. 유저 흐름도

![image 1](https://github.com/user-attachments/assets/4ea6b408-6890-4051-b78e-2b99be6ea901)

---

## <a id="기능-명세"></a> 5. 기능 명세

### URL 필터링 관리

- **피싱 사이트 감지 ON/OFF 버튼**
    - 토글 버튼으로 피싱 사이트 감지 기능을 ON/OFF 할 수 있음
- **피싱 사이트 감지 기능**
    - 피싱 사이트 감지 토글 상태에 따라 기능이 ON 또는 OFF 됨
- **무시하기 버튼**
    - 무시하기 버튼을 통해 경고를 무시하고 페이지에 접속할 수 있음
- **이전 페이지로 돌아가기 버튼**
    - 이전 페이지로 돌아가기 버튼을 통해 URL 접속 전 페이지로 이동할 수 있음
- **잘못 차단된 사이트 신고 버튼**
    - 잘못 차단된 사이트 신고 버튼을 통해 Google에 오류를 보고할 수 있음

### 댓글 필터링 관리

- **필터링 유형 선택 버튼**
    - 리스트에서 클릭을 통해 필터링할 댓글 유형을 선택할 수 있으며, 수정한 리스트는 페이지를 새로고침한 후에 적용됨
- **댓글 필터링 기능**
    - 선택된 유형의 댓글을 필터링하며, 필터링된 댓글은 유형에 따라 다른 색깔로 표시됨
    - 네이버 뉴스와 유튜브 댓글에서 작동함
- **유해 텍스트 보이기/가리기 버튼**
    - 웹 브라우저를 우클릭하여 유해 텍스트 보이기/가리기 버튼을 눌러 내용을 확인할 수 있음
    - 보이기 상태일 경우 댓글 유형에 따라 다른 텍스트 색상이 적용됨

### 통계

- **통계 버튼**
    - 익스텐션 탭 하단의 통계 버튼을 눌러 통계 정보를 확인할 수 있음
- **통계 유형 선택 버튼**
    - 필터링 / 피싱 사이트 감지 탭을 선택하여 확인할 통계 유형을 선택할 수 있음
- **댓글 필터링 리스트 선택 버튼**
    - 버튼을 통해 확인할 댓글 리스트 유형을 선택할 수 있음
- **댓글 필터링 리스트**
    - 선택된 유형에 따라 댓글 리스트를 리턴함
- **URL 필터링 리스트**
    - 피싱 사이트 감지 탭에서 필터링된 URL과 정보를 확인할 수 있음
- **URL 리스트 정렬**
    - 최신순 / 오래된순을 선택하여 URL 리스트를 정렬할 수 있음
- **상세 URL 정보**
    - 리스트에서 컴포넌트를 클릭하여 상세 정보를 확인할 수 있음
 
---

## <a id="실행-방법-및-테스트-환경"></a> 6. 실행 방법 및 테스트 환경

**6.1 테스트 환경 정보**

하드웨어

- Apple M3 Pro 칩을 탑재한 MackBook Pro 14 모델

소프트웨어

- IntelliJ IDEA
- Visual Studio Code
- node
- Chrome

**6.2 실행 방법**

**6.2.1 백엔드**

1. **프로젝트 준비**  
   - `WebCleanser_backend` 프로젝트를 다운로드합니다.  

2. **Flask 서버 실행**  
   - Python 3.9 환경에서 `netpuri_flask` 폴더를 엽니다.  
   - 다음 명령어로 필요한 라이브러리를 설치합니다:  
     ```bash
     pip install -r requirements.txt
     ```
   - Flask 서버를 실행합니다:  
     ```bash
     python app.py
     ```

3. **Spring 서버 실행**  
   - JDK 17 환경에서 `netpuri-spring` 폴더를 엽니다.  
   - Gradle 의존성을 설치합니다.  
   - `resources/application.properties` 파일의 `${GOOGLE_SAFE_BROWSING_API_KEY}` 부분을 발급받은 **Google Safe Browsing API Key**로 대체합니다.  
   - 다음 경로에서 Spring 서버를 실행합니다:  
     ```plaintext
     com/netpuri/server/NetpuriServerApplication.java

**6.2.2 프론트엔드**

1. **프로젝트 준비**  
   - `WebCleanser_extension` 프로젝트를 다운로드합니다.  
   - VSCode로 해당 프로젝트를 불러옵니다.  

2. **프로젝트 빌드**  
   - 필요한 라이브러리를 설치합니다:  
     ```bash
     npm install
     ```  
   - 프로덕션 빌드를 실행합니다:  
     ```bash
     NODE_ENV=production npm run build
     ```  
   - 빌드 완료 후 생성된 `zip/WebCleanser-1.0.0.zip` 파일을 해제합니다.

3. **크롬 확장 프로그램 등록**  
   - Chrome 브라우저를 열고, **확장 프로그램 관리 페이지**로 이동합니다:  
     ```
     chrome://extensions
     ```
   - **개발자 모드**를 활성화합니다 (우측 상단).  
   - **압축 해제된 확장 프로그램 로드** 버튼을 클릭하고, 빌드된 폴더를 선택합니다.  
   - 등록된 **WebCleanser** 확장 프로그램을 확인합니다.

4. **확장 프로그램 고정 및 재시작**  
   - 브라우저 우측 상단의 **퍼즐 모양 아이콘**을 클릭하여 WebCleanser를 고정합니다.  
   - 변경 사항 적용을 위해 Chrome을 재시작합니다.  
