const crypto = require("crypto")

const encryptionPassword = (passowrd) => {
    const sha256 = crypto.createHash("sha256")
    return sha256.update(passowrd).digest("hex")
}

module.exports = {
    encryptionPassword,
}