const express = require('express');
const connectDB = require('./config/Db');
const app = express();

connectDB();

app.use(express.json({ extented: false }));

app.get('/', (req, res) => res.send(`API running`));

app.use('/api/users', require('./Routes/api/users'));
app.use('/api/auth', require('./Routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
