const express = require('express')

const router = express.Router()
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} = require('../controllers/jobs')

const demoUser = require('../middleware/testUser')

router.route('/').post(demoUser,createJob).get(getAllJobs)
router.route('/stats').get(showStats)

router.route('/:id').get(demoUser,getJob).delete(demoUser,deleteJob).patch(demoUser,updateJob)

module.exports = router
