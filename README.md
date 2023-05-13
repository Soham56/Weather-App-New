# Weather-App
### In this project I have build a weather app  which gives the weather information for given inputed cities.

&nbsp;

# Description
### In this weather app , there are four sections -
1. Weather Description, Temperature, Date and time.
2. Wind Speed, Wind gust, Wind Direction
3. Other weather information , like : Latitude, Longitude, Humidity, Pressure etc.
4. Weather forecast of the given city with the span of 3 hours

### Visit **[weather-app]()** and Enter the the city name to get the **Current and Forecast** Weather Data of the given city.

&nbsp;

# Tech-Stack Used
- ## Backend
    - node js
    - EJS

- ## Frontend
    - Html, Css, Javascript

&nbsp;

# Sources
### I have used [openweather](https://openweathermap.org/) api for fetching data of the given city.

&nbsp;

# Procedure
* ### Firstly initialize git
    ```
     git init
    ```

* ### Then created two static Web Page , One for [Input Page](./index.html) another for [Faliure page](./faliurePage.html) using **html and css.**

* ### Then initialize npm with
    ```
    npm init
    ```
* ### install reqired modules for the project using 
    ```
    npm i express body-parser
    ```

* ### Created an [app.js](./app.js) for backend and require all modules to make this project , then fetch all data using using openweather api call and server this datas to [ejs page](./views/result.ejs)

* ### Finaly add all this files to staging area , commit to the local repository and push all the codes to remote repository

    ```
    git add .
    git commit -m "Uploaded Initial Files"
    git remote add origin "repository-url"
    git branch -M main
    git push -u origin main
    ```

&nbsp;

# Author
- [Github](https://github.com/Soham56)
- [Linkedin](https://www.linkedin.com/in/soham-dey/)