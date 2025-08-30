import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createSchema } from './config/graphql/schema';

const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const schema = await createSchema();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req }) => {
      return {
        user: req.headers.authorization ? 'authenticated-user' : null,
        req,
      };
    },
  });

  console.log(`🚀 GraphQL Server ready at ${url}`);
}

bootstrap().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
});