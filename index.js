const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db'); // Database connection setup
const PORT = process.env.PORT || 5000;
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server');
});

// Task routes
app.use('/tasks', TaskRouter); // Mounting the TaskRouter at /tasks

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT=${PORT}`);
});