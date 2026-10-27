require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
}));

// Request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Load OpenAPI documentation
const swaggerDocument = YAML.load(
  path.join(__dirname, '../../openapi.yaml')
);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Application routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/funerals', require('./routes/funerals'));
app.use('/api/funerals', require('./routes/members'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/vendors', require('./routes/vendors'));
app.use('/api/products', require('./routes/products'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/condolences', require('./routes/condolences'));

// Public health check — does not require an API key
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Faraja API running',
    timestamp: new Date()
  });
});

// Partner API routes — authentication and rate limiting
// are configured in routes/contract.js
app.use('/', require('./routes/contract'));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

// Start the server only when this file is executed directly.
// This allows Supertest to import the app without opening a port.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Faraja API listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
