import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import morgan from "morgan";
import jobRoutes from "./routes/job.routes.js";

// Importing the dotenv package to load environment variables from a .env file
// and setting the path to the .env file.
dotenv.config({ path: './.env' });

const app = express();

// Advanced CORS configuration
const allowedOrigins = [process.env.FRONTEND_URL];
app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.use("/api/v1/job", jobRoutes);


connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log('✅ [SUCCESS] Server is running on:');
        console.log(`   🌐 URL: http://localhost:${PORT}`);
        console.log(`   📚 API: http://localhost:${PORT}/api \n`);
    });
}).catch((error) => {
    console.log('❌ [ERROR] Failed to connect to the database:', error);
    process.exit(1);
})