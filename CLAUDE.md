# CLAUDE.md — Achadinhos Maternidade

> Documentação para agentes IA criados com **Claude Code**.
> Este arquivo é lido automaticamente pelo Claude Code antes de executar tarefas.

## Visão Geral do Projeto

**Achadinhos Maternidade** é um e-commerce de produtos materno-infantis construído com:

- **Frontend:** React 19 + TypeScript + Vite 6
- **Estilização:** Tailwind CSS (classes utilitárias inline)
- **IA:** Suporte multi-provedor — Google Gemini e Anthropic Claude
- **Deploy:** Hostinger (estático, `dist/` → `public_html/`)

## Estrutura de Pastas

```
/
├── components/          # Componentes React da UI
│   ├── Assistant.tsx    # Chat IA com seletor de provedor
│   ├── AdminConfig.tsx  # Painel admin (requer auth)
│   └── ...
├── services/            # Camada de serviços IA
│   ├── aiAdapter.ts     # Ponto de entrada unificado (GeminiAdapter + AnthropicAdapter)
│   ├── anthropicAdapter.ts   # Implementação Claude
│   ├── anthropicFactory.ts   # Singleton Anthropic client
│   ├── aiFactory.ts          # Singleton Gemini client
│   └── cache.ts              # Cache localStorage (TTL 24h)
├── types.ts             # Interfaces TypeScript (AIAdapter, AIProvider, etc.)
├── constants.ts         # Catálogo de produtos e artigos
├── App.tsx              # Roteamento de views (home/product/journal/checkout/admin)
└── .env.example         # Template de variáveis de ambiente
```

## Comandos Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento (porta 3000)
npm run build    # Build de produção → dist/
npm run preview  # Preview do build de produção
npm run lint     # Verificação TypeScript (tsc --noEmit)
```

## Variáveis de Ambiente

Configure em `.env.local` (nunca commite este arquivo):

| Variável | Descrição | Obrigatório |
|---|---|---|
| `GEMINI_API_KEY` | Chave Google AI Studio | Para usar Gemini |
| `ANTHROPIC_API_KEY` | Chave Anthropic Console | Para usar Claude |
| `VITE_DEFAULT_AI_PROVIDER` | `"gemini"` ou `"anthropic"` | Não (padrão: gemini) |

## Arquitetura de IA

### Interface `AIAdapter` (types.ts)

Todo provedor implementa:

```typescript
interface AIAdapter {
  provider: AIProvider;                          // 'gemini' | 'anthropic'
  sendMessage(history, newMessage, mode): Promise<string>;
  generateImage(prompt, aspectRatio?): Promise<string | null>;
}
```

### Adicionar Novo Provedor

1. Criar `services/novoProvedor Factory.ts` com singleton do cliente
2. Criar `services/novoProvedorAdapter.ts` implementando `AIAdapter`
3. Exportar o novo adapter em `services/aiAdapter.ts`
4. Adicionar a chave no `.env.example` e no `vite.config.ts`
5. Atualizar `AIProvider` em `types.ts`: `'gemini' | 'anthropic' | 'novo'`

### Modelos Utilizados

| Provedor | Modo `fast` | Modo `complex` |
|---|---|---|
| Gemini | gemini-3.1-flash-lite-preview | gemini-3.1-pro-preview |
| Claude | claude-haiku-4-5-20251001 | claude-sonnet-4-6 |

## Convenções de Código

- **TypeScript estrito** — sem `any`, use as interfaces de `types.ts`
- **Componentes funcionais** com hooks React
- **Tailwind inline** — sem CSS modules, sem arquivos `.css` por componente
- **Cache** — use `services/cache.ts` para respostas de IA (TTL 24h)
- **Sem `form` HTML** — use `onClick`/`onChange` para interações

## Segurança

- **Nunca** commite `.env.local` (está no `.gitignore`)
- Chaves de API são injetadas em build time via `vite.config.ts`
- `dangerouslyAllowBrowser: true` está ativo no Anthropic client — para produção,
  proxifique chamadas por um backend (ex: Cloudflare Workers, Vercel Edge)
- `geminiService.ts` foi removido (código morto — use `aiAdapter.ts`)

## GitHub Actions

O workflow `.github/workflows/deploy.yml`:
- Executa em push para `main` e PRs
- Faz type-check + build com `GEMINI_API_KEY` e `ANTHROPIC_API_KEY` dos Secrets
- Upload do `dist/` como artefato por 7 dias
- Deploy para Hostinger via FTP está disponível (descomentado no workflow)

Configure os secrets no GitHub: `Settings → Secrets → Actions`:
- `GEMINI_API_KEY`
- `ANTHROPIC_API_KEY`
- `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD` (quando ativar deploy automático)

## Tarefas Comuns para Agentes IA

### Adicionar produto ao catálogo
Edite `constants.ts` → array `PRODUCTS`. Siga a interface `Product` de `types.ts`.

### Modificar o sistema de chat
Edite `components/Assistant.tsx`. O adapter é selecionável via state `provider`.

### Alterar o system prompt da IA
Edite a constante `SYSTEM_INSTRUCTION` em `services/aiAdapter.ts`.

### Adicionar nova view/rota
Adicione o tipo em `ViewState` (types.ts) e o case em `App.tsx`.
