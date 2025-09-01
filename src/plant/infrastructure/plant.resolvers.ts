import { Plant } from '@prisma/client';
import { prismaService } from '../../config/prisma/prisma.service';
import { PlantUseCases } from '../application/plant.usecases';
import { CreatePlantInput, UpdatePlantInput } from '../domain/plant.entity';
import { PlantRepositoryImpl } from './plant.repository-impl';

const plantUseCases = new PlantUseCases(new PlantRepositoryImpl(prismaService));

export const plantResolvers = {
  Query: {
    plants: async (): Promise<Plant[]> => {
      return plantUseCases.getPlants();
    },
    plant: async (_: any, { id }: { id: string }): Promise<Plant | null> => {
      return plantUseCases.getPlant(id);
    },
  },
  Mutation: {
    createPlant: async (_: any, { input }: { input: CreatePlantInput }): Promise<Plant | null> => {
      return plantUseCases.createPlant(input);
    },
    updatePlant: async (_: any, { id, input }: { id: string; input: UpdatePlantInput }): Promise<Plant | null> => {
      return plantUseCases.updatePlant(id, input);
    },
    deletePlant: async (_: any, { id }: { id: string }): Promise<boolean> => {
      return plantUseCases.deletePlant(id);
    },
  },
};
