export const healthResolvers = {
  Query: {
    health: () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }),
  },
};
