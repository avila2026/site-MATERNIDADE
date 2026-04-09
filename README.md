<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e58668c2-bdb8-4dba-8e93-f8d25a713491

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Acesso por link no GitHub Codespaces

Ao abrir este repositório em um Codespace:

1. Execute `npm run dev`
2. O Codespaces irá encaminhar automaticamente a porta `3000`
3. Abra a aba **Ports**, localize a porta `3000` e clique em **Open in Browser**

Esse link funciona imediatamente para você dentro do Codespaces.  
Se quiser compartilhar com outras pessoas sem autenticação, altere a visibilidade da porta para **Public** na aba **Ports**.
