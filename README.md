<h2>Overview</h2>

This is ToDoList application based on the EatDaBurger requirements. A user can enter a task, then complete the task, and finally delete the task if required. 
A user can request that the task be sent to them via SMS by adding in a 10 digit phone number. This is done using the Twilio package.  Additionally, an SMS can be sent on a specific date by entering a date in the format of YYYY-MM-DD in the date field. The app is scheduled to run daily via the Heroku scheduler process. If a phone number is entered and no date is, the SMS is sent immediately. Unfortunately, due to the limitations with the Twilio trial package, SMS can only be sent to verified phone numbers added into the Twilio app. Use of the Google language translator, enables the page to be seen in different languages. 

Short video showing capabilities:

![todolist](https://user-images.githubusercontent.com/33644735/40333908-eff77b78-5d28-11e8-8cc1-b312eef2dc0d.gif)

Software used: 

<img src="/nodejs_logo.png" width="256" height="256" title="NodeJS"><img src="/npm-logo.png" width="256" height="256" title="Node Package Manager">
<img src="/express.png" width="256" height="256" title="Express"><img src="/mysql.png" width="256" height="256" title="MySQL">
<img src="/handlebars.png" width="256" height="256" title="HandleBars"><img src="/twilio.png" width="256" height="256" title="Twilio">
<img src="/heroku.png" width="256" height="256" title="Heroku">

