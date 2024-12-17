/**
 * Create or update a table to default parameters.
 */

// first just do the create a new table, then do the set to default parameters if the table exists

const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const tableModel = requireOption(objectRepository, 'TableModel')

    return async function (req, res, next) {
        try{
            if(typeof res.locals.table === 'undefined'){
                res.locals.table = new tableModel()
            }

            // find the biggest table number -> LATER : if not continuous than that number
            const maxTableNum = Math.max(...res.locals.tableList.map(item => item.num))

            res.locals.table.num = maxTableNum + 1
            res.locals.table.state = 'empty'
            res.locals.table._orders = []

            await res.locals.table.save()
            return res.redirect('/table')
        } catch(err){
            return next(err)
        }
    }
}