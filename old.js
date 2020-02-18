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
} ) ;*/