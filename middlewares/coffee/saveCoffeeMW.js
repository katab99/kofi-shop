/**
 * Save a coffee to the database.
 */
module.exports = function (objectRepository) {
  return function (req, res, next) {
    if((typeof  req.body.name === 'undefined') ||
        (typeof  req.body.price === 'undefined') ||
        (typeof  req.body.state === 'undefined')){
      return next();
    }

    // TODO
    // res.redirect(path_name)
    return next();
  };
};
