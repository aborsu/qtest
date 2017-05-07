import bodyParser from 'body-parser';

export default (app) => {
  app.use(
    bodyParser.json({
      strict: true,
      limit: '10mb',
    }));
};
