module.exports = {
  app: {
    port: process.env.APP_PORT || 3001,
  },
  session: {
    secret: process.env.SESSION_SECRET || 'tajnik',
  },
};
