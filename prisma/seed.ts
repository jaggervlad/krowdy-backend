import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear plantas
  const plants = await prisma.plant.createMany({
    data: [
      { name: 'Planta Norte', location: 'Ciudad A' },
      { name: 'Planta Sur', location: 'Ciudad B' },
      { name: 'Planta Este', location: 'Ciudad C' },
      { name: 'Planta Oeste', location: 'Ciudad D' },
    ],
  });

  // Obtener plantas creadas
  const allPlants = await prisma.plant.findMany();

  // Crear operaciones
  const operations = [];
  for (const [i, plant] of allPlants.entries()) {
    operations.push(
      await prisma.operation.create({
        data: {
          name: `Operación ${i + 1}A`,
          description: `Descripción operación ${i + 1}A`,
          plantId: plant.id,
        },
      })
    );
    operations.push(
      await prisma.operation.create({
        data: {
          name: `Operación ${i + 1}B`,
          description: `Descripción operación ${i + 1}B`,
          plantId: plant.id,
        },
      })
    );
  }

  // Crear costos por operación y volumen
  const volumeRanges = ['300kg', '500kg', '1T', '3T', '5T', '10T', '20T', '30T'];
  for (const operation of operations) {
    for (const [j, range] of volumeRanges.entries()) {
      await prisma.operationCost.create({
        data: {
          operationId: operation.id,
          volumeRange: range,
          cost: 100 + j * 50 + Math.floor(Math.random() * 50),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
