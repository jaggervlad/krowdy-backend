# Krowdy Backend

Este proyecto es el backend de Krowdy, desarrollado en Node.js con TypeScript y Prisma ORM.

## Requisitos

- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL (o la base de datos configurada en `prisma/schema.prisma`)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <REPO_URL>
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y agrega la cadena de conexión de la base de datos:
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
   ```

## Migraciones de Base de Datos

Para aplicar las migraciones de Prisma:
```bash
npx prisma migrate dev
```

## Seed de Base de Datos

Para poblar la base de datos con datos iniciales:
```bash
npm run db:seed
```

## Ejecución en Desarrollo

Para iniciar el servidor en modo desarrollo:
```bash
npm run start:dev
```

## Estructura del Proyecto

- `src/` - Código fuente principal
  - `common/` - Utilidades y tipos comunes
  - `config/` - Configuración de GraphQL y Prisma
  - `operation/`, `operation-cost/`, `plant/`, `users/` - Módulos de dominio
- `prisma/` - Esquema y migraciones de la base de datos

## Scripts Útiles

- `npm run start:dev` - Inicia el servidor en modo desarrollo
- `npm run db:seed` - Ejecuta el seed de la base de datos
- `npx prisma migrate dev` - Aplica migraciones de Prisma

## Notas

- Asegúrate de tener la base de datos corriendo antes de iniciar el proyecto.
- Modifica el archivo `.env` según tu entorno local.

