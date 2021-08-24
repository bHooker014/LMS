const pool = require('../db');

module.exports = {
    // Get all emails for the current instructor
    getEmails: async (req, res) => {
        // userEmail value passed in the params for the current instructor
        let instructorEmail = req.params.email
        try {
            const allEmails = await pool.query("SELECT * FROM instructor_email_table WHERE reciever_email = ?", [instructorEmail])

            res.status(200).json({
                status: 'Success',
                emails: allEmails
            })
        } catch (err) {console.log(err)}
    },
    sendEmailWithAtt: async (req, res) => {
        const { senderEmail, recieverEmail, subject, body } = req.body.message
        const { filename, contentType } = req.body.attachment
        try {
            const newEmail = await pool.query("INSERT INTO student_email_table (sender_email, reciever_email, email_subject, body, attachment_ref, content_type) values (?, ?, ?, ?, ?, ?)", [senderEmail, recieverEmail, subject, body, filename, contentType])
        res.status(200).json({
            status: 'Success'
        })
        } catch (err) {console.error(err)}
        
    },
    sendEmail: async (req, res) => {
        const { senderEmail, recieverEmail, subject, body } = req.body.message
        try {
            const newEmail = await pool.query("INSERT INTO student_email_table (sender_email, reciever_email, email_subject, body) values (?, ?, ?, ?)", [senderEmail, recieverEmail, subject, body])
        res.status(200).json({
            status: 'Success'
        })
        } catch (err) {console.error(err)}
        
    },
    deleteEmail: async (req, res) => {
        let id = req.params.id 
        try {
            const deleteEmail = await pool.query("DELETE FROM student_email_table WHERE id = ?", [id])
            res.status(200).json({
                status: "Delete Email Success"
            })
        } catch (err) {console.error(err)}
    },
    deleteInstructorEmail: async (req, res) => {
       
        let id = req.params.id 
        try {
            const deleteEmail = await pool.query("DELETE FROM instructor_email_table WHERE id = ?", [id])
            res.status(200).json({
                status: "Delete Email Success"
            })
        } catch (err) {console.error(err)}
    },
	adminDeleteInstructorEmail: async (req, res) => {
       
        let id = req.params.id
        try {
            const deleteEmail = await pool.query("DELETE FROM instructor_email_table WHERE id = ?", [id])
            res.status(200).json({
                status: "Delete Email Success"
            })
        } catch (err) {console.error(err)}
    }  
}