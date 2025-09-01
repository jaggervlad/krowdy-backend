# Definición de la Base de Datos

## Parte 1: Modelado de Base de Datos (con Prisma)

### Tablas Principales

#### 1. Plant (Planta)
Representa una planta o unidad operativa.

- **Campos principales:**
  - id (Int, PK)
  - name (String)
  - ...otros campos relevantes

#### 2. Operation (Operación)
Representa una operación realizada en una planta.

- **Campos principales:**
  - id (Int, PK)
  - name (String)
  - plantId (FK a Plant)
  - ...otros campos relevantes

#### 3. OperationCost (Costo de Operación)
Representa los costos indirectos asociados a una operación.

- **Campos principales:**
  - id (Int, PK)
  - amount (Float)
  - operationId (FK a Operation)
  - ...otros campos relevantes

### Relaciones entre Entidades

- **Una Planta puede tener muchas Operaciones**
  - Relación: 1 a N (Plant → Operation)
- **Una Operación puede tener muchos Costos de Operación**
  - Relación: 1 a N (Operation → OperationCost)
