require('dotenv').config();

const express = require('express');
const routes = require('./routes/patient');
const helmet = require('helmet');

const path = require("path");

const app = express();

app.set('view engine', 'pug');
app.use(helmet());

// allows for json body posts
app.use(express.json());

// uncomment below to allow for form-urlencoded body posts
// app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const mongoose = require('mongoose');
const { modelName } = require('./models/patient');

mongoose.connect(
    process.env.MONGODB_URI,
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})

app.get('/', (req, res) => {
  res.send("Hello Wonderful World!");
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// app.use(express.static(path.join(__dirname, "..", "public")));

module.exports = listener;