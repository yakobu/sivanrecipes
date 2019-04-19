const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const routes = require('./routes');

require('./models/User');
require('./models/Recipe');
require('./models/Comment');
require('./config/passport');

const app = express();

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Redirect to https if request is set to http
app.use(function(request, response){
  if(request.protocol === "http"){
    response.redirect("https://" + request.headers.host + request.url);
  }
});


// Log all request to terminal
app.use(require('morgan')('dev'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to mongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sivanDB");
// Mongoose Promise is deprecated
mongoose.Promise = global.Promise;

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Routing middleware
app.use(routes);


// Error hendeling
app.use((err, req, res) => {
    req.send({fetch_error: err.message})
});


const server = app.listen(process.env.PORT || 3001, () => {
    console.log('Listening on port ' + server.address().port)
});