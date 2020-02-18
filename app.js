var  express  =  require ( 'express' ) ;
var  bodyParser  =  require ( 'body-parser' ) ;
var  request  =  require ( 'request' ) ;
var  app  =  express ( ) ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var path = require("path");
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//***************Webhook*************** *//

app.post('/webhook',function(req,res){
    console.log('Received a post request');
    if(!req.body)return res.sendStatus(400);
    res.setHeader('Content-Type','application/json');
    console.log('here is the post request from DialogFlow');
    console.log(req.body);
    console.log('Got geo city parameter from DialogFlow'+req.body.queryResult.parameters['geo-city']);
        var city = req.body.queryResult.parameters['geo-city'];
        var w = getWeather(city);
        let response = "";//Default response from the webhook to show its working
        let responseObj = {
            "fulfillmentText":response,
            "fulfillmentMessages":[{"text":[w]}],
            "source":""
        }
    console.log('Here is the response to dialogFlow');
    console.log(responseObj);
    return res.json(responseObj);
    //res.send(JSON.stringfy({speech:w,displayText:w,source:'api ai-weather-webhook}));*/
})

//********Weather API****** *//
var apiKey = '303bfc17dc8102d581d1c1dbb10eb857';
var result;

function cb(err,response,body){
    if(err){
        console.log('error',error);

    }
    var weather = JSON.parse(body)
    if(weather.message === 'city not found'){
        result = 'Unable to get weather'+weather.message;
    }
    else{
        result = 'Right now its'+weather.main.temp+'degrees with'+weather.weather[0].description;
    }
}
function getWeather(city){
    result = undefined;
    var url = `http://samples.openweathermap.org/data/2.5/weather?q={city},ke&appid={apiKey}`;
    console.log(url);
    var req = request(url,cb);
    while(result === undefined){
        require('deasync').runLoopOnce();
    }
    return result;
    
}





