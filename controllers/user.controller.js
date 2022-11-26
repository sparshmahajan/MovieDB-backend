const User = require('../config/DB');
const { Encrypt, Decrypt } = require("../security/bcrypt");
const _ = require("lodash");
const { getToken } = require('../security/jwt')
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const signup = function (req, res) {
    const name = req.body.name;
    const email = _.toLower(req.body.email);
    const password = req.body.password;
    try {
        User.findOne({ email: email }, async function (error, foundUser) {
            if (foundUser) {
                res.status(400).send({ message: "Account Already exists." });
            } else {
                const encryptedPassword = await Encrypt(password);
                const user = new User({
                    name: name,
                    email: email,
                    password: encryptedPassword,
                });
                user.save(function (e) {
                    if (!e) {
                        res.send({ message: "Successfully saved user data." });
                    }
                    else {
                        res.status(400).send({ message: "Error while saving data." });
                        console.log(e);
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).send({ message: "SOMETHING WENT WRONG" });
        console.log(error);
    }
};

const login = function (req, res) {
    const email = _.toLower(req.body.email);
    const password = req.body.password;
    try {
        if (!email || !password) {
            res.status(400).send({ message: "Please enter all fields." });
        }

        User.findOne({ email: email }, async function (error, foundUser) {
            if (foundUser) {
                const result = await Decrypt(password, foundUser.password);
                if (result === true) {
                    const token = getToken({ userId: foundUser._id });
                    const { name, email, movie } = foundUser;
                    res.json({
                        name: name,
                        email: email,
                        token: token,
                        movie: movie,
                        message: "Login Successful",
                    });
                } else {
                    res.status(400).send({ message: "Incorrect Password." })
                }
            } else {
                res.status(400).send({ message: "User Not Found." });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while logging in." });
    }
};

const addWatch = function (req, res) {
    const id = req.body.id;
    const type = req.body.type;

    try {
        const movieObj = {
            movie_id: id,
            media_type: type
        };
        User.findOneAndUpdate({ _id: req.user.userId }, {
            $push: {
                movie: {
                    $each: [movieObj],
                    $position: 0
                }
            }
        }, { new: true }, function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Error while adding to watchlist." });
            } else {
                const { movie } = result;
                res.json({
                    movie: movie,
                    message: "Successfully added"
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while adding to watchlist." });
    }
}

const removeWatch = function (req, res) {
    const id = req.body.id;
    try {
        User.findOneAndUpdate({ _id: req.user.userId }, {
            $pull: {
                movie: {
                    movie_id: id
                }
            }
        }, { new: true }, function (err, result) {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Error while removing to watchlist." });
            } else {
                const { movie } = result;
                res.json({
                    movie: movie,
                    message: "Successfully removed"
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while removing to watchlist." });
    }
}

const deleteWatch = function (req, res) {
    try {
        User.findOneAndUpdate({ _id: req.user.userId },
            {
                $set: {
                    movie: []
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                    res.status(400).send({ message: "Error while deleting to watchlist." });
                } else {
                    res.send({ message: "Successfully deleted" });
                }
            })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while deleting to watchlist." });
    }
}

const getWatch = function (req, res) {
    try {
        User.findOne({ _id: req.user.userId }, function (err, foundUser) {
            if (err) {
                console.log(err);
                res.status(400).send({ message: "Error while getting watchlist." });
            } else {
                res.send(foundUser.movie);
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while getting watchlist." });
    }
}

const forgotPassword = function (req, res) {
    const email = _.toLower(req.body.email);
    try {
        User.findOne({ email: email }, async function (error, foundUser) {
            if (foundUser) {
                const token = jwt.sign({ userId: foundUser._id + " " + foundUser.password }, process.env.APP_SECRET, { expiresIn: '5m' });

                const oauth2Client = new OAuth2(
                    process.env.CLIENT_ID,
                    process.env.CLIENT_SECRET,
                    "https://developers.google.com/oauthplayground",
                );

                oauth2Client.setCredentials({
                    refresh_token: process.env.REFRESH_TOKEN
                });

                var deployed_url = process.env.DEPLOYED_URL;
                if(process.env.NODE_ENV === "development"){
                    deployed_url = "http://localhost:5000";
                }

                const transporter = nodeMailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: "OAuth2",
                        user: process.env.EMAIL,
                        clientId: process.env.CLIENT_ID,
                        clientSecret: process.env.CLIENT_SECRET,
                        refreshToken: process.env.REFRESH_TOKEN,
                        accessToken: oauth2Client.getAccessToken()
                    }
                });
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: 'Reset Password',
                    html: `<h1>Reset Password</h1>
                <p>Click on the link to reset your password</p>
                <a href="${deployed_url}/api/reset/${token}">Reset Password</a>`
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: "Error while sending mail." });
                    } else {
                        res.send({ message: "Mail sent successfully" });
                    }
                });
            } else {
                res.status(400).send({ message: "User Not Found." });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while sending mail." });
    }
}

const resetPassword = function (req, res) {
    const token = req.body.token;
    const password = req.body.password;
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        const id = decoded.userId.split(" ")[0];
        const oldPassword = decoded.userId.split(" ")[1];
        User.findOne({ _id: id, password: oldPassword }, async function (error, foundUser) {
            if (foundUser) {
                const encryptedPassword = await Encrypt(password);
                User.updateOne({ _id: id }, {
                    $set: { password: encryptedPassword }
                }, function (err) {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ message: "Error while resetting password." });
                    } else {
                        res.send({ message: "Password reset successfully" });
                    }
                })
            } else {
                res.status(400).send({ message: "User Not Found." });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Error while resetting password." });
    }
}


module.exports = { signup, login, addWatch, removeWatch, deleteWatch, getWatch, forgotPassword, resetPassword };
