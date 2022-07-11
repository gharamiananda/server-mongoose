var jwt = require('jsonwebtoken');


function verify(req, res, next) {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.status(403).json("Token is expire")

            req.user = user;
            next();
        })
    } else {
        return res.status(401).json("You are not a authentication user")
    }

}

module.exports = verify