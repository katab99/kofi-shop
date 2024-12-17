/**
 * Delete a table from the database by ID.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
  const TableModel = requireOption(objectRepository, 'TableModel')

  return async function (req, res, next) {
    try{
      await TableModel.deleteOne({ _id: res.locals.table._id })
      return res.redirect('/table')
    }catch(err){
      return next(err)
    }
  }
}
