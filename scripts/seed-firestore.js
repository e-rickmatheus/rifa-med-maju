/**
 * Script para semear/migrar todas as cotas da planilha oficial diretamente para o Firebase Firestore
 * 
 * Uso:
 * node scripts/seed-firestore.js
 */
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

// Leitura simples do .env.local sem dependências externas
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      val = val.replace(/^["']|["']$/g, '');
      env[key] = val;
    }
  });
  return env;
}

const env = loadEnv();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.log('\x1b[33m%s\x1b[0m', 'Aviso: Credenciais do Firebase ainda não configuradas no .env.local.');
  console.log('Assim que criar o projeto no Firebase da Maria Júlia, preencha o .env.local e execute novamente: node scripts/seed-firestore.js');
  process.exit(0);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedFirestore() {
  const seedPath = path.join(__dirname, '..', 'src', 'lib', 'sheetSalesSeed.json');
  if (!fs.existsSync(seedPath)) {
    console.error('Arquivo sheetSalesSeed.json não encontrado.');
    process.exit(1);
  }

  const cotas = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
  const total = Object.keys(cotas).length;
  console.log(`Iniciando migração de ${total} cotas para o Firestore da Maria Júlia...`);

  // 1. Configuração da Rifa
  await setDoc(doc(db, 'config', 'raffle_settings'), {
    total_numbers: 1000,
    prize: '01 MOTO HONDA POP',
    price: 20.0,
    draw_date: '24/07/2027',
    pix_key: '37998427884',
    pix_name: 'MARIA JULIA GOMES GABRIEL',
    whatsapp: '5537998427884',
    title: 'Rifa Solidaria - Medicina - Maria Julia',
  });
  console.log('✓ Configurações da Rifa salvas no Firestore.');

  // 2. Upload das cotas vendidas
  let count = 0;
  for (const [numero, cota] of Object.entries(cotas)) {
    await setDoc(doc(db, 'cotas', numero), cota);
    count++;
    if (count % 20 === 0 || count === total) {
      console.log(`Progresso: ${count}/${total} cotas enviadas...`);
    }
  }

  console.log(`\x1b[32m%s\x1b[0m`, `✓ Sucesso absoluto! Todas as ${total} cotas da planilha oficial foram salvas no Firestore.`);
  process.exit(0);
}

seedFirestore().catch((err) => {
  console.error('Erro na migração:', err);
  process.exit(1);
});
