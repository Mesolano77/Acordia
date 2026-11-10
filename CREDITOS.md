# Créditos y licencias de terceros

- **Salamander Grand Piano** — muestras de piano en `app/piano/`.
  Autor: Alexander Holm. Licencia Creative Commons Attribution 3.0 (CC BY 3.0).
  Archivos tomados de https://github.com/Tonejs/audio (carpeta `salamander`).
- **Tesseract.js 5.1.1** y **tesseract.js-core 5.1.1** — lector de texto (OCR) en `app/ocr/`.
  Licencia Apache 2.0. https://github.com/naptha/tesseract.js
- **Datos de idioma español de Tesseract** (`spa.traineddata`, versión 4.0.0_best_int,
  paquete npm `@tesseract.js-data/spa`) en `app/ocr/lang/spa-data.wasm` (renombrado).
  Licencia Apache 2.0. https://github.com/tesseract-ocr/tessdata_best
- **Fuentes**: IBM Plex Mono, Inter y Space Grotesk, cargadas desde Google Fonts (SIL Open Font License).
- **jsPDF 2.5.1** — generación del PDF, cargado desde cdnjs al exportar. Licencia MIT. https://github.com/parallax/jsPDF
- **PDF.js 3.11.174** (Mozilla, paquete npm `pdfjs-dist`) — para abrir PDF (p. ej. el de Ultimate Guitar). En Claude se carga desde cdnjs; en la app pública, desde `app/lib/pdf.min.js` y `app/lib/pdf.worker.min.js`. Licencia Apache 2.0. https://github.com/mozilla/pdf.js
