/**
 * Get one coffee by ID.
 */

const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const CoffeeModel = requireOption(objectRepository, 'CoffeeModel')

    return async function (req, res, next) {
        try {
            console.log(req.params.coffeeId)
            res.locals.coffee = await CoffeeModel.findOne({ _id: req.params.coffeeId })
            console.log(res.locals.coffee)
            return next()
        } catch (err) {
            return next(err);
        }

    }
}
