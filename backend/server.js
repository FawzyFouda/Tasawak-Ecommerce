require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// API تجريبي للاختبار
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');

        res.json({
            success: true,
            products: rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.use('/api/auth', authRoutes);
app.use('/api', productsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});