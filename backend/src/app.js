import _ from 'lodash';
import express from 'express';
import bunyan from 'bunyan';

import constants from './constants';
import bodyParser from './middlewares/body-parser';
import session from './middlewares/session';
import passport from './middlewares/passport';

const log = bunyan.createLogger({ name: module.id });

const app = express();

// Middlewares
bodyParser(app);
session(app);
passport(app);

// Routes
app.post('/api/session', (req, res) => {
  const { login, password } = req.body;
  if (login !== 'contact@qover.me' || password !== 'guest') {
    log.warn('AUTHENTICATION_FAIL', { data: { login } });
    return res.status(401).send('Invalid login or password.');
  }
  const user = {
    id: 0,
    login: 'contact@qover.me',
  };

  return req.login(user, (err) => {
    if (err) {
      log.error('AUTHENTICATION_FAIL', { data: { user } });
      return res.status(500).send('AUTHENTICATION_FAIL');
    }
    return res.send(_.pick(user, ['login']));
  });
});

app.delete('/api/session', (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
  }
  return res.send();
});

app.get('/api/resources/carMakes', (req, res) => {
  res.send(constants.carMakes);
});



export default app;
