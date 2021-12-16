const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    //Getting authHeader from the request
    const authHeader = req.headers["authorization"];
    let token;
    if(authHeader) {
        //Splitting authHeader to get only the token part from it
        token = authHeader.split(" ")[1];
    } else {
        console.log("Token not found!")
        token = null;
    }
    //If there is no token we will return unauthorized status
    if(token == null) return res.sendStatus(401);
    console.log("Token found!");
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        //If everything succeeds, we set the user to req.user
        req.user = user;
        next();
    });
};