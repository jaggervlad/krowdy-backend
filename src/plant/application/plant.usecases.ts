import { Plant } from '@prisma/client';
import { CreatePlantInput, UpdatePlantInput } from '../domain/plant.entity';
import { PlantRepository } from '../domain/plant.repository';

export class PlantUseCases {
  constructor(private readonly plantRepository: PlantRepository) { }

  async getPlants(): Promise<Plant[]> {
    const result = await this.plantRepository.getMany();
    return result.getOrElse([]);
  }

  async getPlant(id: string): Promise<Plant | null> {
    const result = await this.plantRepository.getOne({ where: { id } });
    return result.getOrElse(null);
  }

  async createPlant(input: CreatePlantInput): Promise<Plant | null> {
    const result = await this.plantRepository.createPlant(input);
    return result.getOrThrow('Error creating plant');
  }

  async updatePlant(id: string, input: UpdatePlantInput): Promise<Plant | null> {
    const result = await this.plantRepository.updatePlant(id, input);
    return result.getOrThrow('Error updating plant');
  }

  async deletePlant(id: string): Promise<boolean> {
    const result = await this.plantRepository.deletePlant(id);
    return result.getOrElse(false);
  }
}
