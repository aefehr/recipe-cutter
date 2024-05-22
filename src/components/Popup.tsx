/* global chrome */
import React, { useState } from 'react';

async function getCurrentTabId() {
  try {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    return tabs[0]?.id;
  } catch (err) {
    console.error("Error getting current tab ID:", err);
    return null;
  }
}

const Popup: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>([]);

  const fetchHeaders = async () => {
    const tabId = await getCurrentTabId();
    if (!tabId) {
      console.error("No active tab found");
      return;
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['contentScript.js']
      });

      chrome.tabs.sendMessage(tabId, { action: "getHeaders" }, (response) => {
        if (response && response.headers) {
          setHeaders(response.headers);
        }
      });
    } catch (err) {
      console.error("Failed to inject content script:", err);
    }
  };

  return (
    <div>
      <button onClick={fetchHeaders}>Fetch Headers</button>
      <h1>Headers on the Page</h1>
      <ul>
        {headers.map((header, index) => (
          <li key={index}>{header}</li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
