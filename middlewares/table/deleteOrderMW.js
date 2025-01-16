/**
 * Delete coffee order with coffeeId from table with tableId.
 */
const requireOption = require('../requireOption')

module.exports = function (objectRepository) {

    return async function (req, res, next) {
        try{
            const coffeeIndex = res.locals.table._orders.indexOf(req.params.coffeeId)
            res.locals.table._orders.splice(coffeeIndex, 1)

            // move saving to another MW ??
            // is this correct to delete an array elem from database
            await res.locals.table.save()
            res.redirect(`/table/${res.locals.table._id}`)
        }catch(err){
            return next(err)
        }
    };
};