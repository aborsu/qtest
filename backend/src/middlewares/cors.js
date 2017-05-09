import cors from 'cors';

export default (app) => {
  app.use(
    cors({
      origin: 'http://localhost:5000',
      credentials: true,
    }));
};
