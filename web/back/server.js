const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./api/routes/apiRoutes');
const corsOptions = { origin: '*', optionsSuccessStatus: 200 };
const FRONT_URL = process.env.FRONT_URL;
const PORT = process.env.PORT || 3000;


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());


app.use((req, res, next)=>{
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', FRONT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization');
    
    res.header('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next()
});


app.get('/', (req, res, next) => {
    res.send('<div style="display: flex; justify-content: center; flex-direction: center;"><h3>Hello, My API !</h3></div><div>Views data : <a href="/api">here</a></div>');
});


app.use('/api', apiRoutes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401);
      res.json({"message" : err.name + ": " + err.message});
    }
  });


app.listen(PORT, () => {
    console.log(`Node app is running on port: ${PORT}`);
});
