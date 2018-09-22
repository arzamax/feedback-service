const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const { db, dbuser, dbpass } = require('./config');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

mongoose.connect(`mongodb://${dbuser}:${dbpass}@${db}`, {
    useNewUrlParser: true
});
require('./models/FeedbackTypeModel');
require('./models/FeedbackModel');

app.use('/', require('./routes'));

if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/build', 'index.html')));
}

app.use((error, req, res, next) => {
    res.json({
        error: true,
        message: error.message
    })
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running`)
});