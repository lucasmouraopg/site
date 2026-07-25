# AGENTS.md — Regras Definitivas e Arquitetura do Projeto Lucas Mourão

## 1. Stack Tecnológica & Infraestrutura
- **Framework:** Next.js 16.2.10 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4, Framer Motion, Embla Carousel.
- **Banco de Dados & CMS:** Supabase (`@supabase/ssr` + `@supabase/supabase-js`).
- **Hospedagem:** Vercel (Domínio: `lucasmourao.com.br`).
- **Admin UUID Restrito:** `7855f56b-16dc-474d-8fb8-44ef9e1072d8`

## 2. Regras Críticas de Arquitetura (NUNCA VIOLAR)
- **Proibido usar `middleware.ts`:** O Next.js 16 deste projeto utiliza obrigatoriamente `src/proxy.ts` com a exportação `proxy()`. Nunca sugira trocar para `middleware.ts`.
- **Server Components First:** Usar `'use client'` apenas onde hooks ou APIs do browser forem estritamente necessários.
- **Rotas e Grupos:** Usar `(public)` para páginas abertas e `(admin)` para o painel de controle restrito.

## 3. Ordem Oficial das Seções na Home Page (`src/app/(public)/page.tsx`)
1. `<Hero />`
2. `<Biografia />`
3. `<PraiaGrande />`
4. `{/* TODO: Seção de Notícias — reservado para futuro */}`
5. `<GaleriaEventos />` (Carrossel dinâmico de álbuns)
6. `<RedesSociais />`
7. `<Agenda />` (Seção isolada com cards + modal de detalhes)
8. `<Newsletter />` (Strip com botão que abre modal de captura de leads)
9. `<Footer />` (Com o WeatherWidget integrado)

## 4. Regras do Widget de Clima (`WeatherWidget`)
- **Localização:** Fica posicionado exclusivamente no Rodapé (`Footer`).
- **Comportamento Rotativo (Carrossel):** Alterna as 7 cidades padrão da região/SP mais a 8ª cidade coringa detectada pelo IP do visitante (via rota `/api/geolocation` com `ip-api.com` e fallback gracioso).
- **Design e Controles Visuais:**
  - Indicadores de página em formato de **bolinhas simétricas** (proibido usar traços/pílulas esticadas).
  - Presença de **setinhas laterais de navegação (< e >)** dentro do card para o usuário avançar ou voltar de cidade manualmente quando desejar.