var axios = require('axios');
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
        console.log('Token', accessToken);
        context.result = accessToken;
        axios({
          method: 'post',
          url: 'https://api.infobip.com/sms/1/text/single',
          auth: {
            username: 'intelc',
            password: 'pros412'
          },
          data: {
             from: response.username,
             to: response.telephone,
             text: "You just created an account with reminder app"
          }
        }).then(function(response){
          next();
        }).catch(function(err){
          console.log(err);
          next(err);
        });
        next();
      })
      .catch(function (err) {
        next(err);
      });
    }
  );
};
