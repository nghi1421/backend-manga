const config = {
    env: process.env.NODE_ENV || 'development',
    port:  3000  || process.env.PORT ,
    mongodbURL: "mongodb+srv://cluster0.ci7dems.mongodb.net/",
    mongodbConfig: {
        dbName: 'Manga',
        user: 'test_db',
        pass: "thanhnghi123123",
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    JWT_expired: 2628000
}
  
module.exports = config