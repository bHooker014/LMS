// set up to only use dotenv contents in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const methodOverride = require("method-override");



const PORT = 8000;

// ---------Middleware---------
app.use(express.json());
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
// Set the route for all api calls
  
app.use('/api/attachment', require('./routes/api/attachment'))
app.use('/api/videos', require('./routes/api/videos'))
app.listen(PORT, () => console.log(`Server started on port ${PORT} fool`));

