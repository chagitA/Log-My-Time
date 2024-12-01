import { createOrUpdateSpreadsheet } from "./scripts/apis.js"

document.getElementById('signInButton').addEventListener('click', () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
            console.log(`Error getting token: ${chrome.runtime.lastError.message}`);
            return;
        }
        else {
            // Create a new spreadsheet if it doesn't exist
            chrome.storage.local.get(['spreadsheetId'], (result) => {
                if (!result.spreadsheetId) {
                    createOrUpdateSpreadsheet(token);
                }
                else {

                }
            })
        }
    })
})