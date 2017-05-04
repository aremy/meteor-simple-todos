Tutorial: https://www.meteor.com/tutorials/angular/creating-an-app

Create default app
meteor create simple-todos

Replace original ui package with angular
meteor remove blaze-html-templates
meteor add angular-templates

login/password management & forms
meteor add accounts-password dotansimha:accounts-ui-angular

Remove insecure module (db manipulation from client)
meteor remove insecure

Force defining what to publish to the client/the client to subscribe
meteor remove autopublish

Add Test driver
meteor add practicalmeteor:mocha


Start db cli
meteor mongo

Add stuff in it
db.tasks.insert({ text: "Hello world!", createdAt: new Date() });
remove everything from it
db.tasks.drop()
(db.[tablename].[action])


Start the server
meteor npm start

Run the tests & Start the server
meteor test --driver-package practicalmeteor:mocha

