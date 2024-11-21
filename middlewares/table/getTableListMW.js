/**
 * Get all the tables from the database.
 */

module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.tableList = [
      {
        _id: 1,
        num: 1,
        orders: [{
          _id : 1,
          name: 'espresso',
          price: 430,
          state: 'available'
        }, {
          _id : 1,
          name: 'espresso',
          price: 430,
          state: 'available'
        }],
        state: 'occupied'
      },
      {
        _id: 2,
        num: 2,
        orders: [],
        state: 'reserved'
      },
      {
        _id: 3,
        num: 3,
        orders: [],
        state: 'empty'
      },
      {
        _id: 4,
        num: 4,
        orders: [],
        state: 'empty'
      },
    ];
    return next();
  };
};
