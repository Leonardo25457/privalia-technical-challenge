# Privalia Technical Challenge — Landing + Quote Flow + Firebase Auth

Reto técnico que incluye un flujo completo de cotización (desktop & mobile), login con Firebase, protección de rutas, persistencia de sesión y despliegue listo para producción en Vercel.

## 🚀 Características Principales

| Módulo | Descripción |
|--------|----------------|
| `login.html` | **Pantalla inicial**. Login con Email/Password y Google usando Firebase Auth. |
| `quote.html` | Paso 1 del flujo de cotización. Form con validaciones, máscaras y UX alineado al mockup. |
| `results.html` | Vista de tarifas/rates con render dinámico de planes y opciones de compra. |
| Header con Logout | Muestra email del usuario autenticado y permite cerrar sesión de forma segura. |
| Guard de rutas | Si no hay sesión → redirige automáticamente a `login.html`. |

## 🔐 Autenticación & Seguridad

- Firebase Auth con Email/Password + Google Sign-In.
- Persistencia de sesión en `localStorage`.
- **auth-guard.js** bloquea rutas si no hay sesión válida.
- Botón “Salir” limpia sesión (Firebase + localStorage) y redirige al login.

---

## Cómo correr
Abre `index.html` o `login.html` con Live Server (VS Code) o cualquier servidor estático.
Los CDNs de Bootstrap/Firebase se cargan desde Internet.

- Validaciones nativas + personalizadas (edad 18+, email válido, campos requeridos).
- Máscaras de entrada para teléfono y fecha.
- Persistencia de estado entre páginas usando `localStorage`.
- Componentización de UI mediante partials reutilizables (header/footer).
- UX consistente con Bootstrap 5 + estilos custom.
- Resposive design full mobile-first.

