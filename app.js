const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const logRoutes = require('./routes/logRoutes');
const todoRoutes = require('./routes/todoRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
  });
app.use(bodyParser.json());

app.use('/users', authRoutes);
app.use('/logs', logRoutes);
app.use('/todos', todoRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err));

// module.exports = {app, mongoose}
