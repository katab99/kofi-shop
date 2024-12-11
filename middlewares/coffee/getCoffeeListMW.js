/**
 * Get the list all the coffees.
 */

const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const CoffeeModel = requireOption(objectRepository, 'CoffeeModel')

    return async function (req, res, next) {
    try {
      const coffees = await CoffeeModel.find({});
      res.locals.coffeeList = coffees;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}
