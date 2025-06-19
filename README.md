Gemini Chat PDF Downloader (Paused)
This project aims to develop a Chrome extension that allows users to easily download their Gemini chat conversations as PDF files. Due to technical challenges related to Content Security Policy (CSP) on gemini.google.com, the direct PDF generation functionality using client-side libraries is currently paused.

🎯 Project Goal
The primary objective of this extension is to provide a seamless way for Gemini users to archive their conversations by converting them into downloadable PDF documents.

🚧 Current Status: Paused due to CSP
The development is currently on hold because gemini.google.com enforces a strict Content Security Policy (CSP). This policy prevents the html2pdf.js library (which relies on html2canvas and jsPDF) from executing certain operations, such as creating Web Workers from data: or blob: URLs, and potentially connecting to necessary local resources or dynamic scripts required for client-side HTML-to-PDF rendering.

The error observed is typically:
Refused to create a worker from 'data:text/javascript...' because it violates the following Content Security Policy directive...

This CSP restriction fundamentally blocks client-side PDF generation methods that directly manipulate the page's content and rely on dynamic script execution or resource loading within the secure context of the Gemini website.

✨ Initial Approach (Client-Side HTML-to-PDF)
Our initial approach involved using the popular JavaScript library html2pdf.js (which bundles html2canvas and jsPDF) to:

Capture the HTML content of the Gemini chat area.

Convert this HTML into a canvas image.

Generate a PDF document from the canvas.

However, as detailed above, this method is currently blocked by Gemini's CSP.

✅ Proposed Path Forward & How You Can Contribute!
While direct client-side PDF generation is challenging, there are alternative paths, and we welcome contributions to help bring this extension to life!

Option 1: Implement "Print to PDF" Feature (Recommended for immediate solution)
The most robust and immediate solution is to leverage the browser's native print functionality. This involves:

The extension's popup script triggering window.print() on the active Gemini tab.

The user then manually selecting "Save as PDF" from their browser's print dialogue.

This bypasses CSP issues as it uses a native browser function.
Contributions needed: Implement window.print() in content.js based on popup message. (A basic setup for this has been provided in the last interaction, but it needs robust implementation and potential pre-print CSS cleanup.)

Option 2: Explore Advanced / Server-Side Solutions (More Complex)
For a truly automatic PDF download, a server-side approach would be necessary:

The extension extracts the raw HTML or structured data from the Gemini chat.

This data is sent to a dedicated backend server (e.g., Node.js, Python Flask/Django).

The server uses a headless browser (like Puppeteer or Playwright) or a PDF rendering library (e.g., wkhtmltopdf) to generate the PDF.

The server then sends the PDF back to the user's browser for download.

Contributions needed: This path requires significant backend development. If you're interested in building out a server-side component, please open an issue to discuss!

Contributing
We highly appreciate any form of contribution!

Fork this repository.

Clone your forked repository.

Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name.

Make your changes.

Test your changes by loading the extension locally (see "Local Development Setup" below).

Commit your changes: git commit -m "feat: Add new feature".

Push to your branch: git push origin feature/your-feature-name.

Open a Pull Request to the main branch of this repository, describing your changes.

Local Development Setup
To test and develop this extension:

Clone this repository to your local machine.

Download html2pdf.min.js:
Go to https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.min.js and save the file directly into the root of the cloned repository folder.

Create Placeholder Icons: Create three empty (or simple colored) PNG files named icon16.png (16x16), icon48.png (48x48), and icon128.png (128x128) in the root of the repository.

Load as Unpacked Extension in Chrome:

Open Chrome and go to chrome://extensions.

Enable "Developer mode" (usually a toggle in the top-right).

Click "Load unpacked".

Select the cloned repository folder.

Test: Navigate to https://gemini.google.com/ and click your extension icon in the toolbar.

📜 License
This project is open-source and available under the MIT License.
