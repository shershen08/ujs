##UI JSON Server (UJS)
Adding routes and sample replyes more complex than https://github.com/typicode/json-server.

###How to use
 - Clone the repository
 - run ```npm install```, ```bower install``` to get all packages
 - Config details in ```server/config/environment/```
 - Start with ```node server/app.js```
 - Adding a route : ```/ujs-setup/addrequest```
 - Show list of routes: ```/ujs-setup/showlist```
 - For mocked requests call for ```/api/YOUR_ADDED_REQUEST```


For debug start ```DEBUG=http node server/app.js```

For development start ```nodemon DEBUG=http ./server/app.js --debug --watch```


### Todo
 - Add better UI for adding results
 - Add regexps in paths
 - Add faker module to generate JSON on reqiuest
 - Add static files support




