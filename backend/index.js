import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import path from 'path';


import messageRoutes from './routes/message.route.js';
import stallRequirementRoutes from './routes/stallRequirement.route.js';

dotenv.config();

const __dirname = path.resolve();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5174", "https://recrave-d5ek.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.static(path.join(__dirname, 'project/dist')));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'project/dist', 'index.html'));
});


app.use(express.json());

app.use('/api/v1', messageRoutes);
app.use('/api/v1', stallRequirementRoutes);

await connectDB();

// connect to db
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});