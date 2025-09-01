export interface OperationCost {
  id: string;
  operationId: string;
  volumeRange: string; // Ejemplo: "300kg", "1T", etc.
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOperationCostInput {
  operationId: string;
  volumeRange: string;
  cost: number;
}

export interface UpdateOperationCostInput {
  volumeRange?: string;
  cost?: number;
}
