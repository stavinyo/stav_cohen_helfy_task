const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors()); 

app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});