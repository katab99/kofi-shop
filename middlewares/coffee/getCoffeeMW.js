/**
 * Get one coffee by ID.
 */

const requireOption = require('../requireOption')

module.exports = function (objectRepository) {
    const CoffeeModel = requireOption(objectRepository, 'CoffeeModel')

    return async function (req, res, next) {
        try {
            const coffee = await CoffeeModel.findOne({ _id: req.params.coffeeId });
            res.locals.coffee = coffee;
            return next();
        } catch (err) {
            return next(err);
        }

    }
}
