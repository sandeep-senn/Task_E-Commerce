import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';;
import mongoose from 'mongoose'
import productRoutes from "./routes/productRoutes.js";


dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));app.use(express.json())

mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.log("MongoDB connection error:", err));

app.get('/', (req, res) =>{
    res.send('API is running...')
})

// app.use('/api/products', productRoutes)
app.use("/api/products", productRoutes);

const PORT = 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

export default app;