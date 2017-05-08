import _ from 'lodash';
import express from 'express';
import bunyan from 'bunyan';

import computePrice from './controllers/computePrice';
import constants from './constants';
import bodyParser from './middlewares/body-parser';
import session from './middlewares/session';
import passport from './middlewares/passport';
import quotes from './models/quote';

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

app.get('/api/carMakes', (req, res) => {
  res.send(constants.carMakes);
});

app.post('/api/quotes', (req, res) => {
  if (!req.isAuthenticated()) {
    res.send(401).send('Invalid session.');
  }

  const quote = quotes.build(Object.assign(req.body, { user: req.user.login }));

  quote.validate()
    .then((err) => {
      if (err) {
        log.error(
          {
            data: Object.assign(req.body, { user: req.user.login }),
            err,
          },
          'QUOTE_CREATE_INVALID',
        );
        return res.status(500).send('Could not create quote.');
      }
      const [status, price, msg] = computePrice(quote);
      quote.set('status', status);
      quote.set('price', price);

      return quote.save().then(savedQuote =>
        res.send(Object.assign(savedQuote.get(), { msg })));
    })
    .catch((err) => {
      log.error(
        {
          data: Object.assign(req.body, { user: req.user.login }),
          err,
        },
        'QUOTE_CREATE_FAIL',
      );
      return res.status(500).send('Could not create quote.');
    });
});

app.get('/api/quotes', (req, res) => {
  if (!req.isAuthenticated()) {
    res.send(401).send('Invalid session.');
  }

  quotes.findAll({ where: { user: req.user.login } })
    .then(results => res.send(results));
});


export default app;
