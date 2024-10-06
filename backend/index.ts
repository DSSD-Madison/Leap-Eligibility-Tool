import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Load environment variables
dotenv.config();

// Environment configuration
const PORT = process.env.PORT || 8080;
console.log(`Starting API in ${process.env.NODE_ENV} mode`);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});