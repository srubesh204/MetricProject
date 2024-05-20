// db.js
const mongoose = require('mongoose');

function connectDatabase() {
  mongoose.connect('mongodb://localhost/metric', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection is open');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose default connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection is disconnected due to application termination');
      process.exit(0);
    });
  });
}

module.exports = {
  connectDatabase,
};
