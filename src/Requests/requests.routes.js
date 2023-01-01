import express from "express";
import {getAllRequests, getCountByStatus} from "./requests.controller.js";

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

export {router as requestRoutes}