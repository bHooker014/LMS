const router = require('express').Router();
const pool = require('../db');//brings in pool config from db.js
const bcrypt = require('bcryptjs');
require('dotenv').config(); 
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');//middleware to check if user info is good
const authorization = require('../middleware/authorization');


// route for registering new user
router.post('/register',
 validInfo, 
 async (req, res) => {
    try {
      
        //destructure the req.body
        let { name, emailRegister, passwordRegister, secretPassword } = req.body;
     
        if (secretPassword !== process.env.secretPassword) {
            return res.status(401).json('Secret password is incorrect')
        };

        // the  ? below is the variable for the second arguement~[email]
        let user = await pool.query('SELECT * FROM Instructor WHERE instructor_email = ?', [emailRegister]);
        // res.json(user);

        //verify if user already exist
        if (user.length !== 0){
            return res.status(401).json('User already exist')
        };
        //encrypting the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(passwordRegister, salt);
       
        //create new user and insert into table
        const newUser = await pool.query('INSERT INTO Instructor (instructor_name, instructor_email, instructor_password) VALUES(?, ?, ?) RETURNING *', [name, emailRegister, bcryptPassword]
        );
       
        //generate our jwt token
        const token = jwtGenerator(newUser[0].instructor_id);
   
         res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.sendStatus(500);
    };
});

//login route

router.post('/', validInfo, async (req, res) => {
    try {
    //destructure the req.body
     let { email, password } = req.body;

        //check if user dosen't exist
        const user = await pool.query('SELECT * FROM instructor WHERE instructor_email = ?', [email]);

        if (user.length === 0) {
            return res.status(401).json('Email is incorrect');
        };
        //check if input password is the whats in db
        const validPassword = await bcrypt.compare(password, user[0].instructor_password);

        if (!validPassword) {
            return res.status(401).json('Password, or Email is incorrect');
        }

       //generate our jwt token
       const token = jwtGenerator(user[0].instructor_id);
       res.json({ token });
       
    } catch (err) {
        console.error(err.message);
        res.sendStatus(500).send('Server Error');
    };
});

 router.get('/verify', authorization, async (req, res) => {
     try {
        res.json(true);
     } catch (err) {
        console.error(err.message);
        res.sendStatus(500).send('Server Error');
    };
 });

module.exports = router;