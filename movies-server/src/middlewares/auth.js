const jwt = require('jsonwebtoken')

const auth =  async (req, res, next) => {
    authorization = req.headers.authorization
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Request is not authenticated'});
    }
    var token = authorization.split(' ')?.slice(-1)[0];
    if (token == null) {
        return res.status(401).json({ message: 'No Token detected'});
    }
     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token  expired'});
        }
        req.user = user;
        next();
    })
}


module.exports = {
    auth
}

