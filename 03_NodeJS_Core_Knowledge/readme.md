# Learn Node.js by building real-world applications with Node JS, Express, MongoDB, Jest, and more!

## 01 File Systems & Command lines Args (Notes App)

1. How to run the project

   - on one terminal
     ```
       tsc -w
     ```
   - on another terminal

     ```
       node dist/filename.js args
     ```

     OR

     **fileName** is optional

     Default File Name: **data.json** in folder _db-data_

     ```
      cd dist
      node app.js add --title=test --body=testing body --fileName=data.json
      node app.js list --fileName=data.json
      node app.js read --index=0 --fileName=data.json
      node app.js remove --title=test --index=0 --fileName=data.json
     ```

2. Use of NPM package

   - yargs to play with args in the nodeJs
   - nodemon to watch and run the js file again

3. Differnece between _function () {}_ and _() => {}_
   - First one binds their own values of **this**
   - Later one doesn't bind **this, arguments, super and new.target**

## 02 Asynchronous Node.js (Weather App)

1. [Online compiler to understand async functionality](http://latentflip.com/loupe)

   - Understand **Call Stack** (_Single Threaded_)
   - Understand **Node APi's**(Functions are send to Node API's to wait for current function to finish)
   - **Callback Queue** (As per the priority, functions sitting at background goes to the callback queue to get executed)
   - **Event Loop** (Check _call stack_ if it's empty, move funtions in _callback queue_ to _call stack_)

2. For loop in TS

   - for(let x in array) will gives you **x** as index
   - for (let x of array) will give you **x** as element
   - for(let { index, value} of array)

3. [Weather Stack API](https://weatherstack.com/)

   ```
      export WEATHER_API=access_key
      source ~/.bashrc  # OR source ~/.zshrc
   ```

4. NPM Packages

   - Axios

5. How to run the app

   - _lat_, _lng_ and _placeName_ are all optional as default value of **San Francisco** are set as default

   ```
      node app.js weather --lat=40.714 --lng=-74.006 --placeName=New York
      node app.js location --name='Los Angeles'
   ```

6. [Mapbox](https://account.mapbox.com/access-tokens/)

   - **username:** nsingh21

   ```
      export MAPBOX_ACCESS_KEY=access_key
      source ~/.bashrc  # OR source ~/.zshrc
   ```

7. Debugger
   ```
      node inpect debugger.js
   ```
   - Use of **repl** to inspect the elements where debugger is stopped
   - [Documentation](https://nodejs.org/api/debugger.html)
