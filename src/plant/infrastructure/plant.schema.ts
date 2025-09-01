import { gql } from 'graphql-tag';

export const plantTypeDefs = gql`
  type Plant {
    id: ID!
    name: String!
    location: String
    createdAt: String!
    updatedAt: String!
  }

  input CreatePlantInput {
    name: String!
    location: String
  }

  input UpdatePlantInput {
    name: String
    location: String
  }

  extend type Query {
    plants: [Plant!]!
    plant(id: ID!): Plant
  }

  extend type Mutation {
    createPlant(input: CreatePlantInput!): Plant!
    updatePlant(id: ID!, input: UpdatePlantInput!): Plant!
    deletePlant(id: ID!): Boolean!
  }
`;
