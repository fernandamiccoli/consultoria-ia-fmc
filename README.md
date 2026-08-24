# Consultoría IA FMC

Web premium en español para consultoría de transformación e inteligencia artificial orientada a empresas e instituciones educativas.

## Enfoque

La web posiciona la IA como transformación organizacional, no como una colección de herramientas. La arquitectura visual y de contenido prioriza estrategia, personas, procesos y tecnología.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Variables de entorno

Crear `.env.local` a partir de `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_URL=https://zanxjjhqhogbaliqsfbp.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_clave_privada_server_only
```

`SUPABASE_SERVICE_ROLE_KEY` debe configurarse solo en entorno servidor y nunca debe exponerse como variable `NEXT_PUBLIC_`.

## Supabase

La tabla del formulario se define en `supabase/schema.sql`.

Proyecto conectado:

- Project ref: `zanxjjhqhogbaliqsfbp`
- Región: `us-west-2`
- Tabla: `public.contact_submissions`

## Verificación

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```

El formulario valida campos en servidor, rechaza segmentos fuera de la propuesta y usa honeypot antispam.
