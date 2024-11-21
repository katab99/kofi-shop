/**
 * Get the list all the coffees.
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {

    res.locals.coffeeList = [
      {
        _id: '1',
        name: 'espresso',
        price: '430',
        state: 'available'
      },
      {
        _id: '2',
        name: 'cappuccino',
        price: '520',
        state: 'unavailable'
      },
      {
        _id: '3',
        name: 'americano',
        price: '430',
        state: 'available'
      },
    ];

    return next();
  };
};
