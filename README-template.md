# Angular Template Starter Checklist

## 1) Configuracion inicial
- Ajustar `src/environments/environment*.ts` con `apiUrl`.
- Cambiar `title` en `src/app/app.ts`.
- Reemplazar branding visual (logo, colores, tipografia) en `src/styles/`.

## 2) Arquitectura base
- Crear nuevas pantallas solo dentro de `src/app/features/`.
- Mantener componentes reutilizables en `src/app/shared/components/`.
- Mantener servicios transversales en `src/app/core/services/`.

## 3) UX global ya incluida
- Alerts globales: `AlertService` + `AlertHostComponent`.
- Toast global: `ToastService` + `ToastHostComponent`.
- Confirm modal global: `ConfirmService` + `ConfirmHostComponent`.
- Spinner/Loading global: `SpinnerService` + `SpinnerHostComponent`.
- Paginacion reusable: `PaginationComponent`.

## 4) HTTP y seguridad
- Cliente API base: `ApiService`.
- Interceptores:
  - `http-loading-interceptor` (spinner automatico en requests).
  - `http-error-interceptor` (manejo centralizado de errores).
- Guard de auth: `authGuard`.

## 5) Calidad de codigo
- Instalar deps: `npm install`.
- Lint: `npm run lint`.
- Autocorregir lint: `npm run lint:fix`.
- Formatear: `npm run format`.
- Build de validacion: `npm run build`.

## 6) Generadores con convencion
- Crear feature completa (page + model + service + route):
  - `npm run generate:feature -- dashboard`
- Crear componente dentro de una feature:
  - `npm run generate:component -- dashboard kpi-card`
- Tambien aceptan flags largos:
  - `npm run generate:feature -- --name dashboard`
  - `npm run generate:component -- --feature dashboard --name kpi-card`
- Los generadores escriben usando esta estructura:
  - `src/app/features/<feature>/...`
  - `src/app/core/models/<feature>.model.ts`
  - `src/app/core/services/<feature>/<feature>.service.ts`

## 7) Al iniciar proyecto nuevo
- Crear features iniciales (`dashboard`, `auth`, `settings`, etc.).
- Ajustar `features.routes.ts`.
- Definir contratos de API en `core/models`.
- Agregar pruebas minimas por feature critica.
