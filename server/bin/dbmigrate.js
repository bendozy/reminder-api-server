var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.db;

dataSource.automigrate('Application', function(appErr) {
  if (!appErr) {
    console.log('Application table created');
  } else {
    console.log(appErr);
    console.log('-- Application table not created');
  }
  dataSource.automigrate('user', function(usersErr) {
    if (!usersErr) {
      console.log('User table created');
    } else {
      console.log(usersErr);
      console.log('-- User table not created');
    }
    dataSource.automigrate('AccessToken', function(tokenErr) {
      if (!tokenErr) {
        console.log('AccessToken table created');
      } else {
        console.log(tokenErr);
        console.log('-- AccessToken table not created');
      }
      dataSource.automigrate('Contact', function(contactErr) {
        if (!contactErr) {
          console.log('Contact table created');
        } else {
          console.log(tokenErr);
          console.log('-- Contact table not created');
        }
        dataSource.automigrate('ACL', function(ACLErr) {
          if (!ACLErr) {
            console.log('ACL table created');
          } else {
            console.log(ACLErr);
            console.log('-- ACL table not created');
          }
          dataSource.disconnect();
          process.exit()
      });
      });
    });
  });
});
