/**
 * Get all the tables from the database.
 */

module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.tableList = [
      {
        _id: 1,
        number: 1,
        orders: [{
          _id : 1,
          name: 'Espresso',
          price: 430,
          state: 'Available'
        }, {
          _id : 1,
          name: 'Espresso',
          price: 430,
          state: 'Available'
        }],
        state: 'Occupied'
      },
      {
        _id: 2,
        number: 2,
        orders: [],
        state: 'Reserved'
      },
      {
        _id: 3,
        number: 3,
        orders: [],
        state: 'Empty'
      },
      {
        _id: 4,
        number: 4,
        orders: [],
        state: 'Empty'
      },
    ];
    return next();
  };
};
