const express = require('express'); //tells the program to require express
const Datastore = require('nedb'); //tells the program to require nedb

const app = express(); //runs express
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});

app.use(express.static('public')); //shows the program where to look for the file
app.use(express.json({limit: '1mb'})); 

const database = new Datastore('database.db');
database.loadDatabase(); //tells program where to look for data and to load it

app.get('/api', (request,response)=>{
  database.find({}).sort({date:1}).exec(function (err,docs){
    response.json(docs);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  database.insert(data);
  response.json(data);
  console.log(data); //sorts timestamps to appear in a chronological order
});
