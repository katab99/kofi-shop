/**
 * List all the tables from the database.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
  const TableModel = requireOption(objectRepository, 'TableModel')

  return async function (req, res, next) {
    try{
      res.locals.tableList = await TableModel.find({})
      return next()
    } catch (err) {
      return next(err)
    }

  }
}
