var axios = require('axios');

module.exports = function(Contact) {

  Contact.afterRemote('create',
    function (context, response, next) {
      axios({
        method: 'post',
        url: 'https://api.infobip.com/sms/1/text/single',
        auth: {
          username: 'intelc',
          password: 'pros412'
        },
        data: {
           from: 'Reminder Admin',
           to: response.telephone,
           text: "You were just added as a contact on the reminder app"
        }
      }).then(function(response){
        next();
      }).catch(function(err){
        console.log(err);
        next(err);
      });
    }
  );
};
