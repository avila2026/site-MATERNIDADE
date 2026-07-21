<div align="center">

# 🌸 Achadinhos Maternidade

**E-commerce materno-infantil com assistente IA multi-provedor**

![TypeScript](https://img.shields.io/badge/TypeScript-98%25-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![Build](https://github.com/avila2026/site-MATERNIDADE/actions/workflows/deploy.yml/badge.svg)

</div>

---

## Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + TypeScript |
| Build | Vite 6 |
| IA | Google Gemini + Anthropic Claude |
| Deploy | Hostinger (estático) |

## Rodando Localmente

**Pré-requisito:** Node.js 20+

```bash
# 1. Clone o repositório
git clone https://github.com/avila2026/site-MATERNIDADE.git
cd site-MATERNIDADE

# 2. Instale as dependências
npm install

# 3. Configure as chaves de API
cp .env.example .env.local
# Edite .env.local com suas chaves

# 4. Inicie o servidor de desenvolvimento
npm run dev
# → http://localhost:3000
```

## Acesso por link no GitHub Codespaces

Ao abrir este repositório em um Codespace:

1. Execute `npm run dev`
2. O Codespaces irá encaminhar automaticamente a porta `3000`
3. Abra a aba **Ports**, localize a porta `3000` e clique em **Open in Browser**

Esse link funciona imediatamente para você dentro do Codespaces.  
Se quiser compartilhar com outras pessoas sem autenticação, altere a visibilidade da porta para **Public** na aba **Ports**.

## Configuração das APIs

Edite `.env.local`:

```env
# Google Gemini — https://aistudio.google.com/apikey
GEMINI_API_KEY=sua_chave_gemini

# Anthropic Claude — https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY=sua_chave_anthropic

# Provedor padrão do chat: "gemini" ou "anthropic"
VITE_DEFAULT_AI_PROVIDER=gemini
```

> ⚠️ **NUNCA** commite o `.env.local`. Ele está no `.gitignore`.

## Deploy para Hostinger

```bash
# Build de produção
npm run build

# Upload manual:
# No File Manager da Hostinger → public_html
# Faça upload do conteúdo de dist/
```

**Deploy automático via GitHub Actions** também está disponível.
Configure os secrets `GEMINI_API_KEY` e `ANTHROPIC_API_KEY` em:
`GitHub → Settings → Secrets → Actions`

## Arquitetura IA

O assistente suporta dois provedores, selecionáveis sem recarregar a página:

```
services/
├── aiAdapter.ts         ← Ponto de entrada unificado
├── anthropicAdapter.ts  ← Claude (chat avançado)
├── anthropicFactory.ts  ← Singleton Anthropic
├── aiFactory.ts         ← Singleton Gemini
└── cache.ts             ← Cache localStorage (TTL 24h)
```

| Feature | Gemini | Claude |
|---|---|---|
| Chat | ✅ | ✅ |
| Geração de imagens | ✅ | ❌ |
| Raciocínio complexo | ✅ | ✅✅ |

## Para Desenvolvedores e Agentes IA

Leia o arquivo [`CLAUDE.md`](./CLAUDE.md) antes de modificar o projeto.
Ele documenta arquitetura, convenções e tarefas comuns para Claude Code.

---

<div align="center">
  <sub>Feito com 🌸 para mamães e bebês</sub>
</div>
