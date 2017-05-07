module.exports = {
  app: {
    port: process.env.APP_PORT || 3001,
  },
  db: {
    name: process.env.DB_NAME || 'qbackend-test',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
  },
  session: {
    secret: process.env.SESSION_SECRET || 'tajnik',
  },
};
