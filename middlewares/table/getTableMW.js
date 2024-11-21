/**
 * Get a table by id.
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.table = {
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
        state: 'reserved'
      }
    return next();
  };
};
