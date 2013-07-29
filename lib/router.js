var Query = require('../lib/query'),
  util = require('../lib/util');

var callback = function(res) {
  return function(err, data) {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  };
};

var Router = function(app) {

  var find = function(path, model, options) {
    app.get(path, function(req, res) {
      var query = new Query(model);
      options = util.processRoute(req, options);
      query.find(options, callback(res));
    });
  };

  var findById = function(path, model) {
    app.get(path, function(req, res) {
      var query = new Query(model),
        params = util.getRouteParams(path);
      query.findById(req.params[params[0]], callback(res));
    });
  };

  var create = function(path, model) {
    app.post(path, function(req, res) {
      var query = new Query(model);
      query.create(req.body, callback(res));
    });
  };

  var update = function(path, model) {
    app.put(path, function(req, res) {
      var query = new Query(model),
        params = util.getRouteParams(path);
      query.findByIdAndUpdate(req.params[params[0]], req.body, callback(res));
    });
  };

  var remove = function(path, model) {
    app.del(path, function(req, res) {
      var query = new Query(model),
        params = util.getRouteParams(path);
      query.findByIdAndRemove(req.params[params[0]], callback(res));
    });
  };

  return {
    find: find,
    findById: findById,
    create: create,
    update: update,
    remove: remove
  };
};

module.exports = Router;