const User = require('../config/DB');
const { Encrypt, Decrypt } = require("../security/bcrypt");
const _ = require("lodash");
const { getToken } = require('../security/jwt')


const signup = function (req, res) {
    const name = req.body.name;
    const email = _.toLower(req.body.email);
    const password = req.body.password;


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
                }
            });
        }
    });
};

const login = function (req, res) {
    const email = _.toLower(req.body.email);
    const password = req.body.password;

    User.findOne({ email: email }, async function (error, foundUser) {
        if (foundUser) {
            const result = await Decrypt(password, foundUser.password);
            if (result === true) {
                const token = getToken({ userId: foundUser._id });
                res.cookie("token", token);
                const { name, email } = foundUser;
                res.json({
                    name: name,
                    email: email,
                    token: token,
                    message: "Login Successful",
                });
            } else {
                res.status(400).send({ message: "Incorrect Password." })
            }
        } else {
            res.status(400).send({ message: "User Not Found." });
        }
    });
};

const addWatch = function (req, res) {
    const id = req.body.id;
    const type = req.body.type;

    const movieObj = {
        movie_id: id,
        type: type
    };


    User.findOneAndUpdate({ _id: req.user.userId }, {
        $push: {
            movie: {
                $each: [movieObj],
                $position: 0
            }
        }
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send({ message: "Error while adding to watchlist." });
        } else {
            res.send({ message: "Successfully added" });
        }
    })
}

const removeWatch = function (req, res) {
    const id = req.body.id;

    User.findOneAndUpdate({ _id: req.user.userId }, {
        $pull: {
            movie: {
                movie_id: id
            }
        }
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send({ message: "Error while removing to watchlist." });
        } else {
            res.send({ message: "Successfully removed" });
        }
    })
}

const deleteWatch = function (req, res) {

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
}

const getWatch = function (req, res) {
    User.findOne({ _id: req.user.userId }, function (err, foundUser) {
        if (err) {
            console.log(err);
            res.status(400).send({ message: "Error while getting watchlist." });
        } else {
            res.send(foundUser.movie);
        }
    })
}




module.exports = { signup, login, addWatch, removeWatch, deleteWatch, getWatch };
