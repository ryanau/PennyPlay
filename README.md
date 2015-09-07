# PennyPlay

Demo: https://pennyplay.herokuapp.com

PennyPlay enables users to challenge their friends on a continous basis by simply logging in with Venmo credentials.
With a few clicks, users can create a challenge, add their friends to the challenge, and create new entries for each challenge.
After others in the bets approve the entry, PennyPlay handles the payments through Venmo automatically, and alerts users with SMS notifications.


PennyPlay was built on Rails as an API for the backend, and React.js for the frontend. It uses Venmo-omniauth for payment and login credentials, and Twilio API for text notifications.

PennyPlay was a week-long project created by Ryan Au during his spare time while at school. Through this project, he understood how to build stateless apps through decoupling the frontend and the backend, and learned to use Json Web Token to authenticate user identity in each API request.