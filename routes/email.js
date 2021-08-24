const router = require("express").Router();
const emailController = require("../controllers/emailController");
const studentEmailController = require("../controllers/studentEmailController")

// *************************************************************************
// ***********************   INSTRUCTOR to STUDENT  ************************
// *************************************************************************

// @route   'api/email/deleteEmail/:id'
// @desc    Uses the email id to delete the current instructors
//          email from the student_email_table
router.route("/adminDeleteInstructorEmail/:id").delete(emailController.adminDeleteInstructorEmail);

// @route   'api/email/:email'
// @desc    Gets all emails linked to the current instructor /:email key
router.route("/:email").get(emailController.getEmails);

// @route   'api/email/sendEmailWithAtt/'
// @desc    Posts from the student to the instructor
//          via instructor_email_table
router.route("/sendEmailAtt").post(emailController.sendEmailWithAtt);

// @route   'api/email/sendEmail/'
// @desc    Posts from the student to the instructor 
//          via instructor_email_table
router.route("/sendEmail").post(emailController.sendEmail);

// @route   'api/email/deleteEmail/:id'
// @desc    Uses the email id to delete the current instructors
//          email from the instructor_email_table
router.route("/deleteInstructorEmail/:id").delete(emailController.deleteInstructorEmail);

// *************************************************************************
// ***********************   STUDENT to INSTRUTOR  ************************
// *************************************************************************

// @route   'api/email/student/:email'
// @desc    Gets all emails linked to the user /:email key
router.route("/student/:email").get(studentEmailController.getEmails);

// @route   'api/email/student/sendEmailAtt/'
// @desc    Posts from the instructor to the student with an 
//          attachment to the student_email_table
router.route("/student/sendEmailAtt").post(studentEmailController.sendEmailWithAtt);

// @route   'api/email/student/sendEmail/'
// @desc    Posts from the instructor to the student with out 
//          an attachment to the studnet_email_table
router.route("/student/sendEmail").post(studentEmailController.sendEmail);

// @route   'api/email/student/deleteEmail/:id'
// @desc    Uses the email id to delete the current students
//          email from the student_email_table
router.route("/student/deleteEmail/:id").delete(emailController.deleteEmail);

module.exports = router;