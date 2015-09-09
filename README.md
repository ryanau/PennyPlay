# PennyPlay

Demo: https://pennyplay.herokuapp.com

PennyPlay let you set up and keep track of challenges with your friends by simply logging in with your Venmo credentials. After approving an entry through text, PennyPlay automatically transfer ONE penny from the loser to the winner through Venmo, which is just the right amount of motivation and bragging right for you and your friends to keep going at it. 

### Technologies
This was a week-long project for learning new technologies. PennyPlay was a single-page, fully decoupled app built with Rails as an API for the backend, and React.js for the front end. It uses Json Web Token to authenticate user identity.

Front end:
- HTML + CSS
- JavaScript
- jQuery + Ajax
- React.js
- Material UI

Back end:
- Ruby
- Rails as an API
- Postgresql
- Venmo Omniauth
- Twilio API
- Venmo API
- Httparty

### In Development
To play around with this app in development, please do the followings in your terminal. It uses two servers (front end with Node.js and back end with Rails).

To install all the Ruby gems and run the Rails server:

```
bundle install
rails s
```

Open a new window in terminal to install json package and run the Node.js server:

```
npm install
npm run devserve
```

Open up the client/components/App.jsx, client/components/Landing.jsx, app/controllers/sessions_controller.rb files, and uncomment/comment out the lines according when in development. This is to change the redirect/call back URL from Venmo, after logging in with Omniauth.

Make a .env file in the root directory and enter the following information:
You'll need to register a developer account through Venmo and Twilio

```
VENMO_CLIENT_ID=
VENMO_CLIENT_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=
```

Now go to localhost:8080 and it should work! If it doesn't work or if you have any question, please leave an issue and I'll try to respond to that.

### Notes
This app's structure was largely inspired by a very thorough tutorial from Fred Guest: http://fredguest.com/2015/03/06/building-a-stateless-rails-api-with-react-and-twitter-oauth/

It was hard to find other tutorials that teach you how to build a decoupled app with React.js for front end and Rails for back end. I hope this project (definitely not perfect) can be used as an example for you to get started, especially using a fairly popular React-ready UI framework called Material UI: http://material-ui.com

