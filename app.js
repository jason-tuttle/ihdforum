const express = require('express');
const bbsRouter = require('./routes/bbsRouter');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/', bbsRouter);


app.listen(3000, function() { console.log("Cannonball runnin'"); });
