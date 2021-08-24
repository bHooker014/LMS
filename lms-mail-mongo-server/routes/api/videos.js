const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const URI = "mongodb://localhost/lms-video-710";

// Create mongo connection
const conn = mongoose.createConnection(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Init gfs
let gfs;

conn.once("open", () => {
  // Init Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("videos");
});

// Create storage engine
const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          aliases: file.originalname,
          bucketName: "videos",
          title: file.title,
          desription: file.description,
        };

        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// @rout    POST api/video/upload
// @desc    Uploads file to db
router.post("/upload", upload.single("file"), (req, res) => {
  try {

    gfs.files.find().toArray((err, files) => {
      // Check if file
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }
      res.status(200).json({
        files,
        filename: req.file.filename,
        name: req.file.originalname
        
      });
 
    });
  
  } catch (err) {
    console.log(err);
  }
});


// @route   GET api/video/download/:filename
// @desc    Display single file object
router.get("/download/:filename", (req, res) => {
  try {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      res.set({
        "Accept-Ranges": "bytes",
        "Content-Disposition": `attachment; filename=${file.aliases}`,
        "Content-Type": file.contentType,
      });
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }
      //   Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  } catch (err) {
    console.log(err);
  }
});

// @route   DELETE api/delete/:id
// @desc    Delete A Item
router.delete("/delete/:filename", async (req, res) => {
  try {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (file) {
        // (node:14760) DeprecationWarning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
        gfs.remove({ _id: file._id, root: "videos" }, (err, res) => {});
        res.status(200).json({
          success: "file has been removed"
        })
      }
    });

  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
