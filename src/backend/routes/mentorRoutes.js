const epxress = require('express'); 
const router = epxress.Router();
const { 
    getAllMentors, 
    getMentorById 
} = require('../controllers/mentorController');

router.get("/mentors", getAllMentors);
router.get("/mentors/:id", getMentorById);

module.exports = router;