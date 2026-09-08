# 🩺 RIFA MED MAJU | Ação Solidária Oficial

> **"Cada número comprado é um passo a mais para a realização de um sonho: me tornar médica e cuidar de vidas com amor e dedicação."**

Aplicação web moderna, responsiva e de alta performance desenvolvida para gerenciar a Ação Solidária de **Maria Júlia Gomes Gabriel** em prol do custeio de sua faculdade de Medicina.

---

## 🏍️ O Prêmio & A Rifa

- **Prêmio:** 01 Moto Honda Pop
- **Valor por Cota:** R$ 20,00
- **Data do Sorteio:** 24/07/2027
- **Chave PIX Oficial (Celular):** `37998427884` (Maria Júlia Gomes Gabriel)
- **WhatsApp Oficial:** `(37) 99842-7884`

---

## ✨ Funcionalidades

### 1. Vitrine Pública (Landing Page `/`)
- **Hero Section Humanizada:** Apresentação elegante com foto oficial de Maria Júlia de jaleco e estetoscópio, destaque do prêmio e botões de ação rápida.
- **Barra de Progresso Dinâmica:** Cálculo em tempo real da meta alcançada (`%`), total de cotas vendidas, cotas disponíveis e valor arrecadado (`R$`).
- **Como Funciona (4 Passos Ilustrados):**
  1. *Escolha seu número*
  2. *Passe seus dados*
  3. *Envio do comprovante via PIX*
  4. *Receba sua rifa registrada com foto oficial*
- **Card PIX com 1 Clique:** Cópia instantânea da chave celular com animação comemorativa de confetes e botão direto para envio do comprovante.
- **Grade Interativa de Cotas:**
  - Renderização dinâmica do total de cotas (ex: `000` a `999` para 1.000 cotas; `0000` a `1499` ao expandir).
  - Campo de busca instantânea por número.
  - Filtros rápidos: *Todos*, *Apenas Livres*, *Apenas Vendidos*.
  - Navegação fluida em blocos de 100 cotas para garantir máxima velocidade em smartphones.
  - **Cotas Livres:** Destaque dourado; ao clicar, abre mensagem pré-formatada no WhatsApp:
    > *"Oi Maria Júlia, quero a cota número [XXX] da sua Ação Solidária!"*
  - **Cotas Vendidas:** Indicação cinza e bloqueada. Ao passar o mouse (ou clicar), exibe tooltip com máscara de privacidade:
    > *"Comprado por Maria S. (Tel: ****-7884)"*

### 2. Painel Administrativo (`/admin`)
- **Acesso Protegido por Senha:** Autenticação simples (senha padrão: `maju2027`).
- **Gestão de Escalabilidade de Cotas:**
  - Visualização do limite atual.
  - Botões rápidos de expansão: `+100`, `+500`, `+1000` cotas.
  - Campo customizado para definir qualquer total desejado. A vitrine reflete a expansão imediatamente.
- **Gestão Completa de Vendas:**
  - Registro de venda com Nome Completo, Telefone (WhatsApp) e Data.
  - Edição de dados do comprador a qualquer momento.
  - Liberação / cancelamento de cota vendida (retorna imediatamente ao status livre).
- **Exportação de Dados (.CSV):**
  - Botão *"Exportar Planilha de Vendas"*.
  - Gera arquivo CSV formatado em UTF-8 com BOM (100% compatível com acentuação no Microsoft Excel e Google Planilhas).
  - Colunas: `Número da Cota`, `Status`, `Nome do Comprador`, `Telefone de Contato`, `Data de Aquisição`.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) com paleta personalizada inspirada na arte original (Azul Marinho Nobre, Branco e Dourado/Bege)
- **Banco de Dados:** [Firebase Firestore](https://firebase.google.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Animações:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🗄️ Arquitetura do Banco de Dados (Firestore)

Estruturado para máxima economia de cotas no plano Spark (gratuito) do Firebase:
1. `config/raffle_settings`: Contém as configurações globais da rifa:
   - `total_numbers`: Número total de cotas ativas (inicia em 1000).
   - `prize`, `price`, `draw_date`, `pix_key`, `pix_name`, `whatsapp`.
2. `cotas/{numero}`: Armazena **apenas** os números que tiveram venda:
   - `status`: `"vendido"`
   - `nome_comprador`: string
   - `telefone`: string
   - `data_compra`: ISO string / timestamp
   - Números não existentes nesta coleção são considerados automaticamente como **livres**, dispensando gravações desnecessárias.

---

## 🚀 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/e-rickmatheus/rifa-med-maju.git
cd rifa-med-maju
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
   - Para acessar o painel administrativo: [http://localhost:3000/admin](http://localhost:3000/admin) (senha: `maju2027`).

---

## ☁️ Conectando ao Firebase Firestore

O projeto possui um **Modo Local Resiliente** nativo, o que significa que ele funciona imediatamente para testes no navegador mesmo sem chaves de API.

Para sincronizar na nuvem com o Firebase:
1. Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um novo projeto.
2. Ative o **Cloud Firestore** em modo de teste ou configure as regras de leitura/escrita.
3. Obtenha as chaves do seu Web App no Firebase.
4. Crie ou edite o arquivo `.env.local` na raiz:
```env
NEXT_PUBLIC_FIREBASE_API_KEY="seu_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="seu_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="seu_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="seu_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="seu_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="seu_app_id"
NEXT_PUBLIC_ADMIN_PASSWORD="maju2027"
```
5. Reinicie a aplicação (`npm run dev`). O sistema passará a sincronizar todas as cotas e limites na nuvem em tempo real!

---

## 👩‍⚕️ Sobre a Causa

Esta rifa foi organizada com muito carinho por familiares e amigos para apoiar a formação médica de **Maria Júlia Gomes Gabriel**. Cada contribuição faz uma enorme diferença!
