export interface Plant {
  id: string;
  name: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlantInput {
  name: string;
  location?: string;
}

export interface UpdatePlantInput {
  name?: string;
  location?: string;
}
