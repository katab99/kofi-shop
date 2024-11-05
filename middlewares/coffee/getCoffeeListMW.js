/**
 * Get the list all the coffees.
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {

    res.locals.coffeeList = [
      {
        _id: '1',
        name: 'Espresso',
        price: '430',
        state: 'Available'
      },
      {
        _id: '2',
        name: 'Cappuccino',
        price: '520',
        state: 'Not Available'
      },
      {
        _id: '3',
        name: 'Americano',
        price: '430',
        state: 'Available'
      },
    ];

    return next();
  };
};
