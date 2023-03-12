import express from 'express'
const router=express.Router()

import {createJob,
    getAllJobs,
    updateJob,
    getStats,
    deleteJob} from '../controllers/jobsController.js'

router.route('/').post(createJob).get(getAllJobs)
//must be above /:id routes
router.route('/stats').get(getStats)
router.route('/:id').patch(updateJob).delete(deleteJob)

export default router
