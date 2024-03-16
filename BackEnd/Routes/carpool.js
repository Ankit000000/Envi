const express = require('express');
const carpoolcollection = require('../Models/carpoolModel')
const {get_all_carpool_Info_without_auth, get_all_carpool_Info, get_a_single_carpool_Info, create_a_new_carpool_Post, delete_a_carpool_Post, update_a_carpool_Post} = require('../Controllers/carpoolController')
const requireAuth = require('../Middleware/reaquireAuth');

const router = express.Router();

// Get all workouts without any authentication 
router.get('/all_carpoolpool', get_all_carpool_Info_without_auth)

// reauire auth for all carpooling routes
router.use(requireAuth);

// Get all workouts with authentication 
router.get('/', get_all_carpool_Info)

// Get a single workout
router.get('/:id', get_a_single_carpool_Info)

// POST a new workout
router.post('/', create_a_new_carpool_Post)

// DELETE a workout
router.delete('/:id', delete_a_carpool_Post);

// UPDATE a workout
router.patch('/:id', update_a_carpool_Post);


module.exports = router;