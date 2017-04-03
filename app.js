/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '4408bb46-b9f9-440b-a236-bb5da0155dcf',
  'password': '18itZWMTeSEf',
  'version_date': '2017-02-27'
});

app.get('/', function(req, res) {
  myresult = "";
  res.render('index',myresult);
});

app.post('/analyze', function(req, res) {
        var mytext = req.body.analyzeText;
        console.log('1' + mytext);
        var parameters = {
          'text': mytext ,
          'features': {
            'entities': {
              'emotion': true,
              'sentiment': true,
              'limit': 2
            },
            'keywords': {
              'emotion': true,
              'sentiment': true,
              'limit': 2
            },

			'concepts': {
			      'limit': 3
			    }

          }
        }
        var myresult = "";

        analyzeUnderstanding(parameters, function(output){
          myresult = output;
          res.render('index',{myresult : myresult});
          
        })
        
});

function  analyzeUnderstanding (parameters,callback) {
    natural_language_understanding.analyze(parameters, function(err, response) {
      if (err) { console.log('error:', err)}
      else {
      	var results = JSON.stringify(response, null, 2);
      	for(var i=0;i<results.concepts.length;i++)
			{
      			result += results.concepts[i].text  + ', ';
      		}
      	callback(result);
      	}

            
    });

}


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
