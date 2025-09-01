import { OperationCost } from "../../operation-cost/domain/operation-cost.entity";

export interface Operation {
  id: string;
  name: string;
  description?: string | null;
  plantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OperationWithCostsDomain = Operation & {
  operationCosts: OperationCost[];
};

export interface CreateOperationInput {
  name: string;
  description?: string;
  plantId: string;
}

export interface UpdateOperationInput {
  name?: string;
  description?: string;
}
