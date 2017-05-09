import BPromise from 'bluebird';

import mandrill from '../resources/mandrill';

export default ({ driverName, carMake, carValue, price }) => new BPromise((resolve, reject) => {
  const text = `Dear ${driverName},
    We confirm that you have bought an insurance contract for your ${carMake} which value is ${carValue}.
    The price to be paid is ${price}.

    Best regards,

    QOVER`;

  mandrill.messages.send({
    message: {
      text,
      subject: 'test',
      from_email: 'a.borsu@gmail.com',
      to: [{
        email: 'aborsu@gmail.com',
      }],
      signing_domain: null,
    },
  },
  result => resolve(result),
  error => reject(error));
});
