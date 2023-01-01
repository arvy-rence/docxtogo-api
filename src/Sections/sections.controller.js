import {SectionService} from "./sections.service.js";

const sectionService = new SectionService();

export const getAllSections = async (req, res) => {
  const sections = await sectionService.getSectionByGradeLevel()

  res.status(200).json({
    sections
  })
}

export const createSection = async (req, res) => {
  const {
    sectionName,
    gradeLevel,
    adviserName,
    roomAssignment,
    strandId
  } = req.body

  const section = await sectionService.createSection(sectionName, gradeLevel, adviserName, roomAssignment, strandId)

  res.status(201).json({
    section
  })
}