# Gemini Chat PDF Downloader

## Overview

The Gemini Chat PDF Downloader is a browser extension designed to enhance the user experience on the Gemini chat platform (https://gemini.google.com). It allows users to download their chat conversations as PDF files with a single click. The extension adds a "Download as PDF" button to the Gemini chat interface, leveraging the `html2pdf.js` library to convert chat content into a downloadable PDF document.

## Features

- **One-Click PDF Download**: Adds a styled "Download as PDF" button to the Gemini chat interface.
- **Dynamic Content Handling**: Observes DOM changes to ensure the button persists during navigation or page updates.
- **User Feedback**: Displays loading and success/error messages during PDF generation.
- **Customizable Selectors**: Allows developers to customize CSS selectors to target specific chat containers and content elements.

## Installation

To install the Gemini Chat PDF Downloader extension:

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/sanjidh090/gemini-chat-pdf-downloader.git
   ```
   Alternatively, download the ZIP file from the GitHub repository and extract it.

2. **Load the Extension in Your Browser**:
   - For **Google Chrome**:
     1. Open Chrome and navigate to `chrome://extensions/`.
     2. Enable "Developer mode" in the top-right corner.
     3. Click "Load unpacked" and select the folder containing the extension files.
   - For **Mozilla Firefox**:
     1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
     2. Click "Load Temporary Add-on" and select the `manifest.json` file from the extension folder.

3. **Verify Installation**:
   - Visit https://gemini.google.com.
   - Open the browser's developer console (F12) and check for the message: `Gemini Chat PDF Downloader: Content script loaded.`
   - Look for the "Download as PDF" button in the chat interface.

## Usage

1. Navigate to the Gemini chat platform (https://gemini.google.com).
2. Locate the "Download as PDF" button, which appears at the top of the chat interface.
3. Click the button to initiate PDF generation.
4. A loading message will appear, followed by a success or error message.
5. Upon success, the chat conversation will be downloaded as a PDF file in A4 format.

## Customization

The extension requires customization of CSS selectors to ensure compatibility with the Gemini chat interface, as the DOM structure may vary. Follow these steps:

1. **Inspect the Gemini Chat Page**:
   - Open https://gemini.google.com in your browser.
   - Use the browser's developer tools (F12) to inspect the DOM.
   - Identify the container element for the chat area (e.g., a `div` with an ID like `chat-scroll-area` or a class like `conversation-panel`).
   - Identify the element containing the chat messages (e.g., a `div` with an ID like `chat-messages-area` or a class like `chat-conversation-scroll`).

2. **Update the Selectors**:
   - Open the `content.js` file in the extension folder.
   - Replace the placeholder `YOUR_CHAT_CONTAINER_SELECTOR_HERE` with the identified chat container selector.
   - Replace the placeholder `YOUR_CHAT_CONTENT_SELECTOR_HERE` with the identified chat content selector.
   - Example:
     ```javascript
     const chatContainer = document.querySelector('#chat-scroll-area') || document.querySelector('main') || document.body;
     const chatContentElement = document.querySelector('#chat-messages-area') || document.querySelector('div[role="main"]');
     ```

3. **Reload the Extension**:
   - Go to your browser's extensions page and reload the extension.
   - Test the button to ensure it appears and functions correctly.

## Dependencies

The extension relies on the following external library, which must be included in the `manifest.json` file:

- **html2pdf.js**: Used for converting HTML content to PDF. Include it via a CDN in the manifest:
  ```json
  "content_scripts": [
    {
      "matches": ["https://gemini.google.com/*"],
      "js": ["content.js"],
      "css": [],
      "all_frames": false,
      "run_at": "document_end",
      "content_security_policy": "script-src 'self' https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js; object-src 'self'"
    }
  ]
  ```

Ensure the `manifest.json` file includes the necessary permissions:
```json
{
  "manifest_version": 3,
  "name": "Gemini Chat PDF Downloader",
  "version": "1.0",
  "description": "Download Gemini chat conversations as PDF files.",
  "permissions": ["activeTab"],
  "content_scripts": [
    {
      "matches": ["https://gemini.google.com/*"],
      "js": ["content.js"]
    }
  ]
}
```

## Troubleshooting

- **Button Not Appearing**:
  - Verify the CSS selector for `chatContainer` in `content.js`.
  - Check the console for errors like `Could not find a suitable container to add the button.`
  - Ensure the extension is loaded and the content script runs (check for the `Content script loaded` message).

- **PDF Generation Fails**:
  - Verify the CSS selector for `chatContentElement` in `content.js`.
  - Check the console for errors like `Could not find the chat content element for PDF generation.`
  - Ensure the `html2pdf.js` library is accessible and not blocked by the browser.

- **Styling Issues**:
  - Adjust the button's CSS in `content.js` (e.g., `downloadButton.style.cssText`) to match your preferences or resolve conflicts with the Gemini interface.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and test thoroughly.
4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```
5. Push to your fork and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

Please include a detailed description of your changes in the pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built by [Sanjid Hasan](https://github.com/sanjidh090).
- Powered by [html2pdf.js](https://github.com/eKoopmans/html2pdf.js).