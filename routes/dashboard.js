const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.post('/',
 authorization, 
 
 async (req, res) => {
    try {
        const user = await pool.query('SELECT * FROM Instructor WHERE instructor_id = ?', [req.user]);
        res.json(user)
       
    } catch (err) {
        console.error(err.message)
        res.status(500).json('Server Error')
    };
})



module.exports = router;