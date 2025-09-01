import { gql } from 'graphql-tag';

export const operationCostTypeDefs = gql`
  type OperationCost {
    id: ID!
    operationId: String!
    volumeRange: String!
    cost: Float!
    createdAt: String!
    updatedAt: String!
  }

  input CreateOperationCostInput {
    operationId: String!
    volumeRange: String!
    cost: Float!
  }

  input UpdateOperationCostInput {
    volumeRange: String
    cost: Float
  }

  extend type Query {
    operationCosts: [OperationCost!]!
    operationCost(id: ID!): OperationCost
  }

  extend type Mutation {
    createOperationCost(input: CreateOperationCostInput!): OperationCost!
    updateOperationCost(id: ID!, input: UpdateOperationCostInput!): OperationCost!
    deleteOperationCost(id: ID!): Boolean!
  }
`;
