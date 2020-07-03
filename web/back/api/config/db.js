const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.DB_URI;
const db = mongoose.connection;

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, async() => {

})
  
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongoose is connected')
});