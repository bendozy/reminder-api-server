var path = require('path');
var CronJob = require('cron').CronJob;
var moment = require('moment');
var axios = require('axios');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.db;

module.exports = function(app, cb) {
  var Contact = app.models.Contact;
  var runTime = '00 44 22 * * 0-6';
  var today = moment();
  var month = '';
  if(today.month() <9){
    month = '0' + (today.month() + 1);
  } else {
    month = today.month() + 1;
  }
   var sql = 'SELECT * FROM  contact  JOIN "user"  ON contact.userid = "user".id'
               + " WHERE date_part('day', birthday) = $1 "
               + " AND date_part('month', birthday) = $2 ";

  try {
    var CronJob = require('cron').CronJob;
    new CronJob(runTime, function() {
      console.log('You will see this message every second');
      dataSource.connector.execute(sql, [today.date(), month],
        function(err, contacts){
          if(err) return err;
           console.log('Contacts', contacts);
          if ( contacts.length > 0 && contacts.length === 1 ){
            axios({
              method: 'post',
              url: 'https://api.infobip.com/sms/1/text/single',
              auth: {
                username: 'intelc',
                password: 'pros412'
              },
              data: {
                 from: contacts[0].username,
                 to: contacts[0].telephone,
                 text: "Happy Birthday "
                       + contacts[0].fullname
                       + " Many more years to you"
              }
            }).then(function(response){
            }).catch(function(err){
              console.log(err);
            });
          } else if (contacts.length > 0 ){
             var formattedData = contacts.map(function (contact) {
               return {
                 from: contact.username,
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
             }).catch(function(err){
               console.log(err);
             });
          }
        });
    }, null, true, null);
   } catch(ex) {
   	console.log("cron pattern not valid");
   }

  //  new CronJob(runTime, function() {
  //    console.log('You will see this message every day at 12:00 AM');
   //
   //
  //    }, null, true);

  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
