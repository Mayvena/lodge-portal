const jwt = require('jsonwebtoken');
const config = require('dotenv').config().parsed;

const verifyjwt = (req,res,next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send({ message: 'Unauthorized user!'});

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        res.status(200).send({ message: 'Token is valid'});
        // next();
    } catch(err) {
        res.status(400).send({ message: 'Token not valid'});
    }
}

module.exports = verifyjwt;