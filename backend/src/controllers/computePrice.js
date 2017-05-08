import bunyan from 'bunyan';

const log = bunyan.createLogger({ name: module.id });

export default ({ carMake, carValue }) => {
  if (carValue < 5000) {
    log.info({ carMake, carValue }, 'CAR_TOO_CHEAP');
    return [false, null, 'CAR_TOO_CHEAP'];
  }
  if (carValue > 75000) {
    log.info({ carMake, carValue }, 'CAR_TOO_FANCY');
    return [false, null, 'CAR_TOO_FANCY'];
  }

  switch (carMake) {
    case 'Audi':
      return [true, 250 + (0.3 * carValue)];
    case 'BMW':
      return [true, 150 + (0.4 * carValue)];
    case 'Porsche':
      return [true, 500 + (0.7 * carValue)];
    default:
      throw new Error('UNKNOWN_CARMAKE');
  }
};
