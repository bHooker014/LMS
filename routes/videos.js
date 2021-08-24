const router = require("express").Router();
const videoController = require("../controllers/videoController");

// @route   'api/videos/upload'
// @desc    Posts new video information 
router.route("/upload").post(videoController.upload)

// @route   'api/videos/
// @desc    Gets all videos
router.route("/").get(videoController.videos)

// @route  'api/videos/deleteVideo'
//  @desc delete video
router.route("/deleteVideo/:ref").delete(videoController.deleteVideo)

module.exports = router