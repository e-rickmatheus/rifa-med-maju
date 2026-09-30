const https = require('https');
const fs = require('fs');
const path = require('path');

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1egTaUeCKIliJXparsrk8ZGRL29lGU5NUa1l0BTv0sXM/gviz/tq?tqx=out:csv&gid=0';

https.get(SHEET_URL, (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    const lines = data.split(/\r?\n/);
    const result = {};

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Parsing robusto de linha CSV
      // Divide por vírgula que não esteja dentro de aspas
      const cols = [];
      let inQuotes = false;
      let cur = '';
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cols.push(cur.trim());
          cur = '';
        } else {
          cur += char;
        }
      }
      cols.push(cur.trim());

      const cleanCols = cols.map((c) => c.replace(/^"|"$/g, '').trim());

      const rawNum = cleanCols[0];
      const numInt = parseInt(rawNum, 10);
      if (isNaN(numInt)) continue;

      const status = cleanCols[1] ? cleanCols[1].toLowerCase() : '';
      const nome = cleanCols[2] || '';
      const tel = cleanCols[3] || '';
      const dataStr = cleanCols[4] || '';

      if (status.includes('vendido') || status.includes('pago') || nome.length > 0) {
        const pad = String(numInt).padStart(3, '0');
        result[pad] = {
          numero: pad,
          status: 'vendido',
          nome_comprador: nome || 'Comprador Registrado',
          telefone: tel,
          data_compra: dataStr || '10/09/2026',
        };
      }
    }

    const count = Object.keys(result).length;
    console.log(`Sucesso: ${count} cotas vendidas extraídas da planilha oficial.`);

    // Mostrar os primeiros 10 registros para validação
    const sampleKeys = Object.keys(result).slice(0, 10);
    sampleKeys.forEach((k) => {
      console.log(`Cota ${k}:`, result[k].nome_comprador);
    });

    const targetPath = path.join(__dirname, '..', 'src', 'lib', 'sheetSalesSeed.json');
    fs.writeFileSync(targetPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Arquivo salvo com sucesso em: ${targetPath}`);
  });
}).on('error', (err) => {
  console.error('Erro ao baixar planilha:', err);
});
