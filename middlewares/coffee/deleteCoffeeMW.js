/*
 * Delete the coffee by ID from the database. Then return to '/coffee' route.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
  const CoffeeModel = requireOption(objectRepository, 'CoffeeModel')

  return async function (req, res, next) {
    try{
      await CoffeeModel.deleteOne({_id: res.locals.coffee._id})
      res.redirect('/coffee')
    } catch (err){
      return next(err);
    }
  }
}
