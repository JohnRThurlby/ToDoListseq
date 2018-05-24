// Written by John R. Thurlby May 2018

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
require("dotenv").config()

const PhoneNumber = require( 'awesome-phonenumber' ),
      twilio = require('twilio')

var db = require("../models");

if (process.env.NODE_ENV != "PRODUCTION") {
  var client = new twilio(process.env.accountsid, process.env.authtoken);
}
else {
  var client = new twilio(process.env.ACCOUNTSID, process.env.AUTHTOKEN);
}

var phoneText = " "

var currentDate = new Date();

var date = currentDate.getDate();
var month = currentDate.getMonth(); //Be careful! January is 0 not 1
var year = currentDate.getFullYear();

if (month < 9) {
   var dateString = year + "-0" +(month + 1) + "-" + date;
  } 
  else {
    var dateString = year + "-" +(month + 1) + "-" + date;
  }

deliverText()

// Routes
// =============================================================
module.exports = function(app) {

  app.get('/', function (req, res) {
    res.redirect('/api/todos')
  })

  // GET route for getting all of the todos
  app.get("/api/todos", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Todolists.findAll({}).then(function(Todolists) {
        // We have access to the todos as an argument inside of the callback function
      var hbsObject = { todolist: Todolists }
      res.render('index', hbsObject)
    });  
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    req.body.textsent = false
      var pn = new PhoneNumber( req.body.phonenum, 'US' );
      if (pn.isValid()) {
        phoneText = "+1" + req.body.phonenum
    
       req.body.phonenum = phoneText
        
      }
      else {
       req.body.phonenum = 9999999999
     } 
      //If text date is not entered, then send text right away
      if (req.body.textdate == "" && req.body.phonenum != 9999999999) {
        
        req.body.textdate = null
        req.body.textsent = true
        
        client.messages.create({
            body: req.body.todoitem,
            to: phoneText,  // Text this number
            from: '+16093164815' // From a valid Twilio number
          })
          .then((message) => console.log(message.sid));
         
      }
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Todolists.create({
      todoitem: req.body.todoitem,
      tododone: false,
      phonenumber: req.body.phonenum,
      textdate: req.body.textdate,
      textsent: req.body.textsent
    }).then(function(Todolists) {
      // We have access to the new todo as an argument inside of the callback function
      res.redirect('/api/todos')
      //res.render('index', Todolist)
      //res.render('index', Todolists)
    });
  }); 

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.post("/api/todos/delete/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Todolists.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(Todolists) {
      res.redirect('/api/todos')
      //res.render('index', Todolists)
      //res.redirect('/api/todos')
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  app.post("/api/todos/update/:id", function(req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Todolists.update({
      tododone: true
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(Todolists) {
      //res.render('index', Todolist)
      res.redirect('/api/todos')
    });
  });

};




       




// Create a todolist
//router.post('/todolist', function (req, res) {
//  req.body.textsent = false
//  var pn = new PhoneNumber( req.body.phonenum, 'US' );
//  if (pn.isValid()) {
//    phoneText = "+1" + req.body.phonenum

 //   req.body.phonenum = phoneText
    
//  }
//  else {
 //   req.body.phonenum = 9999999999
 // } 
  //If text date is not entered, then send text right away
//  if (req.body.textdate == "" && req.body.phonenum != 9999999999) {
    
////    req.body.textdate = null
 //   req.body.textsent = true
    
  //  client.messages.create({
 //     body: req.body.todoitem,
 //     to: phoneText,  // Text this number
 //     from: '+16093164815' // From a valid Twilio number
 //   })
 //   .then((message) => console.log(message.sid));
     
 // }
 // db.Todolist.create({
 //   todoitem: req.body.todoitem,
 //   tododone: false,
  //  phonenumber: req.body.phonenum,
  //  textdate: req.body.textdate,
 //  textsent: req.body.textsent
 // }).then(function(dbTodolist) {
    // We have access to the new todo as an argument inside of the callback function
 //   res.json(dbTodolist);
 //   res.redirect('/index')
 // });  
  //todolist.insertOne(req.body, function() {
  //  res.redirect('/index')
  //})
//})

// update a todolist to set it to complete, boolean = true
//router.post('/todolist/update/:id', function (req, res) {

//    db.Todolist.update({
//      complete: true
//    }, {
//      where: {
//        id: req.body.id
//      }
//    }).then(function(dbTodolist) {
//      res.json(dbTodolist);
//      res.redirect('/index')
//    });
   // todolist.updateOne(req.params.id, function() {
   // res.redirect('/index')
  //})
//})

// remove a todolist
//router.post('/todolist/delete/:id', function (req, res) {

  //db.Todolist.destroy({
  //  where: {
  //    id: req.params.id
  //  }
  //}).then(function(dbTodolist) {
  //  res.json(dbTodo);
  //  res.redirect('/index')
  //});
  //todolist.deleteOne(req.params.id, function() {
 //   res.redirect('/index')
 // })
//})

function deliverText(){
  //db.Todolist.findAll({}).then(function(dbTodolist) {
    
  //  for (i = 0; i < dbTodolist.length; i++){
      
  //    if (dbTodolist[i].textdate == dateString && !dbTodolist[i].textsent){
                
  //      client.messages.create({
   //       body: dbTodolist[i].todoitem,
    //      to: dbTodolist[i].phonenumber,  // Text this number
   //       from: '+16093164815' // From a valid Twilio number
  //      })
  //      .then((message) => console.log(message.sid))
        
  //      db.Todolist.update({
  //        textsent: true
  //      }, {
   //       where: {
   //         id: req.body.id
   //       }
  //      }).then(function(dbTodolist) {
   //       res.json(dbTodolist);
  //        res.redirect('/index')
   //     });
        //todolist.updateText(data[i].id, function() {
        //})
   //   }
  //  }
 // })
}
// Export routes
// module.exports = router
