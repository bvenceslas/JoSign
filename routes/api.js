const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// API test
router.route('/test').get((req, res) => {
    res.send('JoSign API works perfectly ......');
});

// register
router.route('/register').get(async (req, res) => {
    
    const { name, email, phone, password } = req.body;
    // validation
    if(!name || !email || !phone || !password){
        res.status(400).json({message: "Completez les champs vides"});
    }

    User.findOne({email})
        .then(mail => {
            if(mail){
                res.json({message: "User already exists"});
            }
            else{
                const newUser = new User({name, email, phone,password});

                // chiffrer le password
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash; // hash contain the hashed password

                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    {id: user.id},
                                    config.get('Venceslas-joshua'),
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        res.json({
                                            token,
                                            user:{
                                                name: user.name,
                                                email: user.email
                                            }
                                        });
                                    }
                                )
                            })
                            .catch(err => res.json(err));
                    });
                });
            }
        })
        .catch(err => res.json(err));
});

module.exports = router;