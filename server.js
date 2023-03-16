const config = require('./config/config.js')
const app = require('./express.js');
const mongoose =  require('mongoose')

require('dotenv').config()


mongoose.connect(config.mongodbURL, config.mongodbConfig)
    .then(() =>{
        console.log('Mongodb connected')
    })


app.get('/', (req, res)=>{
    res.send("Test route")
})


app.listen(config.port, () => {
    console.log(`SERVER RUN ON PORT ${config.port}`)
})