/**
 * Save a coffee to the database.
 */

 const requireOption = require('../requireOption')
const {locals} = require("express/lib/application");

module.exports = function (objectRepository) {
  const coffeeModel = requireOption(objectRepository, 'CoffeeModel')

  return async function (req, res, next) {
    try {
      console.log(`req.body :${req.body}`)
      console.log('req.body:', JSON.stringify(req.body, null, 2));


      if ((typeof req.body.name === 'undefined') ||
          (typeof req.body.price === 'undefined') ||
          (typeof req.body.state === 'undefined')) {
        return next()
      }

      if (typeof res.locals.coffee === 'undefined') {
        res.locals.coffee = new coffeeModel()
      }

      res.locals.coffee.name = req.body.name
      res.locals.coffee.price = req.body.price
      res.locals.coffee.state = req.body.state

      console.log(`res.locals.coffee :${res.locals.coffee}`)

      await res.locals.coffee.save()
      return res.redirect('/coffee/');
    } catch (err) {
      return next(err)
    }
  }
}
