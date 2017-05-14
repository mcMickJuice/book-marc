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
I use Docker for running mongodb in a container.  While this isn't necessary, it's the easiest way to get started (note the below two tasks are only required when first running the application):

1) run `npm run run-docker` to start Docker container based on mongo and named `bookmarc-mongo`.  This script binds your localhost:27017 to the container's 27017 port
2) run `npm run init-db` to perform db setup steps and insert a user login into the database.
3) a `.env` file is expected to be in the project root (not currently checked into git) that contains the following keys
- DB_URL - full url to mongo instance
- BOOKMARC_DB - name of bookmarc database
- SECRET - secret used by bcrypt for hashing passwords

Note that Docker is not required to run the app, you just need to have an instance of mongo with the url set as DB_URL value in `.env` or set as environment variable
