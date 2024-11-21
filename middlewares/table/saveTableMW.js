/**
 * Save a table to the database.
 */

module.exports = function (objectRepository) {
  return function (req, res, next) {
    if((typeof  req.body.num === 'undefined') ||
        (typeof  req.body.orders === 'undefined') ||
        (typeof  req.body.state === 'undefined')){
      return next();
    }
    return next();
  };
};
