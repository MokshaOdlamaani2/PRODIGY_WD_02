const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB()
  .then(async () => {
    // Seed admin user after DB is connected
    const Admin = require('./models/Admin');
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await Admin.create({
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'Admin'
      });

      console.log('✅ Admin seeded: admin@gmail.com / admin123');
    } else {
      console.log('ℹ️ Admin already exists, skipping seed.');
    }

    // Define routes
    app.use('/api/employees', require('./routes/employeeRoutes'));
    app.use('/api/auth', require('./routes/authRoutes'));

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
  });
