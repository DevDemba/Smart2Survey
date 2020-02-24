const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const myRouter = express.Router();
const apiRoutes = require('./api/routes/apiRoutes');

const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

/* const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'database name'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
}); */

const publicRoot = '../front/survey/dist/survey';
app.use(express.static(publicRoot));
 
app.use(cors(corsOptions));
// app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


app.use((req, res, next)=>{
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
    
    res.header('Access-Control-Allow-Credentials', true);
    
    // Pass to next layer of middleware
    next()
 });

app.get('/', (req, res, next)=> {
     res.send('<h3 style="display: flex; justify-content: center;">Hello, My API !</h3>');
 })

/*  myRouter.get("/", (req, res, next) => {
    res.sendFile('index.html', { root: publicRoot });
}); */

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Node app is running on port: ${PORT}`);
});
