const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    /*console.log("THIS IS FROM VALIDATETOKEN: " + req.body.token + req.query.token + req.headers["x-access-token"]);
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
    } catch(err) {
        return res.status(401).send("Invalid token!");
    }
    return next();*/
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    console.log("This is token from req.headers: " + req.headers["authorization"]);
    let token;
    if(authHeader) {
        //Splitting authHeader to get only the token part from it
        token = authHeader.split(" ")[1];
    } else {
        console.log("Token not found!")
        token = null;
    }
    if(token == null) return res.sendStatus(401);
    console.log("Token found!");
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    });
};