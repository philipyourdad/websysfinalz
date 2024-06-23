const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password',
    database: 'wellmeadows_hospital'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle signup
app.post('/Signup', (req, res) => {
    const { firstname, surname, address, birthday, gender, email, password } = req.body;

    // Insert into MySQL
    const sql = `INSERT INTO users (firstname, surname, address, birthday, gender, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [firstname, surname, address, birthday, gender, email, password], (err, result) => {
        if (err) {
            console.error('Error signing up:', err);
            res.status(500).json({ error: 'Error signing up' });
        } else {
            console.log('User signed up successfully');
            res.status(200).json({ message: 'User signed up successfully' });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
