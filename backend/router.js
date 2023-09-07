const express = require('express');
const router = express.Router();
const db = require ('./dbConnection');
const { signupValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const testFolder = '../storage';
// const fs = require('fs');
const verifyjwt = require('./middleware/jwt_auth');
const controller = require('./controllers/file.controller');
require('dotenv').config();

router.post('/login', loginValidation, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE user = ${db.escape(req.body.user)};`,
        (err, result) => {
            console.log('received user: ' + req.body.user);
            console.log('received request:')
            console.log(req.body)
            //user doesn't exist
            if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
            }
            if (!result.length) {
                return res.status(401).send({
                    msg: 'Username or password is incorrect!'
                });
            }
            //check password
            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    //wrong password
                    if (bErr){
                        throw bErr;
                        return res.status(401).send({
                            msg: 'Email or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({id:result[0].id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN }); // TODO: replace the secret string and the expiration time with configurable variables
                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}';`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: 'Username or password is incorrect!'
                    });
                }
            );
        }
    );
});

router.post('/register', (req, res) => {
    console.error("================================================");
    console.log('/register hit...');
    console.log(JSON.stringify(req.body));
    console.log('req.body.user: ' + req.body.user)
    console.log('req.body.password: ' + req.body.password)

    const saltRounds = 12;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(hash) {
            db.query(
                `INSERT INTO users (user, password) VALUES ('${req.body.user}', '${hash}');`,
                (err,result) => {
                    if(err){
                        console.log(err);
                        throw err;
                    }
                }
            );
            return res.status(200).send({
                msg: 'User created!'
            })
        } else {
            console.error("Hash could not be created!");
            return res.status(400).send({
                msg: 'Malformed data received by backend'
            })
        }
    });

});

// router.post('/files', (req, res) => {
//     // TODO - add authentication
//     // TODO - return the list of files
//     fs.readdir(testFolder, (err, files) => {
//         files.forEach(file => {
//             console.log(file);
//         });
//     });
// });

// router.post('/files/:name', (req, res) => {
//     // TODO - add authentication
//     // TODO - return requested file
// });

router.post('/upload', controller.upload);
router.get('/files', controller.getListFiles);
router.get('/files/:name', controller.download);

router.post('/auth', verifyjwt)

module.exports = router;