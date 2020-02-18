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





/*var  express  =  require ( 'express' ) ;
var  bodyParser  =  require ( 'body-parser' ) ;
var  request  =  require ( 'request' ) ;
var  app  =  express ( ) ;

// The body of requests received will be formatted in JSON format
app . use ( bodyParser . urlencoded ( {  extended : false  } ) ) ;
app . use ( bodyParser . json ( ) ) ;

// function where the climate solitudes are processed
app . post ( '/ weather' ,  function  ( req ,  res )  {
  // We extract the city parameter, which is within the request (webhook) of the agent
  var  city  =  req . body . queryResult . parameters . City ;
  var  codeCity  =  0 ;
  var  urlCodeCity  =  'http://dataservice.accuweather.com/locations/v1/cities/KE/search?apikey=MvU7UObA8YaiczZANXuAG7AtNMzjJV2f&q='  +  city ;
  console . log ( 'Climate query for'  +  city ) ;

  // JSON type variable to save the response to be sent to the agent
  var  climate  =  {
    fulfillmentText : ''
  } ;

  // We make the query to find the city by name
  request ( urlCodeCity ,  {  json : true  } ,  ( err ,  resp ,  body )  =>  {    
    // If there is an error processing the city search request
    if ( err ) { 
      console . log ( 'Error searching city' ) ;
      console . log ( err ) ;
      climate . fulfillmentText  =  'It was not possible to check your city at this time' ;
    }
    else { 
      // The content of the response to our request is found in the body variable
      // for more information about how the request module works
      //https://www.npmjs.com/package/request


      /* We verify that there is a response from the accuweather API, that API
      an array of objects returns with information about the weather, in case the 
      arrangement has a length of zero, it means that the city was not found, you have to take
      In the case of Spanish, the tildes or some special character may not generate
      found the searched city */
     /* if ( body.length  ==  0 ) {
        console.log ( 'City not found' ) ;
        climate . fulfillmentText  =  'Your city was not found, make sure you wrote it correctly' ;
        res . json ( climate ) ;
      }
      else {
        // We extract the city id
        codeCity  =  body [ 0 ] . Key ;
        // and assemble the url for the weather consultation
        var  urlCodeCity  =  'http://dataservice.accuweather.com/currentconditions/v1/'  + codeCity  +  '?apikey=MvU7UObA8YaiczZANXuAG7AtNMzjJV2f& language = en' ;
        
        // We carry out the consultation to look for the climate of the city by its id
        request ( urlCodeCity ,  { json : true } ,  ( err2 ,  resp2 ,  body2 )  =>  {
          // in case of error we indicate a problem
          if ( err2 ) {
            console . log ( 'Problem getting the weather' ) ;
            climate . fulfillmentText  =  'It was not possible to check the climate of your city at this time' ;
          }

          // We extract the information from the API, and assemble the response to be sent to the agent
          // more details https://developer.accuweather.com/accuweather-current-conditions-api/apis/get/currentconditions/v1/%7BlocationKey%7D
          climate . fulfillmentText  =  'The temperature of'  +  city  +  'is'  +  body2 [ 0 ] . Temperature . Metric . Value ;
          climate . fulfillmentText  +=  'y'  +  body2 [ 0 ] . WeatherText ;          

          res . json ( climate ) ;
        } ) ;
      }
    }
  } ) ;
} ) ;

// Indefinite loop listening to port 3000, waiting for requests
app . listen ( 3000 ,  function  ( )  {
  console . log ( 'App listening to port 3000' ) ;
} ) ;