# Auth-MFA Spring + React

Sistema de **Autenticación Multifactor (MFA)** implementado con **Spring Boot (Backend)**, **React + Vite (Frontend)** y **PostgreSQL** como base de datos.

Permite a los usuarios registrarse, iniciar sesión y validar su identidad mediante un **código OTP enviado por correo electrónico**, reforzando la seguridad del acceso.

---

## Tecnologías principales

| Componente | Tecnología | Descripción |
|-------------|-------------|--------------|
| **Backend** | Spring Boot 3.5 + Java 17 | API REST con autenticación JWT y envío de correos OTP |
| **Base de datos** | PostgreSQL 15+ | Almacena usuarios y códigos OTP |
| **Frontend** | React 18 + Vite 7 | Interfaz web responsiva y moderna |
| **ORM** | Spring Data JPA (Hibernate) | Persistencia de datos |
| **Correo** | Gmail SMTP + Spring Mail | Envío automático del código OTP |
| **Seguridad** | Spring Security + JWT | Protección de endpoints y sesiones |

---

## Instrucciones de ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/CristianSinoe/auth-mfa-spring-react.git
cd auth-mfa-spring-react
```

---

### 2. Configurar el backend

#### a. Variables de entorno
Editar el archivo:
```bash
backend/.env
```
Ejemplo:
```env
# --- PostgreSQL ---
DB_URL=jdbc:postgresql://localhost:5432/mfa_auth
DB_USERNAME=postgres
DB_PASSWORD=710563

# --- Gmail SMTP ---
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_correo@gmail.com
MAIL_PASSWORD=contraseña_de_aplicacion

# --- JWT ---
JWT_SECRET=supersecreto_para_firmar_tokens
JWT_EXP_MINUTES=60

# --- OTP ---
OTP_EXP_MINUTES=5
OTP_MAX_ATTEMPTS=5
OTP_RESEND_COOLDOWN_SECONDS=60
```

> Usa una **contraseña de aplicación de Gmail**, no tu contraseña personal.

#### b. Ejecutar el backend
Desde la carpeta `/backend`:
```bash
mvn spring-boot:run
```

El backend se ejecutará en:
```
http://localhost:8080
```

---

### 3. Configurar el frontend

Desde `/frontend`:
```bash
npm install
npm run dev
```

El frontend se ejecutará en:
```
http://localhost:5173
```

> Si el backend y frontend están en distintos puertos u orígenes, ya está configurado el **CORS** en `SecurityConfig.java`.

---

## Flujo de autenticación MFA

### 1. **Registro**
El usuario completa el formulario con:
- Nombre
- Apellido paterno
- (Opcional) Apellido materno
- Correo electrónico
- Contraseña

```json
POST /api/auth/register
{
  "firstName": "José Ángel",
  "lastNamePaternal": "Muñoz",
  "lastNameMaternal": "García-López",
  "email": "usuario@gmail.com",
  "password": "MiPassw0rd!"
}
```
 Respuesta:
```json
{"message":"Usuario registrado"}
```

---

### 2. **Inicio de sesión**
El usuario ingresa sus credenciales, y el backend envía un **código OTP al correo**.

```json
POST /api/auth/login
{
  "email": "usuario@gmail.com",
  "password": "MiPassw0rd!"
}
```

Respuesta:
```json
{"message": "OTP enviado al correo"}
```

---

### 3. **Verificación del OTP**
El usuario ingresa el código recibido:
```json
POST /api/auth/verify-otp
{
  "email": "usuario@gmail.com",
  "code": "872437"
}
```

Respuesta:
```json
{"token": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c3Vh..."}
```

---

### 4. **Acceso protegido**
Con el token JWT, el usuario puede acceder a recursos protegidos:

```bash
curl -H "Authorization: Bearer <token>" http://localhost:8080/api/auth/me
```

Respuesta:
```json
{"message":"Hola, usuario@gmail.com"}
```

---

## Interfaz (Frontend)

El frontend tiene un **tema cyberpunk/glitch**, campos con animaciones y un **preloader tipo chip electrónico** durante operaciones.

Pantallas disponibles:
- `/register` → Registro de usuario
- `/login` → Envío del OTP
- `/verify-otp` → Validación del código
- `/success` → Mensaje protegido por JWT

---

## Estructura del proyecto

```
auth-mfa-spring-react/
├── backend/
│   ├── src/main/java/com/sinoe/authmfa/
│   │   ├── config/         # Seguridad, CORS y JWT
│   │   ├── domain/         # Entidades (User, OtpCode)
│   │   ├── dto/            # Estructuras de datos
│   │   ├── security/       # Filtros JWT
│   │   └── web/            # Controladores REST
│   └── resources/
│       └── application.yml
│
└── frontend/
    ├── src/
    │   ├── components/     # Loader y componentes comunes
    │   ├── pages/          # Register, Login, VerifyOtp, Success
    │   ├── api.js          # Comunicación con backend
    │   ├── App.css         # Tema cyber
    │   └── main.jsx        # Enrutamiento principal
    └── vite.config.js
```

---

## Autor

**Cristian Sinoe Hernández Ruiz**  
_Universidad Veracruzana — Ingeniería de Software_  
Práctica: *Autenticación Multifactor (MFA) con Spring Boot y React*  
Materia: **Diseño e Ingeniería de Software**

---

## Futuras mejoras
- Envío de OTP por SMS (Twilio)
- Expiración automática del código
- Panel de administración para usuarios

---

## Licencia
Proyecto de uso educativo — libre distribución con fines académicos.