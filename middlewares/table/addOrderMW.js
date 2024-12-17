/**
 * Save a coffee with :coffee-id to table with :table-id
 * aka. add an order to a table.
 * Change the state of the table to `occupied` if it was not before.
 */
const requireOption = require('../requireOption')


module.exports = function (objectRepository) {
    const CoffeeModel = requireOption(objectRepository, 'CoffeeModel')
    //const TableModel = requireOption(objectRepository, 'TableModel')

    return async function (req, res, next) {
        try{
            // fetch the requested coffee
            res.locals.coffee = await CoffeeModel.findOne({ _id: req.body.coffeeId })

            // ??? is this safe to use ???
            // at first load, do not add to the list
            if (res.locals.coffee === null) {
                return next()
            }

            if(res.locals.table.state === 'empty' || res.locals.table.state === 'reserved') {
                res.locals.table.state = 'occupied'
            }

            // push the coffee id to table orders
            res.locals.table._orders.push(res.locals.coffee)

            await res.locals.table.save()
            return next()
        }catch(err){
            return next(err)
        }
    }
}