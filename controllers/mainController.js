const pool = require("../db"); //brings in pool config from db.js
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");

module.exports = {
  //get all instructors
  getAllInstructors: async (req, res) => {
    try {
      const getAllInstructors = await pool.query("SELECT * FROM instructor");

      res.status(200).json({
        status: "Success",
        number_of_instructors: getAllInstructors.length,
        instructors: getAllInstructors,
      });
    } catch (err) {
      console.error(err);
    }
  },
  // update instructor
  updateInstructor: async (req, res) => {
    let id = req.params.id;
    const { instructorName, instructorClass } = req.body;

    try {
      pool.query(
        "UPDATE instructor SET instructor_name = ?, instructor_class = ? WHERE instructor_id = ?",
        [instructorName, instructorClass, id]
      );
      res.status(200).json({
        status: "Success",
        student: { instructorName, instructorClass },
      });
    } catch (err) {
      console.error(err);
    }
  },
  //get one instructor for instructor ui
  getAInstructor: async (req, res) => {
    let id = req.params.id;
    try {
      const aInstructor = await pool.query(
        "SELECT * FROM instructor WHERE id = ?",
        [id]
      );

      res.status(200).json({
        status: "Success",
        instructor: aInstructor[0],
      });
    } catch (err) {
      console.error(err);
    }
  },
  //delete a instructor
  deleteInstructor: async (req, res) => {
    let id = req.params.id;
    try {
      // begin delete emails linked to instructor section
      const userinfo = await pool.query(
        "SELECT * FROM instructor Where instructor_id = ?",
        [id]
      );
      let infoEmail = userinfo[0].instructor_email;
      let emailsToBeDeleted = await pool.query(
        "SELECT * FROM instructor_email_table Where reciever_email = ?",
        [infoEmail]
      );
      let arrOfEmails = emailsToBeDeleted.map((email) => {
        if (email.id) {
          return { ref: email.attachment_ref, id: email.id };
        }
      });
      // End delete emails linked to instructor section
      const deletedInstructor = await pool.query(
        "DELETE FROM instructor WHERE instructor_id = ?",
        [id]
      );
      res.status(200).json({
        arrOfEmails,
        status: "Delete success",
      });
    } catch (err) {
      console.error(err);
    }
  },
  //login
  login: async (req, res) => {
    try {
      const { doc, password } = req.body;
      //   Check database for the user based on email
      const user = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id WHERE ref_number = ?",
        [doc]
      );
      let reportCards = await pool.query(
        "SELECT * FROM Reportcard WHERE student_id = ?",
        [user[0].id]
      );

      if (user.length < 1) {
        return res.status(401).json({ msg: "Password or DOC is incorrect" });
      }

      const userPassword = user[0].Password;

      if (userPassword != password) {
        res
          .status(401)
          .json({ msg: "Your credentials do not match our records" });
      }

      //   Finish the login adding a token and send data back...
      const token = jwtGenerator(user[0].id);

      res.json({
        token,
        msg: "You have logged in",
        success: true,
        user,
        reportCards,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    }
  },
  //get user for student ui
  getUser: async (req, res) => {
    let token = req.headers.authorization;
    let decodedUser = jwt.verify(token, process.env.jwtSecret);
    const id = decodedUser.user;

    try {
      const user = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id WHERE id = ?",
        [id]
      );
      let reportCards = await pool.query(
        "SELECT * FROM Reportcard WHERE student_id = ?",
        [id]
      );

      res.json({
        token,
        msg: "You have pulled this user",
        success: true,
        user,
        reportCards,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ msg: "Server Error" });
    }
  },
  //get all students
  getStudents: async (req, res) => {
    try {
      const studentRatingData = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id "
      );

      res.status(200).json({
        status: "Success",
        number_of_students: studentRatingData.length,
        students: studentRatingData,
      });
    } catch (err) {
      console.error(err);
    }
  },
  // Get all instructors names and  email addresses
  getInstructors: async (req, res) => {
    try {
      const instructors = await pool.query(
        "SELECT DISTINCT instructor_name, instructor_email FROM instructor"
      );
      res.status(200).json({
        instructors,
      });
    } catch (err) {
      console.error(err);
    }
  },
  //create a student
  createStudent: async (req, res) => {
    const { FirstName, LastName, RefNumber } = req.body;
    const email = FirstName + LastName + RefNumber + "@perseverenow.org";
    try {
      const newStudent = await pool.query(
        "INSERT INTO Student (first_name, last_name, ref_number, student_email, Password) values (?, ?, ?, ?, ?) returning *",
        [FirstName, LastName, RefNumber, email, RefNumber]
      );
      let updatedStudentsList = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id"
      );
      res.status(201).json({
        status: "Success",
        student: newStudent[0],
        students: updatedStudentsList,
      });
    } catch (err) {
      console.error(err);
    }
  },
  // update student
  updateStudent: async (req, res) => {
    let id = req.params.id;
    const {
      FirstName,
      LastName,
      RefNumber,
      IsActive,
      Grade,
      bunkSpace,
      coThree,
    } = req.body;

    try {
      pool.query(
        "UPDATE student SET  first_name = ?, last_name = ?, ref_number = ?, Password = ?, is_active = ?, grade = ?, bunk_space = ?, co_three = ? WHERE id = ?",
        [
          FirstName,
          LastName,
          RefNumber,
          RefNumber,
          IsActive,
          Grade,
          bunkSpace,
          coThree,
          id,
        ]
      );
      res.status(200).json({
        status: "Success",
        student: {
          FirstName,
          LastName,
          RefNumber,
          IsActive,
          Grade,
          bunkSpace,
          coThree,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },
  //delete a student
  deleteStudent: async (req, res) => {
    let id = req.params.id;
    try {
      // begin delete emails linked to student section
      const userinfo = await pool.query("SELECT * FROM Student Where id = ?", [
        id,
      ]);
      let infoEmail = userinfo[0].student_email;
      let emailsToBeDeleted = await pool.query(
        "SELECT * FROM student_email_table Where reciever_email = ?",
        [infoEmail]
      );
      let arrOfEmails = emailsToBeDeleted.map((email) => {
        if (email.id) {
          return { ref: email.attachment_ref, id: email.id };
        }
      });
      // End delete emails linked to student section
      const deletedStudent = await pool.query(
        "DELETE FROM Student WHERE id = ?",
        [id]
      );
      res.status(200).json({
        arrOfEmails,
        status: "Delete success",
      });
    } catch (err) {
      console.error(err);
    }
  },
  //get one student for instructor ui
  getAStudent: async (req, res) => {
    let id = req.params.id;
    try {
      const aStudent = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id WHERE id = ?",
        [id]
      );
      let reportCards = await pool.query(
        "SELECT * FROM Reportcard WHERE student_id = ?",
        [id]
      );

      res.status(200).json({
        status: "Success",
        student: aStudent[0],
        reportCards: reportCards,
      });
    } catch (err) {
      console.error(err);
    }
  },
  //add report card
  addReportCard: async (req, res) => {
    const {
      StudentId,
      InstructorName,
      Report,
      Rating,
      pointsPossible,
    } = req.body;
    const grade = (Rating / pointsPossible) * 10;

    try {
      const newReportCard = await pool.query(
        "INSERT INTO reportcard (student_id, instructor_name, report, Rating, points_possible, grade) value (?, ?, ?, ?, ?, ?)",
        [StudentId, InstructorName, Report, Rating, pointsPossible, grade]
      );
      let reportCards = await pool.query(
        "SELECT * FROM reportcard WHERE student_id = ?",
        [StudentId]
      );
      const aStudent = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id WHERE id = ?",
        [StudentId]
      );

      res.status(200).json({
        status: "Success",
        student: aStudent[0],
        reportCard: {
          StudentId,
          InstructorName,
          Report,
          Rating,
          pointsPossible,
        },
        reportCards,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  // delete report card
  deleteReportCard: async (req, res) => {
    const { id, studentId } = req.body;

    try {
      pool.query("DELETE FROM ReportCard WHERE id = ?", [id]);
      const aStudent = await pool.query(
        "SELECT * FROM student AS S LEFT JOIN (SELECT student_id, ROUND(AVG(grade),1) AS Score, count(grade) As ScoreCount FROM reportcard GROUP BY student_id) AS R ON S.Id = R.student_id WHERE id = ?",
        [studentId]
      );
      let reportCards = await pool.query(
        "SELECT * FROM Reportcard WHERE student_id = ?",
        [studentId]
      );
      res.status(200).json({
        status: "Success",
        student: aStudent[0],
        reportCards,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  // create agenda
  createAgenda: async (req, res) => {
    let arrOfObj = req.body.agenda;
    try {
      const deleteOldDuplicates = await pool.query(
        "DELETE FROM daily_agenda WHERE date = ?",
        [req.body.date]
      );
      const insertNewAgenda = await arrOfObj.map(async (obj) => {
        return await pool.query(
          "INSERT INTO daily_agenda (time, agenda, date) value(?, ?, ?)",
          [obj.time, obj.task, req.body.date]
        );
      });

      const agendaNumber = await pool.query(
        "SELECT number FROM daily_agenda WHERE date = ? ",
        [req.body.date]
      );
      const allAgenda = await pool.query("SELECT * FROM daily_agenda");

      //  removes agendas older than 30 "working days"
      allAgenda.map(async (n) => {
        try {
          if (n.number < agendaNumber.reverse()[0].number - 300) {
            const removeOldAgenda = await pool.query(
              "DELETE FROM daily_agenda WHERE number = ?",
              [n.number]
            );
          }
        } catch (err) {
          console.error(err.message);
        }
      });

      res.status(200).json({
        success: "Saved to database",
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  // get agenda by date
  getAgenda: async (req, res) => {
    try {
      const getAgenda = await pool.query(
        "SELECT * FROM daily_agenda  WHERE date = ?",
        [req.params.id]
      );
      res.status(200).json({
        success: "Heres the daily agenda from database",
        agenda: getAgenda,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  // create todolist
  createToDoList: async (req, res) => {
    try {
      const submitToDoListItem = await pool.query(
        "INSERT INTO todolist (task, time, date, student_id) value(?, ?, ?, ?)",
        [req.body.task, req.body.time, req.body.date, req.body.student]
      );
      const allAgenda = await pool.query("SELECT * FROM todolist");
      const numberedToDoListItems = await pool.query(
        "SELECT number FROM todolist"
      );
      //  removes agendas older than 20 "working days"
      allAgenda.map(async (n) => {
        try {
          if (n.number < numberedToDoListItems.reverse()[0].number - 200) {
            const removeOldtodoitem = await pool.query(
              "DELETE FROM todolist WHERE number = ?",
              [n.number]
            );
          }
        } catch (err) {
          console.error(err.message);
        }
      });
      const todolistforselecteddate = await pool.query(
        "SELECT * FROM todolist WHERE date = ?",
        [req.body.date]
      );
      res.status(200).json({
        success: "Saved to database",
        todolist: todolistforselecteddate,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  //  get todolist
  getToDoList: async (req, res) => {
    try {
      const getlist = await pool.query(
        "SELECT * FROM todolist  WHERE date = ?",
        [req.params.id]
      );
      res.status(200).json({
        success: "Heres the to do list from database",
        todolist: getlist,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  // to do list item done
  toDoListItemDone: async (req, res) => {
    try {
      let boolean = req.body.is_done === 1 ? 0 : 1;
      const itemIsDone = await pool.query(
        "UPDATE todolist SET is_done = ? WHERE id = ?",
        [boolean, req.params.id]
      );
      const list = await pool.query("SELECT * FROM todolist WHERE date = ?", [
        req.body.date,
      ]);
      res.status(200).json({
        success: "changed",
        todolist: list,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
};
