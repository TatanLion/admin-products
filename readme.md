# Admin Productos PERN

Sistema de administración de productos desarrollado con el stack PERN (PostgreSQL, Express, React, Node.js). Permite realizar operaciones CRUD completas para la gestión de productos con una interfaz moderna y API RESTful.

## Características principales ✨

- **Backend RESTful API** con Express.js y TypeScript
- **Frontend moderno** con React 19 y TypeScript
- **Base de datos** PostgreSQL con Sequelize ORM
- **Estilos** con TailwindCSS
- **Testing** con Jest y Supertest
- **Documentación API** con Swagger
- **Validación** con Express Validator y Valibot
- **Manejo de estados** con React Router DOM

### Pre-requisitos 📋

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [pnpm](https://pnpm.io/) (gestor de paquetes recomendado)

### Instalación 🔧

1. **Clona el repositorio**

_Para HTTPS_
```bash
git clone https://github.com/TatanLion/admin-products.git
```

2. **Navega al directorio del proyecto**
```bash
cd admin-products
```

3. **Instala las dependencias del backend**
```bash
cd backend
pnpm install
```

4. **Instala las dependencias del frontend**
```bash
cd ../frontend
pnpm install
```

5. **Configura las variables de entorno**

Crea un archivo `.env` en la carpeta `backend` con:
```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/admin_productos
NODE_ENV=development
PORT=4000
```


7. **Ejecuta el proyecto**

**Backend** (Puerto 4000):
```bash
cd backend
pnpm run dev
```

**Frontend** (Puerto 5173):
```bash
cd frontend
pnpm run dev
```

## Scripts disponibles 📝

### Backend
- `pnpm run dev` - Inicia el servidor en modo desarrollo
- `pnpm run test` - Ejecuta las pruebas
- `pnpm run test:coverage` - Ejecuta las pruebas con reporte de cobertura

### Frontend
- `pnpm run dev` - Inicia el servidor de desarrollo
- `pnpm run build` - Construye la aplicación para producción
- `pnpm run preview` - Vista previa de la construcción de producción
- `pnpm run lint` - Ejecuta el linter

## Estructura del proyecto 📁

```
admin-products/
├── backend/
│   ├── src/
│   │   ├── handlers/          # Controladores de rutas
│   │   ├── models/            # Modelos de Sequelize
│   │   ├── middlewares/       # Middlewares personalizados
│   │   ├── config/            # Configuración de DB y Swagger
│   │   ├── __tests__/         # Pruebas unitarias
│   │   ├── router.ts          # Definición de rutas
│   │   ├── server.ts          # Configuración del servidor
│   │   └── index.ts           # Punto de entrada
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── views/             # Páginas principales
│   │   ├── layouts/           # Layouts de la aplicación
│   │   ├── services/          # Servicios para API calls
│   │   ├── schemas/           # Esquemas de validación
│   │   ├── router.tsx         # Configuración de rutas
│   │   └── main.tsx           # Punto de entrada
│   └── package.json
└── README.md
```

## API Endpoints 🔗

La API RESTful incluye los siguientes endpoints:

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto
- `PATCH /api/products/:id` - Actualizar disponibilidad del producto
- `DELETE /api/products/:id` - Eliminar un producto

Documentación completa disponible en: `http://localhost:4000/docs`

## Construido con 🛠️

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **TypeScript** - Lenguaje de programación
- **PostgreSQL** - Base de datos
- **Sequelize** - ORM
- **Jest** - Testing framework
- **Swagger** - Documentación de API
- **Express Validator** - Validación de datos

### Frontend
- **React 19** - Biblioteca de UI
- **TypeScript** - Lenguaje de programación
- **Vite** - Build tool
- **TailwindCSS** - Framework de CSS
- **React Router DOM** - Enrutamiento
- **Axios** - Cliente HTTP
- **Valibot** - Validación de esquemas

## Testing 🧪

El proyecto incluye pruebas unitarias para el backend:

```bash
cd backend
pnpm run test
```

Para ver el reporte de cobertura:
```bash
pnpm run test:coverage
```

## Contribuyendo 🖇️

Por favor lee el [CONTRIBUTING.md](https://github.com/TatanLion/admin-products) para detalles de nuestro código de conducta, y el proceso para enviarnos pull requests.

## Autores ✒️

* **Jonathan Amaya** - *Ing Sistemas - Desarrollador Web* - [TatanLion](https://github.com/TatanLion)

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo. 
* Da las gracias públicamente 🤓.
* Contribuye al proyecto con mejoras y nuevas características 🚀

---
⌨️ con ❤️ por [TatanLion](https://github.com/TatanLion) 😊