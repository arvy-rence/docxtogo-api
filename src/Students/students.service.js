import {
  client,
  connect,
  disconnect
} from "../Utils/client.js";

export class StudentService {
  async getStudentsBySection(sectionId) {
    await connect()

    const allStudents = []

    const students = await client.Student.findMany({
      where: {
        section_id: {
          equals: sectionId
        }
      },
      select: {
        lrn: true,
        full_name: true,
        gender: true,
        strand: {
          select: {
            strand_name: true
          }
        },
        status: true
      }
    })

    students.forEach(student => {
      const studentObj = {
        lrn: student.lrn,
        name: student.full_name,
        gender: student.gender,
        strand: student.strand.strand_name,
        status: student.status
      }

      allStudents.push(studentObj)
    })

    await disconnect()

    return allStudents
  }

  async getStudentByLRN(lrn) {
    await connect()

    const student = await client.Student.findUnique({
      where: {
        lrn: lrn
      },
      select: {
        lrn: true,
        full_name: true,
        gender: true,
        strand: {
          select: {
            strand_name: true
          }
        },
        status: true,
        section: {
          select: {
            section_name: true
          }
        },
        birthday: true
      }
    })

    const studentObj = {
      lrn: student.lrn,
      name: student.full_name,
      gender: student.gender,
      strand: student.strand.strand_name,
      status: student.status,
      section: student.section.section_name,
      birthday: student.birthday
    }

    await disconnect()

    return studentObj
  }
}