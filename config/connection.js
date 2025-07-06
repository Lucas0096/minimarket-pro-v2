// Conexión a MongoDB usando Mongoose
const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/minimarket_pro_mongo';

const connectMongo = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectMongo;