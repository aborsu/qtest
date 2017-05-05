import bunyan from 'bunyan';
import config from 'config';
import express from 'express';

import app from './app';

const log = bunyan.createLogger({ name: 'q-backend' });

express().get('/', (req, res) => {
  res.end(app());
})
.listen(config.app.port, () => log.info(`Running on http://localhost:${config.app.port}`));

if (module.hot) {
  module.hot.accept('./app');
}
