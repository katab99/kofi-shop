/**
 * List all the tables from the database.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
  const TableModel = requireOption(objectRepository, 'TableModel')

  return async function (req, res, next) {
    try{
      res.locals.tableList = await TableModel.find({})
      res.locals.tableList.sort((table1,table2) => table1.num - table2.num) // to show tables in ASC order

      return next()
    } catch (err) {
      return next(err)
    }

  }
}
