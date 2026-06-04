import fs from 'fs';
const argv = process.argv;
if (!argv[2]) {
  console.error('Usage: node parse_pdf.js <path-to-pdf>');
  process.exit(1);
}
const filePath = argv[2];
(async () => {
  try {
    // use pdfjs-dist to extract text (pdf-parse may have incompatible shape)
    const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
    const dataBuffer = await fs.promises.readFile(filePath);
    const uint8 = new Uint8Array(dataBuffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8 });
    const pdf = await loadingTask.promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((s) => s.str || '').join(' ');
      fullText += strings + '\n\n';
    }
    const parsed = { text: fullText };
    const text = parsed.text || '';
    // write to file for inspection
    const outPath = './parsed_resume_text.txt';
    await fs.promises.writeFile(outPath, text, 'utf-8');
    console.log('PARSED_TEXT_START');
    console.log(text.slice(0, 3000));
    console.log('\n---\nSaved full extracted text to', outPath);
    console.log('PARSED_TEXT_END');
  } catch (err) {
    console.error('Error parsing PDF:', err.message || err);
    process.exit(2);
  }
})();
