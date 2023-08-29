const express = require('express');
const db = require('./models');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000

db.sequelize.sync().then(() => console.log("DB is ready"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', require('./routes'));

app.listen(PORT, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${PORT}`);
});