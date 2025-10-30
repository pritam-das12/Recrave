import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDB.js';


import messageRoutes from './routes/message.route.js';
import stallRequirementRoutes from './routes/stallRequirement.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

app.use('/api/v1', messageRoutes);
app.use('/api/v1', stallRequirementRoutes);

await connectDB();

// connect to db
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});