import { makeExecutableSchema } from '@graphql-tools/schema';
import { createTypeDefs } from './typeDefs';
import { createResolvers } from './resolvers';

export async function createSchema() {
  const typeDefs = await createTypeDefs();
  const resolvers = await createResolvers();

  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
}
