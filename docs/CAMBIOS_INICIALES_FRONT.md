# 📋 Documentación de Migración y Autenticación - Sistema de Gestión de Gimnasio

Este documento detalla la migración completa del frontend tradicional a una arquitectura moderna basada en React con TypeScript y Metronic UI, así como la integración punta a punta con el backend (Node.js, Express, MikroORM, Zod, Argon2 y MySQL).

---

## 1. Migración y Estructura del Frontend (React + TypeScript + Metronic UI)
* **Diseño y Layouts**: Implementación de interfaces con la estética de Metronic mediante un diseño de pantalla dividida (`login-page`, `login-aside`, `login-content`), fondos institucionales y logotipos.
* **Enrutamiento (`App.tsx`)**: Configuración de `react-router-dom` para manejar las vistas principales:
  * `/login`: Inicio de sesión.
  * `/register`: Registro de nuevos usuarios.
  * `/forgot-password`: Recuperación y blanqueo directo de contraseña.
  * `/dashboard`: Panel principal protegido tras la autenticación.
  * Redirección por defecto (`*`) hacia `/login`.

## 2. Componentes de Autenticación Desarrollados
* **`Login.tsx`**: Formulario de acceso que se comunica con el servicio de autenticación y gestiona estados de carga y errores.
* **`Register.tsx`**: Formulario de alta de usuarios, adaptado para enviar la propiedad `name` en consonancia con los esquemas del backend.
* **`ForgotPassword.tsx`**: Interfaz para el restablecimiento de contraseña mediante correo electrónico y actualización directa.

## 3. Servicios y Comunicación HTTP (`auth.service.ts`)
* Centralización de llamadas asíncronas (`fetch`) hacia la API REST del backend (`http://localhost:3000/api`).
* Métodos implementados: `loginUser` y `registerUser`.

## 4. Backend, Base de Datos y Seguridad
* **Validación de Datos (Zod - `usuario.schema.ts`)**: Validación estricta de correos electrónicos y políticas robustas de contraseñas (mínimo 8 caracteres, al menos una mayúscula, un número y un símbolo especial).
* **Cifrado de Credenciales (Argon2)**: Las contraseñas son hasheadas de forma segura antes de ser persistidas en MySQL.
* **Persistencia (MikroORM & MySQL)**: Uso de la entidad `Usuarios` para operaciones seguras en la base de datos.
* **End-points del Servidor (`usuario.controller.ts` y `usuario.routes.ts`)**:
  * `POST /api/usuarios`: Registro de usuarios con validación de duplicados.
  * `POST /api/usuarios/login`: Autenticación y emisión de tokens JWT (Access y Refresh tokens).
  * `POST /api/usuarios/forgot-password`: Blanqueo de contraseña, re-hasheo con Argon2 y actualización directa en MySQL.