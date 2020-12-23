const mongoose = require('mongoose');

// DBURI
const URI = `mongodb+srv://root:${process.env.DBPASSWORD}@cluster0.9jsug.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// connect to mongodb
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('db connect!')
});