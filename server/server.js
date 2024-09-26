const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoute');
const projectRoutes = require('./src/routes/projectRoute');
const taskRoutes = require('./src/routes/taskRoute');
const { notFound, errorHandler } = require('./src/middlewares/errorMiddleware');
const morgan = require('morgan')

const connectDB = require('./src/config/db');
const cors = require('cors')

dotenv.config();
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ 
    origin: 'http://localhost:3000',
    credentials: true,
})); 
app.use(cookieParser());

// Route middleware
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
