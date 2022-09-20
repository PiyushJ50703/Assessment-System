const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Routes
router.get('/', questionController.view);
// router.post('/', userController.find);
// router.get('/adduser', userController.form);
router.post('/', questionController.addResponse);
router.get('/addQuestion', questionController.addForm);
router.post('/addQuestion', questionController.addQuestion);
router.get('/editQuestion', questionController.editForm);
router.post('/editQuestion', questionController.editQuestion);
router.get('/showScore', questionController.score);
router.get('/removeResponses',questionController.removeResponses);
router.get('/removeQuestion', questionController.removeForm);
router.post('/removeQuestion', questionController.removeQuestion);
  
module.exports = router;






