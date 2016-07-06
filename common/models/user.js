var app = require('../../server/server');

module.exports = function (user) {

  user.beforeRemote('create',
    function (context, data, next) {
      delete user.validations.email;
      next();
    }
  );

  user.afterRemote('create',
    function (context, response, next) {
      var AccessToken = app.models.AccessToken;
      AccessToken.create({ userId: context.result.id })
      .then(function (accessToken) {
        context.result = accessToken;
        next();
      })
      .catch(function (err) {
        next(err);
      });
    }
  );
};
