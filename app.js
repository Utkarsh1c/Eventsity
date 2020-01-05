//requiring express and database
const express = require('express');
const sequelize = require('./util/database');
const path = require('path');

//requiring models
const User = require('./models/user');
const Event = require('./models/events');
const Otp = require('./models/otp');

//requiring routes
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

const app = express();

//middleware for parsing
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//middleware for cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();  
})


//deployment
app.use(express.static(path.join(__dirname, 'dist/Eventsity')));


//redirecting to routes
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);



app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Eventsity/index.html'));
});


//middleware error handler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data })
})

//sequelize associations
Event.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Event);
Event.belongsToMany(User, { as: 'Register', through: 'Registered' });
User.belongsToMany(Event, { as: 'Register', through: 'Registered' });

//For additional feature
User.belongsToMany(User, { as: 'Follow', through: 'Followed' });
 

//starting server
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    
    app.set( 'port', ( process.env.PORT || 5000 ));

// Start node server
  app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
    // app.listen(8080);
  })
  .catch(err => {
    console.log(err)
  });
