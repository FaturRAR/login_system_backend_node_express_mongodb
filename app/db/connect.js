const mongoose = require('mongoose');
const dbName = "login_page";
const dbPassword = "root";
const URI = `mongodb+srv://root:${dbPassword}@cluster0.9jsug.mongodb.net/${dbName}?retryWrites=true&w=majority`;


mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('admin db connect!')
});