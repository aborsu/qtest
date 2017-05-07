import Sequelize from 'sequelize';

import sequelize from '../resources/db-sql';
import constants from '../constants';

const Quote = sequelize.define('quote', {

  user: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  submitTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  driverName: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  carMake: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      isIn: [constants.carMakes],
    },
  },
  carValue: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

}, {
  paranoid: true,
  timestamps: true,
});

Quote.sync();

export default Quote;
