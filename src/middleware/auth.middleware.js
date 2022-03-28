const jwt = require("jsonwebtoken");

const config = process.env;
const verifyToken = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{
            if(error){
                return reject(error);
            }
            else{
                return resolve(decoded);
            }
        })
    })
};

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).send({message: 'Invalid authorization header'});
    }
    if(!authHeader.startsWith('Bearer ')){
        return res.status(400).send({message: 'Invalid authorization header'});
    }
    if (authHeader) {
        const token = authHeader.split(' ')[1];

       let decoded;
       try {
           decoded = await verifyToken(token);
       } catch (error) {
           return res.status(400).send({message:error.message});
       }
       req.userId = decoded.user._id;
       return next();
    } else {
        res.sendStatus(401);
    }
}
module.exports = authenticate;