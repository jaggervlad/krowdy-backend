import { gql } from 'graphql-tag';

export const operationTypeDefs = gql`
  type Operation {
    id: ID!
    name: String!
    description: String
    plantId: String!
    operationCosts: [OperationCost!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateOperationInput {
    name: String!
    description: String
    plantId: String!
  }

  input UpdateOperationInput {
    name: String
    description: String
  }

  extend type Query {
    operations(plantId: String): [Operation!]!
    operation(id: ID!): Operation
  }

  extend type Mutation {
    createOperation(input: CreateOperationInput!): Operation!
    updateOperation(id: ID!, input: UpdateOperationInput!): Operation!
    deleteOperation(id: ID!): Boolean!
  }
`;
