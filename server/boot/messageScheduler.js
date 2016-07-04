var CronJob = require('cron').CronJob;
var axios = require('axios');

module.exports = function(app, cb) {
  var Contact = app.models.Contact;
  var runTime = '00 00 00 * * 0-6'
  var message = ''
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
   * for more info.
   */
   new CronJob(runTime, function() {
     console.log('You will see this message every day at 12:00 AM');
      Contact.find({include: 'user'}).then(function(contacts) {
        if ( contacts.length > 0 && contacts.length === 1 ){
          axios({
            method: 'post',
            url: 'https://api.infobip.com/sms/1/text/single',
            auth: {
              username: 'intelc',
              password: 'pros412'
            },
            data: {
               from: contacts[0].user.username,
               to: contacts[0].telephone,
               text: "Happy Birthday "
                     + contacts[0].fullname
                     + " Many more years to you"
            }
          }).then(function(response){
            cb();
          }).catch(function(err){
            console.log(err);
            cb(err);
          });
        } else if (contacts.length > 0 ){
           var formattedData = contacts.map(function (contact) {
             return {
               from: contact.user.username,
               to: contact.telephone,
               text:"Happy Birthday "
                    + contact.fullname
                    + " Many more years to you "
             };
           });

           axios({
             method: 'post',
             url: 'https://api.infobip.com/sms/1/text/multi',
             auth: {
               username: 'intelc',
               password: 'pros412'
             },
             data: {
                messages: formattedData
             }
           }).then(function(response){
             cb();
           }).catch(function(err){
             console.log(err);
             cb(err);
           });
        }
      })

     }, null, true, 'Africa/Lagos');

  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
