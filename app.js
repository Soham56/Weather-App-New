
// Setup All Requiered Modules
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


// Utility lists
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septembar', 'Octobar', 'Novembar', 'Decembar'];

//Get Request
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})


// Post Request
app.post("/", (req,res)=>{
    let cityName = req.body.cityName;
    let units = req.body.units;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4747c276c6a69bf9c17a95447368830b&units=${getTempUnit(units)}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4747c276c6a69bf9c17a95447368830b&units=${getTempUnit(units)}`;

    var values = {};

    https.get(url, function(respond){
        
        // console.log(respond.statusCode)

        if(respond.statusCode!=200){
            res.sendFile(__dirname + "/faliurePage.html");
        }
        else{
        
            respond.on("data", function(data){
                const weatherData = JSON.parse(data);

                console.log(weatherData);
                
                //main-section
                let description = weatherData.weather[0].description;
                let temp = weatherData.main.temp;
                let unitAbbr = getUnitAbbr(units);
                let icon = weatherData.weather[0].icon;
                let icon_pic = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                values.bg_img = imageAdderess(description);

                const date  = new Date();
                const localTime = date.getTime();
                const localOffset = date.getTimezoneOffset()*60000;
                const currentUtc = localTime + localOffset;
                const cityOffset = currentUtc + 1000*(weatherData.timezone);
                const cityInfo = new Date(cityOffset);
                
                const cityDay = days[cityInfo.getDay()];
                const cityDate = String(cityInfo.getDate());
                const cityMonth = String(cityInfo.getMonth());
                const cityYear = cityInfo.getFullYear();

                const cityDateFormat = `${cityDay}, ${numberAbbr(cityDate)} ${months[cityMonth]} ${cityYear}`;
                const cityTimeFormat = `${cityInfo.getHours()===12 ? cityInfo.getHours() : cityInfo.getHours()%12} : ${String(cityInfo.getMinutes()).padStart(2,'0')} ${cityInfo.getHours()>=12 ? 'PM' : 'AM'}`

                

                //Winds
                let wind_speed = weatherData.wind.speed;
                let wind_deg = weatherData.wind.deg;
                let wind_gust = weatherData.wind.gust;

                //Others
                let latitude = weatherData["coord"].lat;
                let longitude = weatherData["coord"].lon;
                let temp_min = weatherData.main.temp_min;
                let temp_max = weatherData.main.temp_max;
                let pressure = weatherData.main.pressure;
                let humidity = weatherData.main.humidity;
                let visibility = weatherData.visibility;
                let rain = "-";

                values["icon_pic"] = icon_pic;
                values.temp = temp;
                values.unitAbbr= unitAbbr;
                values.windSpeedUnit = windSpeedAbbr(units);
                values.cityDateFormat= cityDateFormat;
                values.cityTimeFormat= cityTimeFormat;
                values.description= description;
                values.place= cityName;
                values.wind_speed= wind_speed;
                values.wind_deg= wind_deg;
                values.wind_gust= wind_gust;
                values.latitude= latitude;
                values.longitude= longitude;
                values.temp_min= temp_min;
                values.temp_max= temp_max;
                values.pressure= pressure;
                values.humidity= humidity;
                values.visibility= visibility;
                values.rain= rain;
                
                https.get(forecastUrl, (respond1)=>{
        
                    if(respond1.statusCode != 200){
                        res.sendFile(__dirname + "/faliurePage.html");
                    }
                    else{
                        let chunks = [];

                        respond1.on("data", (data)=>{
                            chunks.push(data);
                        }).on('end', ()=>{

                            let data = Buffer.concat(chunks);
                            const forecastData = JSON.parse(data);
            
                            let forecastDataOne = forecastData.list[0];
                            let forecastDataTwo = forecastData.list[1];
                            let forecastDataThree = forecastData.list[2];
                            let forecastDataFour = forecastData.list[3];
                            let forecastDataFive = forecastData.list[4];

                            // console.log(forecastDataOne.weather[0]);
            
                            values.forecastDataOne_icon_pic = `https://openweathermap.org/img/wn/${forecastDataOne.weather[0].icon}@2x.png`;
                            values.forecastDataTwo_icon_pic = `https://openweathermap.org/img/wn/${forecastDataTwo.weather[0].icon}@2x.png`;
                            values.forecastDataThree_icon_pic = `https://openweathermap.org/img/wn/${forecastDataThree.weather[0].icon}@2x.png`;
                            values.forecastDataFour_icon_pic = `https://openweathermap.org/img/wn/${forecastDataFour.weather[0].icon}@2x.png`;
                            values.forecastDataFive_icon_pic = `https://openweathermap.org/img/wn/${forecastDataFive.weather[0].icon}@2x.png`;
                            
                            values.forecastDataOne_description = forecastDataOne.weather[0].description;
                            values.forecastDataTwo_description = forecastDataTwo.weather[0].description;
                            values.forecastDataThree_description = forecastDataThree.weather[0].description;
                            values.forecastDataFour_description = forecastDataFour.weather[0].description;
                            values.forecastDataFive_description = forecastDataFive.weather[0].description;
            
                            values.forecastDataOne_temp = forecastDataOne.main.temp;
                            values.forecastDataTwo_temp = forecastDataTwo.main.temp;
                            values.forecastDataThree_temp = forecastDataThree.main.temp;
                            values.forecastDataFour_temp = forecastDataFour.main.temp;
                            values.forecastDataFive_temp = forecastDataFive.main.temp;
            
                            values.forecastDataOne_date = modifyDate(forecastDataOne.dt_txt.split(' ')[0]);
                            values.forecastDataTwo_date = modifyDate(forecastDataTwo.dt_txt.split(' ')[0]);
                            values.forecastDataThree_date = modifyDate(forecastDataThree.dt_txt.split(' ')[0]);
                            values.forecastDataFour_date = modifyDate(forecastDataFour.dt_txt.split(' ')[0]);
                            values.forecastDataFive_date = modifyDate(forecastDataFive.dt_txt.split(' ')[0]);
            
                            values.forecastDataOne_time = modifyTime(forecastDataOne.dt_txt.split(' ')[1]);
                            values.forecastDataTwo_time = modifyTime(forecastDataTwo.dt_txt.split(' ')[1]);
                            values.forecastDataThree_time = modifyTime(forecastDataThree.dt_txt.split(' ')[1]);
                            values.forecastDataFour_time = modifyTime(forecastDataFour.dt_txt.split(' ')[1]);
                            values.forecastDataFive_time = modifyTime(forecastDataFive.dt_txt.split(' ')[1]);

                            // console.log(values);

                            res.render('result', values);
                        });
                    }
                });
            });
        }
    });
});




app.listen(3000, ()=>{
    console.log("Server is running on port " + 3000);
});
















// Utility Functions

function imageAdderess(description){
    if(description==="shower rain" || description==='rain' || description==='thuderstrom'){
        return  "./images/rainy-weather.gif";
    }
    else if(description==="snow"){
        return  "./images/snow-weather.gif";
    }
    else if(description==="mist"){
        return  "./images/mist-weather.gif";
    }
    else{
        return "./images/sunny-weather.gif";
    }
}

function getTempUnit(units){
    if(units==='celcius'){
        return "metric";
    }
    else if(units==="kelvin"){
        return "standard";
    }
    else{
        return "imperial";
    }
}

function numberAbbr(n){
    if(n%10===1){
        return n+"st";
    }
    else if(n%10===2){
        return n+"nd";
    }
    else if(n%10===3){
        return n+"rd";
    }
    else{
        return n+"th";
    }
}

function getUnitAbbr(units){
    if(units==='celcius'){
        return "C";
    }
    else if(units==="kelvin"){
        return "K";
    }
    else{
        return "F";
    }
}

function windSpeedAbbr(units){
    if(units==='kelvin'){
        return "miles/hour";
    }
    else{
        return "meter/sec";
    }
}

function modifyTime(time){
    let hour = Number(time.split(':')[0]);
    let minutes = time.split(':')[1];
    let sec = time.split(':')[2];

    return `${hour==12 ? String(hour).padStart(2,'0') : String(hour%12).padStart(2,'0')} : ${minutes.padStart(2,'0')} : ${sec.padStart(2,'0')} ${hour>=12 ? 'PM' : "AM"}`;
}

function modifyDate(date){
    let year = date.split('-')[0];
    let month = months[Number(date.split('-')[1])-1];
    let day = date.split('-')[2];

    return `${numberAbbr(Number(day))} ${month} ${year}`;
}