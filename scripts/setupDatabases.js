/**
 * Script para conectar y crear las tablas en PostgreSQL y las colecciones en MongoDB
 * Incluye datos de ejemplo básicos para ambas bases de datos
 * Ejecutar con: node scripts/setupDatabases.js
 */

const { createConnection } = require('typeorm');
const userEntity = require('../src/entities/User');
const marketEntity = require('../src/entities/Market');
const subscriptionEntity = require('../src/entities/Subscription');

const connectMongo = require('../src/config/connection');
const Product = require('../src/models/Product');
const Invoice = require('../src/models/Invoice');
const Sale = require('../src/models/Sale');
const Stat = require('../src/models/Stat');
const Log = require('../src/models/Log');
const Notification = require('../src/models/Notification');

(async () => {
  // PostgreSQL
  try {
    const pgConnection = await createConnection({
      type: 'postgres',
      url: 'postgres://user:password@localhost:5432/minimarket_pro_postgres',
      entities: [userEntity, marketEntity, subscriptionEntity],
      synchronize: true, // Solo para desarrollo, auto genera tablas
      logging: true,
    });

    // Datos por defecto
    const userRepo = pgConnection.getRepository('User');
    const marketRepo = pgConnection.getRepository('Market');
    const subscriptionRepo = pgConnection.getRepository('Subscription');

    let admin = await userRepo.findOne({ where: { email: 'admin@crm.com' } });
    if (!admin) {
      admin = await userRepo.save({
        email: 'admin@crm.com',
        password: 'hashedpassword',
        role: 'admin',
        lastActivity: new Date(),
      });
      console.log('Usuario admin creado');
    }

    let market = await marketRepo.findOne({ where: { name: 'Minimarket Central' } });
    if (!market) {
      market = await marketRepo.save({
        name: 'Minimarket Central',
        status: 'active',
        lastActivity: new Date(),
      });
      console.log('Mercado de ejemplo creado');
    }

    if (market && admin) {
      await pgConnection
        .createQueryBuilder()
        .relation('Market', 'users')
        .of(market)
        .add(admin);
    }

    let sub = await subscriptionRepo.findOne({ where: { market: market.id } });
    if (!sub) {
      await subscriptionRepo.save({
        market: market,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
      });
      console.log('Subscripción de ejemplo creada');
    }

    await pgConnection.close();
    console.log('Tablas PostgreSQL listas');
  } catch (err) {
    console.error('Error PostgreSQL:', err);
  }

  // MongoDB
  try {
    await connectMongo();

    // Crea productos de ejemplo
    const product = await Product.create({
      name: 'Producto de prueba',
      stock: 100,
      price: 10.99,
      marketId: null, // Puedes poner un ObjectId real si tienes mercados en MongoDB
    });
    console.log('Producto de ejemplo creado:', product._id);

    await Invoice.create({
      marketId: product.marketId,
      amount: 1099,
      issueDate: new Date(),
      status: 'pending',
    });

    await Sale.create({
      productId: product._id,
      marketId: product.marketId,
      quantity: 2,
      total: 21.98,
      saleDate: new Date(),
    });

    await Stat.create({
      type: 'sales',
      value: 2,
      date: new Date(),
    });

    await Log.create({
      action: 'login',
      userId: null, // Debe referenciar a un usuario válido si existe en MongoDB
      details: 'Inicio de sesión exitoso',
    });

    await Notification.create({
      userId: null, // Debe referenciar a un usuario válido si existe en MongoDB
      type: 'email',
      message: 'Bienvenido a Minimarket PRO',
      sentAt: new Date(),
      status: 'sent',
    });

    console.log('Colecciones MongoDB listas');
    process.exit(0);
  } catch (error) {
    console.error('Error MongoDB:', error);
    process.exit(1);
  }
})();