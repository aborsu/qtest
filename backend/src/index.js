import bunyan from 'bunyan';
import config from 'config';
import app from './app';

const log = bunyan.createLogger({ name: 'q-backend' });

app.listen(config.app.port, () =>
  log.info(`Running on http://localhost:${config.app.port}`));

if (module.hot) {
  module.hot.accept();
}
