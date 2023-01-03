import express from "express";
import {
  getAllRequests,
  getCountByStatus,
  getRequestsByLRN,
  getRequestsForDashboard,
  updateRequestStatus
} from "./requests.controller.js";

const router = express.Router();

/**
 * ROOT URL: /api/request
 */

/**
 * router.get('/') - all requests
 * router.get('/:lrn') - all requests of a student
 * router.patch('/:id') - update request status
 * router.post('/create') - create a request
 */

router.get('/', getAllRequests)
router.get('/count', getCountByStatus)
router.get('/dashboard', getRequestsForDashboard)
router.get('/:lrn', getRequestsByLRN)
router.patch('/:id', updateRequestStatus)

export {router as requestRoutes}