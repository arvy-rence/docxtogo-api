import {
  client,
  connect,
  disconnect
} from '../Utils/client.js'
import {generateDate} from "../Utils/date.js";

export class SectionService {
  async getSectionByGradeLevel() {
    await connect()

    const allSections = {
      grade11: [],
      grade12: []
    }

    const sections = await client.Section.findMany({
      select: {
        id: true,
        section_name: true,
        grade_level: true,
        adviser_name: true,
        room_assignment: true,
        strand: {
          select: {
            strand_name: true
          }
        }
      },
      orderBy: {
        section_name: 'asc'
      }
    })

    sections.forEach(section => {
      const sectionObj = {
        id: section.id,
        section: section.section_name,
        adviser: section.adviser_name,
        roomAssignment: section.room_assignment,
        strand: section.strand.strand_name
      }

      if (section.grade_level === 11) {
        allSections.grade11.push(sectionObj)
      } else {
        allSections.grade12.push(sectionObj)
      }
    })

    await disconnect()

    return allSections
  }

  async createSection(sectionName, gradeLevel, adviserName, roomAssignment, strandId) {
    await connect()

    const section = await client.Section.create({
      data: {
        section_name: sectionName,
        grade_level: gradeLevel,
        adviser_name: adviserName,
        room_assignment: roomAssignment,
        strand_id: strandId
      }
    })

    await disconnect()

    return section
  }
}