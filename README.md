<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Achadinhos Maternidade — Site

E-commerce SPA para produtos de maternidade, com IA integrada (chat + geração de imagens via Google Gemini).  
Construído com **React 19 + Vite + TypeScript + Tailwind CSS**.

View your app in AI Studio: https://ai.studio/apps/e58668c2-bdb8-4dba-8e93-f8d25a713491

---

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

---

## Licença / License

Este projeto está licenciado sob a **Apache License 2.0** — veja o arquivo [LICENSE](./LICENSE) para detalhes.  
Sim, você pode reutilizar o código deste repositório nos seus próprios apps, desde que mantenha os avisos de licença originais.

> **This project is licensed under the Apache License 2.0** — see [LICENSE](./LICENSE).  
> You are free to reuse, adapt, and distribute the code in your own applications as long as you retain the original license notices.

---

## Estrutura do Projeto / Project Structure

```
.
├── App.tsx                 # Root component — routing/view state
├── index.tsx               # Entry point
├── types.ts                # TypeScript interfaces (Product, JournalArticle, ChatMessage, …)
├── constants.ts            # Static data: PRODUCTS, JOURNAL_ARTICLES, BRAND_NAME
├── components/
│   ├── Navbar.tsx          # Sticky header with cart badge + mobile menu
│   ├── Hero.tsx            # Full-screen hero section
│   ├── ProductGrid.tsx     # Filterable product grid by category
│   ├── ProductCard.tsx     # Individual product card (lazy-loaded image, hover overlay)
│   ├── ProductDetail.tsx   # Full product detail view
│   ├── About.tsx           # Brand story section
│   ├── Features.tsx        # Feature highlight blocks
│   ├── Journal.tsx         # Editorial articles list
│   ├── JournalDetail.tsx   # Full article view
│   ├── CartDrawer.tsx      # Slide-in cart drawer
│   ├── Checkout.tsx        # Checkout summary page
│   ├── Assistant.tsx       # Floating AI chat widget (text + image generation)
│   ├── ImageGenerator.tsx  # Standalone AI image generation form
│   ├── AdminConfig.tsx     # Admin panel — add/edit products, AI image generation
│   ├── Button.tsx          # Reusable button component (primary / secondary / outline)
│   └── Footer.tsx          # Footer with newsletter subscription + admin access
└── services/
    ├── aiAdapter.ts        # Unified AI adapter (GeminiAdapter) with chat + image generation
    ├── aiFactory.ts        # Singleton factory for @google/genai client
    ├── cache.ts            # In-memory LRU-style cache for AI responses
    └── geminiService.ts    # (legacy — kept for reference)
```

---

## Componentes Reutilizáveis / Reusable Components

### `Button` (`components/Button.tsx`)
Botão genérico com três variantes.

```tsx
import { Button } from './components/Button';

<Button variant="primary">Comprar</Button>
<Button variant="secondary">Salvar</Button>
<Button variant="outline">Cancelar</Button>
```

### `ProductCard` (`components/ProductCard.tsx`)
Cartão de produto com imagem lazy-loaded, overlay ao hover e badge de admin.

```tsx
import ProductCard from './components/ProductCard';

<ProductCard product={product} onClick={(p) => console.log(p)} />
```

### `CartDrawer` (`components/CartDrawer.tsx`)
Gaveta lateral de carrinho.

```tsx
import CartDrawer from './components/CartDrawer';

<CartDrawer
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
  items={cartItems}
  onRemoveItem={(index) => removeFromCart(index)}
  onCheckout={() => goToCheckout()}
/>
```

### `Assistant` (`components/Assistant.tsx`)
Widget flutuante de chat com IA (texto e geração de imagens).  
Basta renderizá-lo no root do app — gerencia seu próprio estado interno.

```tsx
import Assistant from './components/Assistant';

<Assistant />
```

### `ImageGenerator` (`components/ImageGenerator.tsx`)
Formulário de geração de imagens via Gemini.

```tsx
import ImageGenerator from './components/ImageGenerator';

<ImageGenerator onImageGenerated={(url) => setImageUrl(url)} />
```

---

## Serviços Reutilizáveis / Reusable Services

### `GeminiAdapter` (`services/aiAdapter.ts`)
Adaptador de IA com cache embutido para chat e geração de imagens.

```ts
import { GeminiAdapter } from './services/aiAdapter';

// Chat
const reply = await GeminiAdapter.sendMessage(history, 'Qual produto você recomenda?', 'fast');

// Image generation
const imageUrl = await GeminiAdapter.generateImage('berço minimalista branco');
```

**Variáveis de ambiente necessárias:**
```
GEMINI_API_KEY=sua_chave_aqui
```

### `cache` (`services/cache.ts`)
Cache em memória simples, reutilizável para qualquer chave/valor.

```ts
import { cache } from './services/cache';

cache.set('minha-chave', 'valor');
const valor = cache.get('minha-chave');
```

---

## Tipos / Types (`types.ts`)

```ts
// Principais interfaces exportadas
export interface Product { id, name, tagline, description, price, category, imageUrl, features, … }
export interface JournalArticle { id, title, date, excerpt, image, content }
export interface ChatMessage { role, text, timestamp, imageUrl? }
export enum LoadingState { IDLE, LOADING, ERROR, SUCCESS }
export type ViewState = 'home' | 'product' | 'journal' | 'checkout' | 'admin'
```
