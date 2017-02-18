# book-marc

Personal tool for cataloging

* online articles about different areas of technology
* rating said articles
* technology areas and experiences with said technology

Eventually this app will act as an index of things I've read and technologies I've worked with.

## Tech Stack
React + Redux frontend with Express API backend, with a mongodb datastore.  Current hosting is on heroku

## Heroku Deployment
All npm dependencies needed for build must be under the dependencies collection in package.json.  AFAIK, heroku runs `npm i --production` before running the post install script so anything not in the dependencies collection will not be included in the build process. 
Automatic deployment is setup on `master`. Any commits to `master` will trigger a deployment.

## Running locally
I develop on a Windows 10 machine so I use Vagrant to run a vm that hosts a docker image that hosts mongodb.  Can run without VM/Container if you have mongo running locally, you'll just need to update the mongodb config.
