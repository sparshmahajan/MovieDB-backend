const bcrypt = require('bcrypt');
const res = require('express/lib/response');

const saltRounds = 10;

//encryption
const Encrypt = async (Epassword) => {
    console.log(Epassword);
    const hash = await bcrypt.hash(Epassword, saltRounds);

    return hash;
}

//Decryption
const Decrypt = async (Dpassword, foundPassword) => {
    const result = await bcrypt.compare(Dpassword, foundPassword);
    return result;
}

module.exports = { Encrypt, Decrypt };