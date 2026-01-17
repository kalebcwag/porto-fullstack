const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server berjalan di port ${port}`);
    });
}

app.use(cors()); // Izinkan Frontend mengakses Backend
app.use(express.json());

app.get('/', (req, res) => res.send('Backend is Running!'));
app.use('/api', apiRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server berjalan di port ${PORT}`);
    });
}

module.exports = app;