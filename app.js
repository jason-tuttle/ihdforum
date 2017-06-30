const express = require('express');
const path = require('path');
const bbsRouter = require('./routes/bbsRouter');
const models = require('./models');
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/resources', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', bbsRouter);

// models.likes.create({
//   messageId: 1,
//   userId: 5
// }).then((newLike) => console.log(newLike.toJSON()));
// models.likes.create({
//   messageId: 1,
//   userId: 6
// }).then((newLike) => console.log(newLike.toJSON()));


// models.messages.findOne({
//   where: {id: 1},
//   include: [{
//     model: models.users,
//     as: 'user' },
//     {model: models.likes,
//     as: 'likes'}
//   ]
// }).then((newmessage) => console.log(newmessage.toJSON()));



app.listen(3000, function() { console.log("Cannonball runnin'"); });
