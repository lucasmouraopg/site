# Design System - Lucas Mourão

## Cores

### Primárias
```css
--color-primary: #1E3A5F;        /* Azul escuro (profissionalismo) */
--color-primary-light: #2E5090;  /* Azul médio (hover) */
--color-primary-dark: #0F2440;   /* Azul muito escuro (fundo) */
```

### Secundárias
```css
--color-accent: #3B82F6;         /* Azul brilhante (CTAs) */
--color-accent-light: #60A5FA;   /* Azul claro (links) */
```

### Neutras
```css
--color-white: #FFFFFF;
--color-gray-50: #F8FAFC;
--color-gray-100: #F1F5F9;
--color-gray-200: #E2E8F0;
--color-gray-300: #CBD5E1;
--color-gray-400: #94A3B8;
--color-gray-500: #64748B;
--color-gray-600: #475569;
--color-gray-700: #334155;
--color-gray-800: #1E293B;
--color-gray-900: #0F172A;
```

### Gradientes
```css
--gradient-hero: linear-gradient(180deg, rgba(30,58,95,0.8) 0%, rgba(15,36,64,0.95) 100%);
```

---

## Tipografia

### Display - Títulos grandes
```css
font-family: 'Montserrat', sans-serif;
font-weight: 800; /* ExtraBold */
```

### Headlines - Subtítulos
```css
font-family: 'Montserrat', sans-serif;
font-weight: 600; /* SemiBold */
```

### Body - Texto
```css
font-family: 'Inter', sans-serif;
font-weight: 400; /* Regular */
```

### Accent - Destaques
```css
font-family: 'Montserrat', sans-serif;
font-weight: 700; /* Bold */
```

---

## Espaçamentos

### Grid System (8px base)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

## Breakpoints

```css
--breakpoint-sm: 640px;    /* Mobile landscape */
--breakpoint-md: 768px;    /* Tablet */
--breakpoint-lg: 1024px;   /* Desktop */
--breakpoint-xl: 1280px;   /* Large desktop */
--breakpoint-2xl: 1536px;  /* Extra large desktop */
```

---

## Componentes

### Botões

#### Primário
```css
background: var(--color-accent);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s ease;
```

#### Hover
```css
background: var(--color-primary-light);
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
```

#### Secundário
```css
background: transparent;
color: var(--color-accent);
border: 2px solid var(--color-accent);
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
transition: all 0.2s ease;
```

### Cards

#### Padrão
```css
background: white;
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
```

#### Hover
```css
transform: translateY(-4px);
box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## Animações

### Transições Padrão
```css
transition: all 0.2s ease;    /* Rápido */
transition: all 0.3s ease;    /* Normal */
transition: all 0.5s ease;    /* Lento */
```

### Hover Effects
```css
transform: translateY(-2px);   /* Levantar */
transform: scale(1.02);        /* Aumentar */
```

### Scroll Reveal
```css
opacity: 0;
transform: translateY(20px);
transition: opacity 0.6s ease, transform 0.6s ease;
```

---

## Sombras

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

---

## Bordas

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```
