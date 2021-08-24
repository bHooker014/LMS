const router = require('express').Router();
const pool = require('../db');
const mainController = require('../controllers/mainController');
const authorization = require('../middleware/authorization');

// matches with '/api/main/getAllInstructors'
router.route('/getAllInstructors')
.get(mainController.getAllInstructors)

//matches with '/api/main/getAInstructor:id'
router.route('/getAInstructor/getAInstructor:id')
.get(mainController.getAInstructor)

//matches with '/api/main/updateInstructor/:id'
router.route('/updateInstructor/:id')
.put(mainController.updateInstructor)

//matches with '/api/main/deleteInstructor/:id'
router.route('/deleteInstructor/:id')
.delete(mainController.deleteInstructor)

// matches with '/api/main'
router.route('/')
.get(mainController.getStudents)
.post(mainController.createStudent)

//matches with '/api/main/:id'
router.route('/:id')
.delete(mainController.deleteStudent)
.put(mainController.updateStudent)

//matches with '/api/main/:id'
router.route('/getStudent/:id')
.get(mainController.getAStudent)

//matches with '/api/main/reportcard'
router.route('/reportcard')
.post(mainController.addReportCard)

//matches with '/api/main/:id/deleteReportCard'
router.route('/deleteReportCard')
.post(mainController.deleteReportCard)

//matches with '/api/main/login'
router.route('/login').post(mainController.login)
router.route('/get-user').get(mainController.getUser)

// matches with '/api/main/instructors
router.route('/instructors').get(mainController.getInstructors)

//matches with '/api/main/createAgenda'
router.route('/getAgenda/:id').get(mainController.getAgenda)
router.route('/createAgenda').post(mainController.createAgenda)

// matches with '/api/main/createToDolist'
router.route('/createToDoList').post(mainController.createToDoList)
router.route('/getToDoList/:id').get(mainController.getToDoList)
router.route('/toDoListItemDone/:id').put(mainController.toDoListItemDone)

// matches with '/api/main/verify
router.get('/verifyStudent', authorization, async (req, res) => {
try {
   var id = req.user
      const user = await pool.query("SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id WHERE id = ?", [id]); 
      let reportCards = await pool.query("SELECT * FROM Reportcard WHERE student_id = ?", [id]);
      res.json({
         user,
         reportCards,
         success: true,  
      });
    } catch (err) {
       console.error(err.message);
       res.sendStatus(500).send('Server Error');
   };
});



module.exports = router;