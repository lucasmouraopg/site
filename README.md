# Lucas Mourão - Site Institucional

## 🚀 Tecnologias Utilizadas

- **Frontend:** Next.js 14+ (App Router)
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Imagens:** Cloudinary (auto=format, auto=compress)
- **Hosting:** Vercel
- **Animações:** Framer Motion
- **Scroll Suave:** Lenis
- **Estilo:** Tailwind CSS v4
- **API Clima:** OpenWeatherMap

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Criar arquivo .env.local
cp .env.example .env.local

# Preencher variáveis de ambiente
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
# OPENWEATHER_API_KEY=

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🎨 Paleta de Cores

- **Primária:** `#1E3A5F` (Azul escuro)
- **Secundária:** `#3B82F6` (Azul brilhante)
- **Fundo:** `#0F2440` (Azul muito escuro)

## 📁 Estrutura de Pastas

```
lucas-mourao/
├── src/
│   ├── app/                    # Páginas Next.js
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, Biografia, Galeria, Videos
│   │   └── ui/                # Componentes reutilizáveis
│   ├── lib/                   # Utilitários (Supabase, Weather)
│   └── types/                 # Tipos TypeScript
├── public/                    # Arquivos estáticos
├── assets/images/             # Imagens do projeto
│   ├── hero/
│   ├── bio/
│   ├── galeria/
│   └── ...
└── DESIGN-SYSTEM.md           # Documentação de design
```

## 🔧 CMS (Supabase)

### Tabelas Principais

1. **configuracoes** - Configurações gerais do site
2. **galeria_albuns** - Álbuns de fotos
3. **galeria_fotos** - Fotos dos álbuns
4. **videos** - Vídeos do YouTube
5. **redes_sociais** - Links das redes sociais

### Acesso ao CMS

O CMS será acessado via Supabase Studio:
```
https://<seu-projeto>.supabase.co/project/default/editor
```

## 📱 Responsividade

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

## 🔍 SEO

- Meta tags por página
- Open Graph para compartilhamento
- Schema.org (Person, WebSite)
- Sitemap.xml
- Robots.txt

## 🚀 Deploy

### Vercel

1. Conectar repositório ao Vercel
2. Configurar variáveis de ambiente
3. Adicionar domínio personalizado
4. Ativar HTTPS

### Domínio

- **Produção:** lucasmourao.com.br
- **Preview:** lucas-mourao.vercel.app

## 📊 Analytics

- Google Analytics 4
- Eventos de conversão configurados

## 🎯 Próximos Passos

1. [ ] Configurar Supabase e criar tabelas
2. [ ] Configurar Cloudinary
3. [ ] Adicionar API key do OpenWeatherMap
4. [ ] Subir fotos para o Cloudinary
5. [ ] Configurar CMS no Supabase
6. [ ] Testar formulário de contato
7. [ ] Configurar domínio no Vercel
8. [ ] Testar em todos os dispositivos

## 🐛 Problemas Conhecidos

- Nenhum no momento

## 📄 Licença

© 2024 Lucas Mourão. Todos os direitos reservados.
