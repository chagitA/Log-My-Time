export async function createOrUpdateSpreadsheet(token) {
    const spreadsheetName = "Log My Time"
    try {
        chrome.storage.local.get(['spreadsheetId'], async (result) => {
            if (result.spreadsheetId) {
                const spreadsheetId = result.spreadsheetId;
                console.log('Spreadsheet found:', spreadsheetId);

            } else {
                const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        properties: {
                            title: 'Log My Time'
                        }
                    })
                });
            }
        });

        if (response.ok) {
            const data = await response.json();
            const newSpreadsheetId = data.spreadsheetId;

            chrome.storage.local.set({ spreadsheetId: newSpreadsheetId });
            console.log('New spreadsheet created with ID:', newSpreadsheetId);

        } else {
            console.error('Error creating spreadsheet:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating spreadsheet:', error.message);
    }
}
