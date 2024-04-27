// import necessary modules
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')
const express = require('express');
const jwt = require('jsonwebtoken');
const { usersDB } = require('./db');
const secret = process.env.JWT_SECRET || 'default_secret';

const router = express.Router();

// register new user
router.post('/register', async (req, res) => {
    try {

        // open request body
        const { firstName, lastName, email, password } = await req.body;

        // error condition: user already exists
        const user = await findUserByEmail(email)
        if(user) {
            return res.status(409).send('Error: User already exists')
        }

        // error condition: required fields missing
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send('Error: Missing required fields');
        }

        // hashing the password
        const saltingRounds = 10
        const hash = await bcrypt.hashSync(password, saltingRounds);

        // make an object for new user
        const newUser = {
            uid: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            roles: ['user'],
            isActive: true,
        };

        // insert into in-memory db
        usersDB.insert(newUser, (err, newDoc) => {

            // tokenize it
            if (newDoc) {
            const token = jwt.sign(
                {
                uid: newUser.uid,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                roles: newUser.roles,
                isActive: newUser.isActive,
                },
                secret,
                { expiresIn: '1h' }
            );
            return res.status(200).json({ token })
            }
        })
    } catch (error) {
    console.log(error);
    res.status(500).send('Error: Internal Server Error');
    }
});

// login existing user
router.post('/login', async (req, res) => {
    try {
        // error condition: required fields missing
        const { email, password } = await req.body;
        if (!email || !password) {
            return res.status(400).send('Error: Missing required fields');
        }

        // error condition: user not registered
        const user = await findUserByEmail(email)
        if(!user) {
            return res.status(404).send('Error: User not found')
        }
        
        // error condition: user password incorrect
        const isPasswordValid = await bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Error: Incorrect Credentials')
        }
        // tokenize it
        const token = jwt.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: user.roles,
            isActive: user.isActive,
            },
            secret,
            { expiresIn: '1h' }
            );
        // validate it
        return res.status(200).json({ token })
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  });

// helper function to find user from user.db which uses promises
function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
        usersDB.findOne(
            {
                email,
            },
            (err, user) => {
                if (err) {
                    reject(err)
                }
                resolve(user)
            }
        )
    })
}

module.exports = router