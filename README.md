# Rockwell OT Cybersecurity Frontend

[![CI](https://github.com/jorgenavarro13/rockwell_ot_cybersecurity_frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/jorgenavarro13/rockwell_ot_cybersecurity_frontend/actions/workflows/ci.yml)

Frontend web para un juego educativo de ciberseguridad en entornos OT (Operaciones Tecnológicas), desarrollado para la materia *Software Construction FJ2026* en colaboración con Rockwell Automation.

Los usuarios crean una cuenta, juegan escenarios de ciberseguridad, acumulan puntaje y compiten en un ranking global. Los administradores gestionan usuarios desde un dashboard con filtros y ordenamiento avanzados.

---

## Tech Stack

| Tecnología | Versión | Rol |
|---|---|---|
| React | ^19.2.0 | Framework UI |
| Vite + SWC | ^7.3.1 | Build tool y servidor de desarrollo |
| React Router DOM | ^7.13.1 | Enrutamiento client-side (HashRouter) |
| @headlessui/react | ^2.2.9 | Componentes accesibles (selector de países) |
| react-icons | ^5.5.0 | Íconos SVG |
| i18n-iso-countries | ^7.14.0 | Datos e íconos de países |
| gh-pages | ^6.3.0 | Despliegue a GitHub Pages |
| Vitest | latest | Testing unitario (rama `main`) |
| @testing-library/react | latest | Renderizado en tests (rama `main`) |

---

## Estructura del Repositorio

```
rockwell_ot_cybersecurity_frontend/
├── index.html              # Punto de entrada HTML
├── vite.config.js          # Config de Vite (base path para GitHub Pages)
├── eslint.config.js        # Reglas de ESLint
├── package.json            # Dependencias y scripts
├── .env                    # Variables de entorno locales
├── UNIT_TESTS.md           # Casos de prueba unitarios documentados
├── CI/
│   
├── dist/                   # Build de producción (git ignored excepto deploy)
└── src/
    ├── main.jsx            # Punto de entrada React
    ├── App.jsx             # Router y definición de rutas
    ├── ProtectedRoute.jsx  # Guard de autenticación → /login
    ├── AdminRoute.jsx      # Guard de rol admin → /login
    ├── api/client.js       # Cliente HTTP (placeholder)
    ├── assets/             # Imágenes y GIFs
    ├── components/         # Navbar, Footer (reutilizables)
    ├── context/
    │   └── AuthContext.jsx # Estado global de autenticación
    ├── pages/              # Home, Login, Register, Game, Ranking, Dashboard
    └── services/           # Funciones de llamada a la API
```

---

## Rutas de la Aplicación

| Path | Acceso | Descripción |
|---|---|---|
| `/` | Público | Landing page |
| `/login` | Público | Inicio de sesión |
| `/register` | Público | Registro de nuevo usuario |
| `/ranking` | Público | Tabla de líderes global |
| `/game` | Autenticado | Juego principal |
| `/dashboard` | Admin | Panel de administración de usuarios |

---

## Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/jorgenavarro13/rockwell_ot_cybersecurity_frontend.git
cd rockwell_ot_cybersecurity_frontend

# Instalar dependencias
npm install

# Configurar variable de entorno
# Crear .env con:
VITE_API=http://localhost:3000

# Iniciar servidor de desarrollo
npm run dev
```

---

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API` | URL base del backend API | `http://localhost:3000` |

En producción, `VITE_API` se inyecta como secreto de GitHub Actions durante el build.

---

## Scripts Disponibles

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `vite` | Servidor de desarrollo con HMR |
| `build` | `vite build` | Build de producción en `dist/` |
| `preview` | `vite preview` | Preview del build localmente |
| `lint` | `eslint .` | Análisis estático de código |
| `deploy` | `gh-pages -d dist` | Deploy manual a GitHub Pages |
| `test` | `vitest` | Ejecutar tests unitarios (rama `main`) |
| `test:coverage` | `vitest run --coverage` | Tests con reporte de cobertura (rama `main`) |

---

## CI/CD Pipeline

El pipeline está configurado con **GitHub Actions** en la rama `main` (`.github/workflows/`).

### Integración Continua — `ci.yml`

**Trigger:** Push a cualquier rama + Pull Requests hacia `main`

```
Push / PR
    │
    ▼
Checkout código
    │
    ▼
Setup Node.js 20 (con caché npm)
    │
    ▼
npm ci (instalación reproducible)
    │
    ▼
npm run test:coverage
    │
    ▼
Upload reporte de cobertura (artefacto, 7 días)
```

### Despliegue Continuo — `deploy.yml`

**Trigger:** Push a la rama `main` únicamente

```
Push a main
    │
    ▼
Checkout código
    │
    ▼
Setup Node.js 20
    │
    ▼
npm ci
    │
    ▼
npm run build
(VITE_API inyectado desde secrets.VITE_API)
    │
    ▼
Configurar GitHub Pages
    │
    ▼
Upload dist/ como artefacto de Pages
    │
    ▼
Deploy a GitHub Pages
```

**URL de producción:** `https://jorgenavarro13.github.io/rockwell_ot_cybersecurity_frontend/`

### Notas del Pipeline

- Usa `npm ci` en lugar de `npm install` para builds reproducibles.
- El secreto `VITE_API` debe estar configurado en *Settings → Secrets and variables → Actions* del repositorio.
- Solo un deploy puede correr a la vez (concurrencia limitada en `deploy.yml`).
- Los reportes de cobertura quedan disponibles como artefactos descargables por 7 días.

---

## Despliegue en GitHub Pages

El proyecto está configurado para desplegarse en GitHub Pages como sitio estático.

- **Base path:** `/rockwell_ot_cybersecurity_frontend/` (configurado en `vite.config.js`)
- **Router:** `HashRouter` (requerido para rutas client-side sin servidor)
- **Deploy manual:** `npm run build && npm run deploy`
- **Deploy automático:** merge a `main` dispara `deploy.yml`

---

