const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const budgetRouter = require('./routes/budgetRoutes');
const userRouter = require('./routes/userRoutes');
const tokenRouter = require('./routes/tokenRoutes');
const getClient = require('./db');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use('/api', budgetRouter);
app.use('/api', userRouter);
app.use('/api', tokenRouter);

app.listen(port, host, async () => {
  console.log(`Server is running on port ${port}`);
  await getClient();
});
