import { gql } from 'graphql-tag';

export const healthTypeDefs = gql`
  type HealthCheck {
    status: String!
    timestamp: String!
    uptime: Float!
  }

  extend type Query {
    health: HealthCheck!
  }
`;
