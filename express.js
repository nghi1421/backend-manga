const express = require('express');
const helmet = require('helmet')
const app = express();
const userRouter =  require('./routes/user.route');
const bodyParser = require('body-parser');

app.use(helmet());
app.use(bodyParser.json());

app.use('/api/', userRouter)


module.exports = app
