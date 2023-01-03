import express from "express";
import {getStudentByLRN, getStudentsBySection} from "./students.controller.js";

const router = express.Router();

/**
 * ROOT URL: /api/student
 */

/**
 * router.get('/') - all students
 * router.get('/:lrn') - student by lrn
 * router.put('/:lrn') - update student
 * router.get('/get/:id') - all students in a section
 * router.post('/create') - create a student
 *
 */

router.get('/:lrn', getStudentByLRN);
router.get('/get/:sectionId', getStudentsBySection)

export {router as studentRoutes};