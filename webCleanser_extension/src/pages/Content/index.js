// 1. 링크 클릭 처리 및 필터링 기능
document.addEventListener('click', function (event) {
  let targetElement = event.target;

  while (targetElement && targetElement.tagName !== 'A') {
    targetElement = targetElement.parentElement;
  }

  if (targetElement && targetElement.tagName === 'A') {
    const linkUrl = targetElement.href;

    const isNewTab =
      event.ctrlKey ||
      event.shiftKey ||
      event.metaKey ||
      event.button === 1 ||
      targetElement.target === '_blank';

    event.preventDefault(); // 기본 링크 클릭 동작 먼저 막기

    chrome.storage.local.get(['siteFilterOn'], (result) => {
      if (!result.siteFilterOn) {
        if (isNewTab) {
          window.open(linkUrl, '_blank');
        } else {
          window.location.href = linkUrl;
        }
        return;
      }

      chrome.storage.local.get([linkUrl], function (storageResult) {
        if (chrome.runtime.lastError) {
          console.error(
            'Error accessing storage:',
            chrome.runtime.lastError.message
          );
          // API 요청 실패 시 기존 동작 수행
          if (isNewTab) {
            window.open(linkUrl, '_blank');
          } else {
            window.location.href = linkUrl;
          }
          return;
        }

        if (storageResult[linkUrl]) {
          const storedData = storageResult[linkUrl];

          if (storedData.riskInfo !== 'none') {
            const blockedUrl =
              chrome.runtime.getURL('blocked.html') +
              `?url=${encodeURIComponent(
                linkUrl
              )}&threatType=${encodeURIComponent(storedData.riskInfo)}`;
            window.location.href = blockedUrl;
          } else {
            if (isNewTab) {
              window.open(linkUrl, '_blank');
            } else {
              window.location.href = linkUrl;
            }
          }
        } else {
          chrome.runtime.sendMessage(
            {
              type: 'checkLink',
              url: linkUrl,
            },
            function (response) {
              if (chrome.runtime.lastError) {
                console.error(
                  'Runtime error:',
                  chrome.runtime.lastError.message
                );
                // API 요청 실패 시 기존 동작 수행
                if (isNewTab) {
                  window.open(linkUrl, '_blank');
                } else {
                  window.location.href = linkUrl;
                }
                return;
              }

              if (response && response.success) {
                const siteData = response.siteData[0]; // 첫 번째 매치 데이터 사용

                chrome.storage.local.set({ [linkUrl]: siteData }, function () {
                  if (chrome.runtime.lastError) {
                    console.error(
                      'Error saving to storage:',
                      chrome.runtime.lastError.message
                    );
                    return;
                  }
                });

                if (siteData.riskInfo !== 'none') {
                  const blockedUrl =
                    chrome.runtime.getURL('blocked.html') +
                    `?url=${encodeURIComponent(
                      linkUrl
                    )}&threatType=${encodeURIComponent(siteData.riskInfo)}`;
                  window.location.href = blockedUrl;
                } else {
                  if (isNewTab) {
                    window.open(linkUrl, '_blank');
                  } else {
                    window.location.href = linkUrl;
                  }
                }
              } else {
                console.error('API request failed.');
                // API 요청 실패 시 기존 동작 수행
                if (isNewTab) {
                  window.open(linkUrl, '_blank');
                } else {
                  window.location.href = linkUrl;
                }
              }
            }
          );
        }
      });
    });
  }
});

// 2. 백그라운드 스크립트에 텍스트 검사를 요청하는 함수

function highlightTextAndStore(
  commentElement,
  hazardousTexts,
  selectedDetails
) {
  const text = commentElement.innerText.trim();
  hazardousTexts.forEach((hazardousText) => {
    if (
      text.includes(hazardousText.original_text) &&
      selectedDetails.includes(hazardousText.detail) // 선택된 유형과 일치하는 항목만 필터링
    ) {
      let highlightColor = '';
      let textColor = '';

      switch (hazardousText.type) {
        case '사회적 유해':
          highlightColor = '#f5cfff';
          textColor = '#f5cfff';
          break;
        case '불법 및 위험':
          highlightColor = '#ffd2d7';
          textColor = '#ffd2d7';
          break;
        case '정신적 위험':
          highlightColor = '#aaf2e1';
          textColor = '#aaf2e1';
          break;
        default:
          highlightColor = '';
          textColor = '';
      }

      if (highlightColor && textColor) {
        commentElement.style.backgroundColor = highlightColor;
        commentElement.style.color = textColor;
        commentElement.setAttribute('data-highlight-color', highlightColor);
        commentElement.setAttribute('data-text-color', textColor);

        chrome.storage.local.get('hazardous_texts', (data) => {
          let hazardousTexts = data.hazardous_texts || [];

          const isDuplicate = hazardousTexts.some(
            (storedText) =>
              storedText.original_text === hazardousText.original_text
          );

          if (!isDuplicate) {
            hazardousTexts.push(hazardousText);

            if (hazardousTexts.length > 200) {
              hazardousTexts = hazardousTexts.slice(-200);
            }

            chrome.storage.local.set(
              { hazardous_texts: hazardousTexts },
              () => {
                if (chrome.runtime.lastError) {
                  console.error(
                    'Error saving to storage:',
                    chrome.runtime.lastError.message
                  );
                }
              }
            );
          }
        });
      }
    }
  });
}

// 댓글 변화를 감지하여 하이라이트 처리하는 함수
function observeComments(selector, selectedDetails) {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const newComments = mutation.target.querySelectorAll(selector);
        newComments.forEach((comment) => {
          chrome.runtime.sendMessage(
            { action: 'checkText', text: comment.innerText.trim() },
            (response) => {
              if (
                response.hazardousTexts &&
                response.hazardousTexts.length > 0
              ) {
                highlightTextAndStore(
                  comment,
                  response.hazardousTexts,
                  selectedDetails
                );
              }
            }
          );
        });
      }
    }
  });

  observer.observe(targetNode, config);
}

// 사이트에 맞춰 실행
function detectSiteAndExecute() {
  chrome.storage.local.get(['selectedDetails'], (result) => {
    const selectedDetails = result.selectedDetails || [];

    if (window.location.hostname.includes('naver.com')) {
      observeComments('.u_cbox_text_wrap', selectedDetails);
    } else if (window.location.hostname.includes('youtube.com')) {
      observeComments('#content-text', selectedDetails);
    }
  });
}

// 하이라이트 토글 기능
function toggleHighlight() {
  const highlightedElements = document.querySelectorAll(
    '[data-highlight-color]'
  );

  highlightedElements.forEach((element) => {
    const currentBackgroundColor = element.style.backgroundColor;
    const currentTextColor = element.style.color;
    const highlightColor = element.getAttribute('data-highlight-color');

    if (currentBackgroundColor === currentTextColor) {
      switch (highlightColor) {
        case '#f5cfff':
          element.style.color = '#cc13ff';
          break;
        case '#ffd2d7':
          element.style.color = '#ff485d';
          break;
        case '#aaf2e1':
          element.style.color = '#00bb8f';
          break;
        default:
          element.style.color = highlightColor;
      }
    } else {
      element.style.color = highlightColor;
    }
  });
}

// 메시지 수신 대기 (우클릭 메뉴에서)
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleHighlight') {
    toggleHighlight();
  }
});

// 스크립트 실행
detectSiteAndExecute();

chrome.storage.local.get('hazardous_texts', (data) => {
  if (chrome.runtime.lastError) {
    console.error('Error accessing storage:', chrome.runtime.lastError.message);
  }
});
