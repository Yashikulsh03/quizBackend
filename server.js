require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const checkError = require('./middleware/error');
const bodyParser=require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: 'Something went wrong!' });
});

app.use('/', require('./routes/user'));
app.use('/api/quiz', require('./routes/quiz'));

app.use(checkError);

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connected!');
    })
    .catch((error) => {
        console.log('DB failed to connect', error);
    });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Backend server listening at port: ${PORT}`);
});
