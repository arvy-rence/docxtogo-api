import express from "express";
import {createSection, getAllSections} from "./sections.controller.js";

const router = express.Router();

/**
 * ROOT URL: /api/section
 */

/**
 * router.get('/') - all sections
 * router.get('/:name') - section by name
 * router.post('/create') - create a section
 */

router.get('/', getAllSections)
router.post('/create', createSection)

export {router as sectionRoutes}