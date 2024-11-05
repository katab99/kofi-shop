/**
 * Render view.
 */

module.exports = function (objectRepository, viewName, options) {
  return function (req, res) {
    res.render(viewName, {...options, ...res.locals});
  };
};
