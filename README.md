# opc-coding-assignment

### Run the app 

- npm install 
- npm start

make a GET to http://localhost:8000/words to get the 10 words count of the stories from the 7 days before today, it may take a while it will always depend on how much records we are ahead to the records we want to look for.

### Application dependencies 

- Express - to allow to set up a web server API 
- Moment - to handle the date manipulation (format and comparison)
- axios - to make a http request to HN API
- dotenv - to save our super secret environment variables
- nodemon - dev dependency only
