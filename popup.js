
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadPdfButton');
    const statusMessage = document.getElementById('statusMessage');
    const errorNotice = document.getElementById('errorNotice');

    downloadButton.addEventListener('click', () => {
        statusMessage.textContent = 'Looking for Gemini tab...';
        errorNotice.textContent = ''; // Clear previous errors

        // Query for the active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                errorNotice.textContent = 'No active tab found.';
                return;
            }

            const activeTab = tabs[0];

            // Check if the active tab is a Gemini page
            if (!activeTab.url.startsWith('https://gemini.google.com/')) {
                errorNotice.textContent = 'Please navigate to a Gemini chat page.';
                statusMessage.textContent = ''; // Clear status if not Gemini
                return;
            }

            statusMessage.textContent = 'Sending request to download PDF...';
            
            // Send a message to the content script running on the Gemini page
            chrome.tabs.sendMessage(activeTab.id, { action: "downloadPdf" }, (response) => {
                // Check for runtime.lastError to catch issues with content script not injecting
                if (chrome.runtime.lastError) {
                    errorNotice.textContent = 'Error: Could not connect to Gemini page. Make sure the page is fully loaded.';
                    statusMessage.textContent = '';
                    console.error("Popup: Error sending message:", chrome.runtime.lastError.message);
                    return;
                }

                if (response && response.status === "initiated") {
                    statusMessage.textContent = 'PDF generation started on Gemini page.';
                    // The actual download notification will come from content.js
                } else if (response && response.status === "error") {
                    errorNotice.textContent = `Error: ${response.message}`;
                    statusMessage.textContent = '';
                } else {
                    errorNotice.textContent = 'Unexpected response from Gemini page.';
                    statusMessage.textContent = '';
                }
            });
        });
    });
});