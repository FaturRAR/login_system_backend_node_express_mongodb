const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// DB Connection
require('./app/db/connect');

// Router 
const router = require('./app/route/user.router');
router(app);

app.listen(PORT, () => console.log(`server running in port ${PORT}`))