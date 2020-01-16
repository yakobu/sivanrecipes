const path = require('path');
const express = require('express');
const webpush = require("web-push");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const routes = require('./routes');

webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY,);
webpush.setVapidDetails(
    `mailto:${process.env.APP_EMAIL}`,
    process.env.REACT_APP_PUBLIC_VAPID_KEY,
    process.env.REACT_APP_PRIVATE_VAPID_KEY
);


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


// Redirect all http requests to https on production mode
if (process.env.PRODUCTION_MODE){
    const enforce = require('express-sslify');
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}


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
    console.log(`Dyno set to: ${process.env.DYNO_URL}`)

    // Keep herokuapp awake
    if (process.env.DYNO_URL)
    {
        var https = require("https");
        setInterval(function() {
            try{
                console.log(`Ping to Dino ${process.env.DYNO_URL}`)
                https.get(process.env.DYNO_URL);
            }
            catch(e){
                console.error(e)
                console.log("Ping interval is still activated")
            }
        }, 300000); // every 5 minutes (300000)
    }
});