# 🩺 MARIA JÚLIA GOMES GABRIEL | Plataforma Oficial (mariajulia.med.br)

> **"Cada número comprado e cada doação é um passo a mais para a realização de um sonho: me tornar médica e cuidar de vidas com amor e dedicação."**

Plataforma web integrada para a estudante de Medicina **Maria Júlia Gomes Gabriel** (UNIFENAS), estruturada para gerenciar sua imagem oficial, sua ação solidária com sorteio de uma moto 0km, sua campanha de vaquinha solidária e um portal de gestão pessoal integrado à sua conta Google oficial: `mariajuliagomesgabriel@gmail.com`.

---

## 🌐 Arquitetura dos 4 Propósitos do Domínio

| # | Propósito | URL | Descrição |
|---|---|---|---|
| **0** | **Foto / Nome / Bio** | `https://www.mariajulia.med.br/` | Vitrine institucional e humanizada com foto em alta definição de Maria Júlia, história da vocação médica na UNIFENAS e links nobres para a Rifa, Vaquinha e Contato. |
| **1** | **Rifa Solidária** | `https://www.mariajulia.med.br/rifa` | Aplicação completa da rifa: grade de cotas interativa, chave PIX, barra de progresso em tempo real, prêmio da Moto Honda Pop e reserva via WhatsApp. |
| **2** | **Vaquinha Solidária** | `https://www.mariajulia.med.br/vaquinha` | Página de doação livre (R$ 10, R$ 25, R$ 50, R$ 100 ou qualquer valor) para custeio de mensalidades, livros anatômicos, instrumentos e moradia estudantil. |
| **3** | **Acesso Geral Pessoal** | `https://app.mariajulia.med.br/` (ou `/app`) | Hub pessoal protegido por senha com 4 módulos: Gestão da Rifa, Gestão da Vaquinha, Central de Serviços Google da Maju e Assistente Inteligente Google Gemini. |

---

## ☁️ Centralização na Conta: `mariajuliagomesgabriel@gmail.com`

Todos os serviços foram desenhados para operar sob a conta Google da Maria Júlia, aproveitando os limites e cotas gratuitas (Free Tier) de cada plataforma:

### 1. Google Drive & Planilhas (Google Sheets)
- **Finalidade:** Armazenamento seguro de comprovantes de PIX, documentos universitários e controle ao vivo de cotas vendidas.
- **Planilha Oficial:** Vinculada à conta dela. As vendas realizadas no portal podem ser sincronizadas automaticamente via Google Apps Script Webhook.

### 2. Firebase Firestore (Plano Spark Gratuito)
- **Finalidade:** Banco de dados em tempo real para sincronização instantânea das cotas entre a vitrine pública e o portal administrativo.
- **Cota Gratuita:** 50.000 leituras/dia e 20.000 gravações/dia no plano gratuito do Firebase.
- **Como Configurar:**
  1. Acesse [Firebase Console](https://console.firebase.google.com/) logado como `mariajuliagomesgabriel@gmail.com`.
  2. Crie o projeto `rifa-med-maju`.
  3. Ative o **Cloud Firestore** em modo de produção (ou teste) e crie um Web App para obter as credenciais.
  4. Preencha as chaves no arquivo `.env.local`.

### 3. Google Gemini AI Studio (Tokens & Cotas Gratuitas)
- **Finalidade:** Assistente inteligente integrado no portal (`/app`) para ajudar a Maju a redigir mensagens calorosas de agradecimento para compradores da rifa e doadores da vaquinha, criar textos para stories do Instagram e revisar conceitos médicos.
- **Como Ativar a Chave Gratuita:**
  1. Acesse [Google AI Studio](https://aistudio.google.com/) logado como `mariajuliagomesgabriel@gmail.com`.
  2. Clique em **Get API Key** e copie sua chave.
  3. Cole na variável `GEMINI_API_KEY=""` no `.env.local`.

### 4. Supabase (Opcional - Free Tier)
- **Finalidade:** Banco de dados PostgreSQL e autenticação vinculados ao login do Google da Maria Júlia.
- Acesse [Supabase Dashboard](https://supabase.com/dashboard) com login Google de `mariajuliagomesgabriel@gmail.com`.

### 5. Vercel Hosting & DNS
- Os nameservers do domínio `mariajulia.med.br` já estão apontados para a Vercel (`ns1.vercel-dns.com` / `ns2.vercel-dns.com`).
- No painel da Vercel (aba **Settings > Domains**), adicione:
  1. `mariajulia.med.br` (redireciona para www ou produção)
  2. `www.mariajulia.med.br` (produção)
  3. `app.mariajulia.med.br` (o middleware interno do Next.js reescreve automaticamente para `/app`)

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14 (App Router) com TypeScript
- **Estilização:** Tailwind CSS (Paleta Editorial Luxury Navy, Antique Gold e Emerald)
- **Banco de Dados:** Firebase Firestore & Google Sheets API
- **Inteligência Artificial:** Google Gemini API (1.5 Flash)
- **Ícones & Animações:** Lucide React & Canvas Confetti

---

## 💻 Execução Local

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse os propósitos no navegador:
- **Foto / Nome / Bio:** [http://localhost:3000/](http://localhost:3000/)
- **Rifa Solidária:** [http://localhost:3000/rifa](http://localhost:3000/rifa)
- **Vaquinha Solidária:** [http://localhost:3000/vaquinha](http://localhost:3000/vaquinha)
- **Portal Pessoal da Maju:** [http://localhost:3000/app](http://localhost:3000/app) (Senha padrão: `Dra.MaJuGG`)

---

## 👩‍⚕️ Sobre a Causa

Apoio direto à formação médica de **Maria Júlia Gomes Gabriel** na **UNIFENAS**.
- **Chave PIX Oficial (Celular):** `37998427884` (Itaú Unibanco S.A.)
- **WhatsApp Oficial:** `(37) 99842-7884`
