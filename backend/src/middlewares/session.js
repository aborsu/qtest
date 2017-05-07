import config from 'config';
import session from 'express-session';

export default (app) => {
  app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
  }));
};
