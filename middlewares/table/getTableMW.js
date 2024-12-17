/**
 * Get a table by id.
 */

const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const TableModel = requireOption(objectRepository, 'TableModel')

    return async function (req, res, next) {
        try {
            res.locals.table = await TableModel.findOne({ _id: req.params.tableId })
            return next()
        } catch (err) {
            return next(err)
        }
    }
}
