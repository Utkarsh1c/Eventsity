const express = require('express');
const sequelize = require('./util/database');

const User = require('./models/user');
const Events = require('./models/events');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();  
})

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data })
})

Events.belongsTo(User);
// User.hasMany(User, {as: 'Followed'});
// User.hasMany(Events, {as: 'Interested'})

sequelize
  // .sync({ force: true })
  .sync()
  .then(cart => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
