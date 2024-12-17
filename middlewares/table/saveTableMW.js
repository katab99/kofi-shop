/**
 * Save a table to the database.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
  const TableModel = requireOption(objectRepository, 'TableModel')

  return function (req, res, next) {
    if((typeof  req.body.num === 'undefined') ||
        (typeof  req.body._orders === 'undefined') ||
        (typeof  req.body.state === 'undefined')){
      return next();
    }

    if (typeof res.locals.table === 'undefined') {
      res.locals.table = new TableModel()
    }




    return next();
  };
};
