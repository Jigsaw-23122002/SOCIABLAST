const crypto = require('crypto');
const secret = 'pppppppppppppppppppppppppppppppp';

const encrypt = (Password) => {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secret), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(Password),
        cipher.final(),
    ]);
<<<<<<< HEAD
    return { iv: iv.toString("hex"), password: encryptedPassword.toString("hex") };
=======
    return { iv: iv.toString("hex"), roomcode: encryptedPassword.toString("hex") };
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
}

const decrypt = (encryption) => {
    const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        Buffer.from(secret),
        Buffer.from(encryption.iv, "hex")
    );
    const decryptedPassword = Buffer.concat([
<<<<<<< HEAD
        decipher.update(Buffer.from(encryption.password, "hex")),
=======
        decipher.update(Buffer.from(encryption.roomcode, "hex")),
>>>>>>> 93c91709431a2fea49a090fadf5f105436d96c82
        decipher.final()
    ])
    return decryptedPassword.toString();
}

module.exports = { encrypt, decrypt };