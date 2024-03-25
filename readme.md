## PWA Sample App

* [Introduction](#introduction)
    > This is a sample PWA app that demonstrates the use of service workers and caching strategies to provide offline access to the app. It provides a simple UI to demonstrate the offline notifications reminder.
* [Installation](#installation)
   ```bash
    npm install
    npm start
  
    /* production build */
    npm run build
   ```
* [Usage](#usage)
   
    After you build the app, you can serve the app using a static server. For example, you can use the `serve` package to serve the app.
   ```bash
    npm install -g serve
    serve -s build
   ```
  Then you can access the app at `http://localhost:3000`. And you can test the offline access by turning off the network connection.
  
* [License](#license)
    * [MIT](#mit)
