const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { config } = require('dotenv/types');

// API test
router.route('/test').get((req, res) => {
    res.send('JoSign API works perfectly ......');
});

// register
router.route('/register').post(async (req, res) => {
    
    const { name, email, phone, password } = req.body;
    // validation
    if(!name || !email || !phone || !password){
        res.status(400).json({message: "Completez les champs vides"});
    }

    await User.findOne({email})
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
                                    config.get('jgoasbhruiaeblrlaain'),
                                    {expiresIn: 3600},
                                    (err, token) => { // return token
                                        if(err) throw err;
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

router.route('/auth').post(async (req, res) => {

    const { email, password} = req.body;

    if(!email || !password){
        res.status(400).json(`L'email ou le password ne doivent pas etre vide`);
    }

    User.findOne({email})
        .then(mail => {
            if(!mail){
                res.status(400).json(`Aucun utilisateur n' est connu sous cet email : ${mail}`);
            }else{
                bcrypt.compare(password, mail.password)
                    .then(success => {
                        if(!success) res.status(400).json(`Votre mot de passe est incorrect`);
                        jwt.sign(
                            {id: mail.id},
                            config.get('jgoasbhruiaeblrlaain'),
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token
                                })
                            }
                        )
                    })
                    .catch(err => res.status(400).json({message: err}));
            }
        })
        .catch(err => res.status(400).json({message: err}));
});

module.exports = router;