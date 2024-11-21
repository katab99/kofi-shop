/**
 * Get one coffee by ID.
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {
    res.locals.coffee = {
        _id: '1',
        name: 'espresso',
        price: '430',
        state: 'unavailable'
      }
    return next();
  };
};
