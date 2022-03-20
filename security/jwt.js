require("dotenv").config();
const jwt = require("jsonwebtoken");

const getToken = function (data) {
    let jwtSecretKey = process.env.APP_SECRET;

    const token = jwt.sign(data, jwtSecretKey);
    return token;
};

const Authenticate = async function (req, res, next) {
    let token = req.cookies.token;
    let jwtSecretKey = process.env.APP_SECRET;
    try {
        const verified = await jwt.verify(token, jwtSecretKey);
        if (verified) {
            req.user = verified;
            next();
        } else {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("/");
    }
};

module.exports = { Authenticate, getToken };
