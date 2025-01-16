/**
 *
 */
const requireOption = require('../requireOption')

module.exports = function(objectRepository) {
    const CoffeeModel = requireOption(objectRepository, 'CoffeeModel')

    return async function(req, res, next) {
        if(typeof res.locals.table === 'undefined') {
            return next()
        }

        try{
            res.locals.orders = []
            // to hand over a list of orders -> res.locals.orders
            for(let order of res.locals.table._orders) {
                res.locals.orders.push(await CoffeeModel.findOne({ _id : order}))
            }

            return next()
        } catch(err){
            return next(err)
        }
    }
}