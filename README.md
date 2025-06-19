# 📄 Gemini Chat PDF Downloader (Paused)

This Chrome extension allows users to **download their Gemini chat conversations as PDF files**. The project is currently **paused** due to strict **Content Security Policy (CSP)** restrictions enforced by `gemini.google.com`, which block client-side PDF generation using popular JavaScript libraries.

---

## 🎯 Project Goal

Provide a seamless way for Gemini users to **archive their chat conversations** by converting them into **downloadable PDF documents**.

---

## 🚧 Current Status: Development Paused

Due to CSP restrictions, the extension's original approach using `html2pdf.js` (which bundles `html2canvas` and `jsPDF`) is no longer functional.

---

## ✨ Original Approach (Blocked)

- Capture the chat content from the Gemini DOM.
- Use `html2canvas` to render the content as an image.
- Convert to PDF using `jsPDF`.

> ❌ Blocked due to Gemini’s CSP, which prevents dynamic script execution (e.g., `data:` or `blob:` URLs, Web Workers, etc.).

---

## ✅ Path Forward

While direct client-side rendering is blocked, there are alternative options for contributors:

### Option 1: Use Native Print to PDF (Recommended)

Leverage Chrome's built-in `window.print()` functionality.

- Trigger `window.print()` from the extension.
- User selects **"Save as PDF"** in the print dialog.
- This bypasses CSP entirely using native browser support.

**What You Can Build:**
- Add message passing from `popup.js` → `content.js`.
- In `content.js`, run `window.print()`.
- Inject custom print styles via `@media print` to optimize layout.

### Option 2: Server-Side Rendering (Advanced)

Set up a backend service to:
- Receive HTML or structured chat data from the extension.
- Use a headless browser (e.g. Puppeteer, Playwright) or PDF tool (e.g. `wkhtmltopdf`) to generate the PDF.
- Return the PDF to the browser for download.

> ⚠️ This route requires infrastructure, authentication, and user privacy considerations.

---

## 🤝 Contributing

We welcome help in any form!

### How to Contribute

1. **Fork** this repo
2. **Clone** your fork
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name

