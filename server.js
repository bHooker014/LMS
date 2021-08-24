const express = require('express');
const app = express();
const cors = require('cors');

//middleware

app.use(express.json());//built in express middleware, body parser. ablility to req.body
app.use(express.urlencoded({extended:false}));
app.use(cors());
 
//Routes

//register and login routes
app.use('/authInstructor', require('./routes/jwtAuth'));

//dashboard route
app.use('/dashboard', require('./routes/dashboard'));
 
//main route
app.use('/api/main', require('./routes/main'));

// Email route
app.use('/api/email', require('./routes/email'))
// videos route
app.use('/api/videos', require('./routes/videos'))
const port = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`server is running on ${port}`)
});


