import { createOrUpdateSpreadsheet } from "./scripts/apis.js"


document.addEventListener("DOMContentLoaded", function () {

    const signInButton = document.getElementById("signInButton")
    const statusText = document.getElementById('statusText');

    chrome.storage.local.get(['authToken'], function (result) {
        if (result.authToken) {
            signInButton.style.display = 'none';
            statusText.textContent = 'You are signed in';
        } else {
            signInButton.style.display = 'block';
            statusText.textContent = 'Please sign in';
        }
    });

    signInButton.addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError) {
                console.log(`Error getting token: ${chrome.runtime.lastError.message}`);
            }
            else {
                // Save the token to local storage and update the button status
                chrome.storage.local.set({ 'authToken': token }, () => {
                    signInButton.style.display = 'none';
                    statusText.textContent = 'You are signed in';
                });
                // Create a new spreadsheet if it doesn't exist
                chrome.storage.local.get(['spreadsheetId'], () => {
                    createOrUpdateSpreadsheet(token);
                })
            }
        });
    });
})

