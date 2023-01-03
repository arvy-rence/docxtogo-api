import {StudentService} from "./students.service.js";

const studentService = new StudentService();

export const getStudentsBySection = async (req, res) => {
  const sectionId = parseInt(req.params.sectionId);

  const students = await studentService.getStudentsBySection(sectionId);

  res.status(200).json(students);
}

export const getStudentByLRN = async (req, res) => {
  const lrn = req.params.lrn;

  const student = await studentService.getStudentByLRN(lrn);

  res.status(200).json(student);
}