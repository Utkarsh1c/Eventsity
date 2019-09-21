const express = require('express');
const sequelize = require('./util/database');

const User = require('./models/user');
const Event = require('./models/events');
const Otp = require('./models/otp');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();  
})

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
   .catch(err => console.log(err))
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

Event.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Event);
// Otp.belongsTo(User);
// User.hasOne(Otp)

// User.hasMany(User, {as: 'Followed', through: 'Followed'});
// User.hasMany(Events, {as: 'Interested'}) 

sequelize
  .sync({ force: true })
  // .sync()
  .then(cart => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });
