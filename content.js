// Ensure this script runs only on the Gemini chat page
if (window.location.href.startsWith("https://gemini.google.com")) {
    console.log("Gemini Chat PDF Downloader: Content script loaded.");

    /**
     * Adds the "Download as PDF" button to the Gemini chat interface.
     * This function checks if the button already exists to prevent duplicates.
     * It tries to find a suitable container to prepend the button for visibility.
     */
    function addDownloadButton() {
        // Prevent adding multiple buttons if the script runs again
        if (document.getElementById('gemini-pdf-download-button')) {
            console.log("Gemini Chat PDF Downloader: Button already exists.");
            return;
        }

        // Create the button element
        const downloadButton = document.createElement('button');
        downloadButton.id = 'gemini-pdf-download-button';
        downloadButton.textContent = 'Download Chat as PDF';
        
        // Apply basic inline styles for visual appearance
        downloadButton.style.cssText = `
            background-color: #4285F4; /* Google Blue */
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease;
            margin-top: 15px;
            margin-bottom: 15px;
            display: block;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        `;

        // Add hover effects for better user experience
        downloadButton.onmouseover = () => downloadButton.style.backgroundColor = '#357ae8';
        downloadButton.onmouseout = () => downloadButton.style.backgroundColor = '#4285F4';

        // --- IMPORTANT: CUSTOMIZE THESE SELECTORS ---
        // Find a suitable container to insert the button.
        // You MUST inspect the Gemini page using your browser's developer tools (F12)
        // to find the most accurate and stable CSS selector for the main chat area
        // or a parent element where you want the button to appear.
        // Replace the placeholder selectors below with the one you find.
        // Example: If you find an ID like 'chat-scroll-area', use '#chat-scroll-area'
        // Example: If you find a class like 'conversation-panel', use '.conversation-panel'
        const chatContainer = document.querySelector('YOUR_CHAT_CONTAINER_SELECTOR_HERE') || 
                              document.querySelector('main') || // A more general fallback
                              document.body; // Final fallback if nothing else works

        if (chatContainer) {
            // Prepend the button to the container so it appears at the top/beginning
            chatContainer.prepend(downloadButton);
            console.log("Gemini Chat PDF Downloader: Button added successfully.");
        } else {
            console.error("Gemini Chat PDF Downloader: Could not find a suitable container to add the button.");
        }

        // Attach an event listener to the button for the click event
        downloadButton.addEventListener('click', () => {
            console.log("Gemini Chat PDF Downloader: Download button clicked. Initiating PDF generation.");
            generatePdf();
        });
    }

    /**
     * Generates a PDF from the identified chat content element.
     * Displays a loading message during the PDF generation process.
     */
    function generatePdf() {
        // Create and display a temporary loading message to the user
        const loadingMessage = document.createElement('div');
        loadingMessage.textContent = 'Generating PDF... Please wait.';
        loadingMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000; /* Ensure it's on top of other content */
            font-size: 18px;
            text-align: center;
        `;
        document.body.appendChild(loadingMessage);

        // --- IMPORTANT: CUSTOMIZE THIS SELECTOR ---
        // Identify the element containing the actual chat messages for PDF conversion.
        // This is the most likely part to need customization.
        // Use your browser's developer tools on a Gemini chat page to find the exact
        // class name or ID of the container that holds all the chat bubbles/messages.
        // Replace the placeholder selectors below with the one you find.
        // Example: If you find an ID like 'chat-messages-area', use '#chat-messages-area'
        // Example: If you find a class like 'chat-conversation-scroll', use '.chat-conversation-scroll'
        const chatContentElement = document.querySelector('YOUR_CHAT_CONTENT_SELECTOR_HERE') || 
                                   document.querySelector('div[role="main"]'); // A fallback for the content if a specific one isn't found

        if (!chatContentElement) {
            console.error("Gemini Chat PDF Downloader: Could not find the chat content element for PDF generation.");
            loadingMessage.textContent = 'Error: Could not find chat content to convert.';
            setTimeout(() => loadingMessage.remove(), 3000); // Remove message after 3 seconds
            return;
        }

        // Configuration options for html2pdf.js
        const options = {
            margin: [10, 10, 10, 10], // Margins (top, left, bottom, right) in millimeters
            filename: 'gemini_chat.pdf', // Default filename for the downloaded PDF
            image: { type: 'jpeg', quality: 0.98 }, // Image quality settings for HTML2Canvas
            html2canvas: { scale: 2, logging: true, useCORS: true }, // HTML2Canvas specific options (for rendering HTML to canvas)
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } // jsPDF specific options (for PDF creation)
        };

        // Use the html2pdf library (which is loaded globally by manifest.json)
        // to generate and save the PDF from the selected chat content element.
        html2pdf().set(options).from(chatContentElement).save().then(() => {
            console.log("Gemini Chat PDF Downloader: PDF successfully generated and downloaded.");
            loadingMessage.textContent = 'PDF downloaded successfully!';
            setTimeout(() => loadingMessage.remove(), 2000); // Remove success message after 2 seconds
        }).catch(error => {
            console.error("Gemini Chat PDF Downloader: An error occurred during PDF generation:", error);
            loadingMessage.textContent = `Error generating PDF: ${error.message || 'Unknown error'}`;
            setTimeout(() => loadingMessage.remove(), 5000); // Keep error message longer
        });
    }

    /**
     * Uses a MutationObserver to watch for changes in the DOM.
     * This is important for Single Page Applications (SPAs) like Gemini,
     * where content might load dynamically after the initial page load.
     * It ensures the button is added once the relevant container is available.
     */
    const observer = new MutationObserver((mutationsList, observer) => {
        // Check if the target container for the button exists and the button is not yet added
        // Use the same selector you found for `chatContainer` above.
        const containerToCheck = document.querySelector('YOUR_CHAT_CONTAINER_SELECTOR_HERE') ||
                                 document.querySelector('main') ||
                                 document.body;

        if (containerToCheck && !document.getElementById('gemini-pdf-download-button')) {
            addDownloadButton();
            // Disconnect observer after button is added if you only need it once.
            // If the page routes or reloads parts of the DOM often, you might keep it.
            // For most SPA navigation, one-time addition should be fine.
            // observer.disconnect();
        }
    });

    // Start observing the entire document body for changes, including deep changes (subtree: true)
    observer.observe(document.body, { childList: true, subtree: true });

    // Also try to add the button immediately in case the DOM is already ready
    addDownloadButton();
}