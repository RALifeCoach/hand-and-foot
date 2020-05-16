#Travel Readme
The front end code compiles, but it depends upon the backend code plus a redis server which has not been
added to the docker container. If you need to run the code, please contact me at +1-647-972-4549.

##Project structure
The project contains 3 sub-projects: toptal (the FE code), toptal-db
 (the DB startup script) and total-server (the BE code).

###Server
- This is written in node.js. It requires 2 private files:
  - **private.pem** - this contains the private key that supports the JWT encryption.
  - **.env** - this contains the environment variables
      - PORT - the port to watch for incoming RestAPI calls
      - DB_USER - for the DB connection
      - DB_PASSWORD - for the DB connection
      - DB_DATABASE - for the DB connection

###Front-End
- This is written using React. It requires 1 private file:
  - **public/config.js** - this contains config options:
    - **API_URL** - the path to the node server application

###Database
- The database is mysql version 5.7.
- You will need to have MySQLWorkbench installed.

###To begin the application:
- from the root folder run docker-compose up
- once everything has settled down, open MySQLWorkbench and connect
to the DB running at localhost
- run the startup script `startup.sql`, found within the toptal-db sub-project.
It will create the DB tables and add the admin.
- then run localhost:3000?id=admin123 - this will force the admin user to change
their password (the admin user cannot login until this is done.)
- you can now login as admin

##Project Notes
- This code was written without knowledge of the final DevOps configuration.
It has been configured to run in a docker environment, for now.
- Given that the final DevOps is unknown, there is no support for emails. The user
id is a valid email address and support could be added fairly easily. In lieu of
email support, when a user is created or their password reset, the FE displays
a url for the user to use to set their password. This url can be copied into
an email and sent to the user.
- The BE, running locally uses an http connection. When moved to production,
this would be configured for https. Changing the destination is done via the
FE config file.
- Logging is another issue dependant on DevOps. At this point in time, errors are
 logged to the console.
- The UI design is fairly simple. I prefer the simple, clean style of the
Material UI components.
- The UI is responsive and tested to a width of 370 pixels. The user maintenance
page is not as responsive as it was assumed that the admin work would be done
primarily on desktop systems.
- Messages sent to the Back-End include a JWT token. The token is never parsed
on the FE. The token is currently set for a 24 hour expiry. If an attempt to use
the system after the token is expired results in a message and the user being
redirected to the login page.

