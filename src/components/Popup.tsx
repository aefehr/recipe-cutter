/* global chrome */
import React, { useState } from 'react';
import './Popup.css';

async function getCurrentTabId(): Promise<number | null> {
    try {
      const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      return tabs[0]?.id || null;
    } catch (err) {
      console.error("Error getting current tab ID:", err);
      return null;
    }
  }
  
  const Popup: React.FC = () => {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [directions, setDirections] = useState<string[]>([]);
  
    const fetchRecipeDetails = async () => {
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
  
        chrome.tabs.sendMessage(tabId, { action: "getRecipeDetails" }, (response) => {
          if (response) {
            setIngredients(response.ingredients || []);
            setDirections(response.directions || []);
          }
        });
      } catch (err) {
        console.error("Failed to inject content script:", err);
      }
    };
  
    return (
      <div id="popup">
        <button onClick={fetchRecipeDetails}>Fetch Recipe Details</button>
        <h1>Ingredients</h1>
        <ol>
          {ingredients.map((ingredient, index) => (
            <li key={index} className="ingredient">{ingredient}</li>
          ))}
        </ol>
        <h1>Directions</h1>
        <ol>
          {directions.map((direction, index) => (
            <li key={index} className="direction">{direction}</li>
          ))}
        </ol>
      </div>
    );
  };
  
  export default Popup;
