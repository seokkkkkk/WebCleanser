chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'checkLink') {
    const urlToCheck = message.url;

    // 현재 활성 탭의 정보를 가져오기
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]; // 현재 활성화된 탭

      fetch(`http://localhost:8080/api/checkUrl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: urlToCheck }),
      })
        .then((response) => response.json())
        .then((data) => {
          const result = {
            success: true,
            data: data,
            timestamp: new Date().toISOString(),
          };

          const threatTypeMap = {
            MALWARE: '멀웨어',
            SOCIAL_ENGINEERING: '피싱',
            UNWANTED_SOFTWARE: '원치 않는 소프트웨어',
            POTENTIALLY_HARMFUL_APPLICATION: '잠재적 유해 애플리케이션',
          };

          const siteData = data.matches.map((match, index) => {
            const shortThreatType = threatTypeMap[match.threatType] || '기타';

            return {
              id: index + 1,
              title: tab.title || `위험 사이트 - ${shortThreatType}`, // 현재 탭의 제목 사용
              url: match.threat.url,
              favicon: `https://www.google.com/s2/favicons?domain=${
                new URL(match.threat.url).hostname
              }`,
              categories: [shortThreatType],
              visitTime: result.timestamp.replace('T', ' ').slice(0, 19),
              riskInfo: shortThreatType,
              siteDetails: [
                `위험 유형: ${shortThreatType}`,
                `플랫폼: ${match.platformType}`,
                `캐시 유지 시간: ${match.cacheDuration}`,
              ],
            };
          });

          chrome.storage.local.set({ [urlToCheck]: siteData[0] }, () => {
            if (chrome.runtime.lastError) {
              console.error(
                'Error saving to storage:',
                chrome.runtime.lastError.message
              );
              return;
            }
            sendResponse({ success: true, siteData });
          });
        })
        .catch((error) => {
          sendResponse({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString(),
          });
        });
    });

    return true;
  }
});

function checkTextWithAPI(text) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];

      fetch('http://localhost:8080/api/checkText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: [text],
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.hazard) {
            const newEntries = result.hazardous_texts.map((item) => ({
              detectTime: new Date().toISOString(),
              original_text: item.original_text,
              detail: item.result.detail,
              type: item.result.type,
              state: 'new',
              siteUrl: tab.url,
              siteTitle: tab.title,
              faviconUrl: `https://www.google.com/s2/favicons?domain=${
                new URL(tab.url).hostname
              }`,
            }));

            resolve(newEntries); // 새로운 항목들을 콘텐츠 스크립트로 전달
          } else {
            resolve([]); // 위험한 텍스트가 없는 경우, 빈 배열 반환
          }
        })
        .catch((error) => {
          console.error('API request failed:', error.message);
          reject(error);
        });
    });
  });
}

// 백그라운드에서 API 요청을 처리하는 함수
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkText') {
    checkTextWithAPI(message.text)
      .then((hazardousTexts) => {
        sendResponse({ hazardousTexts });
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });

    return true; // 비동기 응답을 위해 true 반환
  }
});

// 우클릭 메뉴 생성
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'toggleHighlight',
    title: '유해 텍스트 보이기/가리기',
    contexts: ['all'],
  });
});

// 우클릭 메뉴 선택 시 동작
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'toggleHighlight') {
    chrome.tabs.sendMessage(tab.id, { action: 'toggleHighlight' });
  }
});
