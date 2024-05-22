// contentScript.js
/* global chrome */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getHeaders") {
      const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headerTexts = Array.from(headers).map(header => header.textContent.trim());
      sendResponse({ headers: headerTexts });
    }
  });
  