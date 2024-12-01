export function createSpreadsheet(token) {
    const request = gapi.client.sheets.spreadsheets.create({
        properties: {
            title: 'Log the time'
        }
    });

    request.then((response) => {
        chrome.storage.local.set({ spreadsheetId: response.spreadsheetId });
        console.log('Spreadsheet created', response.spreadsheetId);
    }, (reason) => {
        console.error('Error creating spreadsheet: ' + reason);

    })
}