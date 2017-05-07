import passport from 'passport';
import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: module.id });

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  if (id !== 0) {
    log.error('SESSION_UNSERIALIZE_ERROR', { data: { id } });
    return done(new Error('Unknown user id'));
  }
  return done(null, {
    id: 0,
    login: 'contact@qover.me',
  });
});

export default (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
};
