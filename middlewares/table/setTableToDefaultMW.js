/**
 * Sets table with given ID to default parameters.
 */


const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const tableModel = requireOption(objectRepository, 'TableModel')

    return async function (req, res, next) {
        try{
            if(typeof res.locals.table === 'undefined'){
                res.locals.table = new tableModel()
            }

            res.locals.table.state = 'empty'
            res.locals.table._orders = []

            await res.locals.table.save()
            return res.redirect(`/table/${res.locals.table.id}`)
        } catch(err){
            return next(err)
        }
    }
}