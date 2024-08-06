const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Cấu hình kết nối SQL Server
const dbConfig = {
    user: 'sa',
    password: '1234',
    server: 'localhost:1433',
    database: 'Phu_Dao_SOF306_SP24',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Connected to SQL Server');
    }

    // Route đơn giản để kiểm tra kết nối
    app.get('/api/data', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM your_table');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

}).catch(err => {
    console.error('Database connection failed:', err.message);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
