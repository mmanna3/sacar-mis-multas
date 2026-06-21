# Deploy en Cloudflare Pages

Guía para conectar este repositorio a Cloudflare Pages y desplegar automáticamente en cada push a `main`.

## Framework detectado

| Campo | Valor |
| --- | --- |
| Framework | **Vite 6** + **React 18** |
| Origen | Exportación de Figma Make |
| Tipo de sitio | **Estático** (HTML/CSS/JS generado en build) |
| Enrutamiento | **Una sola página** con anclas (`#inicio`, `#servicios`, etc.). **No usa React Router** en el código actual. |

## Configuración en Cloudflare Pages

Al crear el proyecto en [Cloudflare Pages](https://pages.cloudflare.com/) conectado a GitHub:

| Setting | Valor |
| --- | --- |
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (raíz del repo) |

Cloudflare detectará Vite automáticamente si usás el preset **Vite**; los valores anteriores son equivalentes.

### Versión de Node recomendada

**Node.js 20 LTS** (`>=20`).

El repositorio incluye:

- `.node-version` → `20`
- `"engines": { "node": ">=20" }` en `package.json`

Cloudflare Pages lee `.node-version` durante el build. Alternativa: definir la variable de entorno `NODE_VERSION=20` en el dashboard.

## Build en entorno limpio

Verificado localmente con:

```bash
npm ci
npm run build
```

El comando genera la carpeta `dist/` con assets estáticos listos para servir.

Para probar el build de producción en local:

```bash
npm run preview
```

## Variables de entorno

### Requeridas

**Ninguna.** El proyecto no usa `import.meta.env` ni `process.env` en el código actual.

### Opcionales

| Variable | Descripción |
| --- | --- |
| `VITE_WHATSAPP_URL` | Reservada para futuro uso. Hoy el enlace de WhatsApp está hardcodeado en `src/app/App.tsx` como `https://wa.me/`. Actualizalo ahí antes de producción o implementá soporte con esta variable. |

Ver `.env.example` en la raíz del proyecto.

## Consideraciones para producción

### Sitio estático

Vite emite un sitio 100 % estático en `dist/`. No requiere servidor Node, Functions ni Workers en runtime.

### Rutas y SPA fallback

- La navegación interna usa **anclas HTML** (`href="#seccion"`), no rutas de cliente.
- **No se necesita** `_redirects` con fallback a `index.html` en el estado actual.
- `react-router` está listado en `package.json` pero **no se importa** en el código. Si en el futuro agregás rutas con React Router (`BrowserRouter`), creá `public/_redirects` con:

  ```
  /*    /index.html   200
  ```

  Cloudflare Pages copiará ese archivo a `dist/` durante el build (Vite incluye todo lo de `public/`).

### Rutas absolutas y assets

- Vite usa `base: '/'` (por defecto). Correcto para deploy en la raíz del dominio (`tudominio.com`).
- Si el sitio se publicara en un **subpath** (p. ej. `tudominio.com/app/`), habría que configurar `base` en `vite.config.ts`.
- Imágenes y fuentes se resuelven en build time; no hay dependencias de `localhost`.

### Headers de seguridad y caché

El archivo `public/_headers` se copia a `dist/` e incluye:

- Headers de seguridad básicos (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- Caché larga e inmutable para `/assets/*` (archivos con hash en el nombre)

### Dependencias externas en runtime

- Google Fonts se cargan desde `fonts.googleapis.com` (`src/styles/fonts.css`).
- Enlaces externos: WhatsApp (`wa.me`) y consulta de infracciones (sitio del Gobierno de Buenos Aires).

### Meta robots

`index.html` incluye `<meta name="robots" content="noindex, nofollow">`. Quitá o cambiá esa línea cuando quieras que el sitio sea indexable por buscadores.

## Pasos para conectar GitHub

1. Subí el repositorio a GitHub (si aún no está).
2. En Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Elegí el repositorio y la rama `main`.
4. Confirmá:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy. Cada push a `main` generará un nuevo deploy automático.

## Checklist pre-lanzamiento

- [ ] Actualizar el número de WhatsApp en `src/app/App.tsx` (`WHATSAPP`).
- [ ] Revisar `noindex, nofollow` en `index.html` si querés SEO.
- [ ] Verificar que el dominio custom apunte al proyecto de Pages.
- [ ] Probar el sitio en la URL de preview de Cloudflare antes de usar el dominio final.
