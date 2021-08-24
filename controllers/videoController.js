const pool = require('../db');

module.exports = {
    upload: async (req, res) => {
        const { ref, name } = req.body.refInfo
        const { description, category } = req.body.videoInfo
        try {
            const newVideo = await pool.query("INSERT INTO videolib (description, category, ref, name) values (?, ?, ?, ?)",
            [description, category, ref, name]);
            const allVideos = await pool.query("SELECT * FROM videolib")
            res.status(200).json({
                status: 'Success',
                videos: allVideos
            })
        } catch (err) {console.log(err)}
    },
    // getting all videos
    videos: async (req, res) => {
        try {
            const allVideos = await pool.query("SELECT * FROM videolib")
            res.status(200).json({
                status: 'Success',
                videos: allVideos
            })
        } catch (err) {console.log(err)}
    },
    // delete video
    deleteVideo: async (req, res) => {
        try {
            const deleteVideo = await pool.query("DELETE FROM videolib WHERE ref = ?", [req.params.ref]);
            const videos = await pool.query("SELECT * FROM videolib")
            res.status(200).json({
                status: "delete Success, this is the new video list.",
                videos
            })
        }catch (err) {console.log(err.message)}
    },

}