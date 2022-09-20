const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Questions
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM t_question WHERE is_deleted = "n"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      res.render('home', { rows});
    } else {
      console.log(err);
    }
    console.log('The data from question table: \n', rows);
  });
}

// // Add new response
exports.addResponse = (req, res) => {
  const { question_id, correct_answer, response } = req.body;
  var ans = 0;
  if(correct_answer===response){
    ans = 1;
  }

  // User the connection
  connection.query('INSERT INTO t_response SET question_id = ?, correct_answer = ?, response = ?, score = ?', [question_id, correct_answer, response, ans], (err, rows) => {
    if (!err) {
      res.render('home', { alert: 'response added successfully.' });
    } else {
      console.log(err);
      alert("Duplicate Entry");
    }
    console.log('The data from response table: \n', rows);
  });
}

exports.addForm = (req, res) => {
  res.render('new-question');
}

// // Add new question
exports.addQuestion = (req, res) => {
  const { question, option1, option2, option3, option4, correct_answer} = req.body;
  // User the connection
  connection.query('INSERT INTO t_question SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correct_answer = ?, is_deleted = "n"', [question, option1, option2, option3, option4, correct_answer], (err, rows) => {
    if (!err) {
      res.render('new-question', { alert: 'response added successfully.' });
    } else {
      console.log(err);
      alert("Duplicate Entry");
    }
    console.log('The data from question table: \n', rows);
  });
}

exports.editForm = (req, res) => {
  res.render('edit-question');
}

// // Edit question
exports.editQuestion = (req, res) => {
  const { question_id, question, option1, option2, option3, option4, correct_answer} = req.body;
  // User the connection
  connection.query('UPDATE t_question SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correct_answer = ?, is_deleted = "n" WHERE question_id = ?', [question, option1, option2, option3, option4, correct_answer, question_id], (err, rows) => {
    if (!err) {
      res.render('edit-question', { alert: 'response edited successfully.' });
    } else {
      console.log(err);
      alert("Duplicate Entry");
    }
    console.log('The data from question table: \n', rows);
  });
}


//view score card
exports.score = (req, res) => {
  // User the connection
  connection.query('SELECT marks_obtained, total_marks FROM v_score', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      res.render('score', { rows});
    } else {
      console.log(err);
    }
    console.log('The data from score table: \n', rows);
  });
}

// Remove all the entered responses
exports.removeResponses = (req, res) => {
  // User the connection
  connection.query('TRUNCATE t_response', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      res.render('home', { alert: 'Responses refreshed'});
    } else {
      console.log(err);
    }
    console.log('The data from score table: \n', rows);
  });
}

exports.removeForm = (req, res) => {
  res.render('remove-question');
}

exports.removeQuestion = (req, res) => {
  const { question_id } = req.body;
  // User the connection
  connection.query('UPDATE t_question SET is_deleted = "y" WHERE question_id = ?', [question_id], (err, rows) => {
    if (!err) {
      res.render('remove-question', { alert: 'Question removed successfully.' });
    } else {
      console.log(err);
      alert("Duplicate Entry");
    }
    console.log('The data from question table: \n', rows);
  });
}
// // Delete User
// exports.delete = (req, res) => {

//   // Delete a record

//   // User the connection
//   // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

//   //   if(!err) {
//   //     res.redirect('/');
//   //   } else {
//   //     console.log(err);
//   //   }
//   //   console.log('The data from user table: \n', rows);

//   // });

//   // Hide a record

//   connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
//     if (!err) {
//       let removedUser = encodeURIComponent('User successeflly removed.');
//       res.redirect('/?removed=' + removedUser);
//     } else {
//       console.log(err);
//     }
//     console.log('The data from beer table are: \n', rows);
//   });

// }

// // View Users
// exports.viewall = (req, res) => {

//   // User the connection
//   connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
//     if (!err) {
//       res.render('view-user', { rows });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from user table: \n', rows);
//   });

// }