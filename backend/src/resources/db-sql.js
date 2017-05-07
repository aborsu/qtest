import config from 'config';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password, {
    dialect: 'sqlite',
    storage: 'data/database.sqlite',
  });

export default sequelize;
