const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]

    if(!token)
        return res.sendStatus(401);
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decoded);
        
        next();
    }
    catch(err){
        return res.json({
            status: 'error',
            msg: err.message()
        })
    }
}

module.exports = verifyToken;