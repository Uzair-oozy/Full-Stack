import Student from './Student.js';
import { calculateAverage, calculateGPA, calculateGrade as gradeForMarks } from './gradeUtils.js';

export function processTranscriptJSON(rawData) {
  let parsed;
  try {
    parsed = JSON.parse(rawData);
  } catch (error) {
    throw new SyntaxError(`Malformed transcript JSON: ${error.message}`);
  }

  if (!Array.isArray(parsed)) throw new TypeError('Transcript JSON must contain an array of students');
  const ids = new Set();
  const students = parsed.map((record, index) => {
    if (!record || typeof record !== 'object' || Array.isArray(record)) throw new TypeError(`Student at index ${index} must be an object`);
    if (record.id === undefined || record.id === null || String(record.id).trim() === '') throw new TypeError(`Student at index ${index} is missing an ID`);
    const idKey = String(record.id);
    if (ids.has(idKey)) throw new Error(`Duplicate student ID: ${idKey}`);
    ids.add(idKey);
    if (typeof record.name !== 'string' || record.name.trim() === '') throw new TypeError(`Student ${idKey} is missing a name`);
    if (!Array.isArray(record.courses) || record.courses.length === 0) throw new TypeError(`Student ${idKey} must have at least one course`);

    const courses = record.courses.map((course, courseIndex) => {
      if (!course || typeof course !== 'object' || Array.isArray(course)) throw new TypeError(`Course ${courseIndex} for student ${idKey} must be an object`);
      if (typeof course.code !== 'string' || course.code.trim() === '') throw new TypeError(`Course ${courseIndex} for student ${idKey} is missing a course code`);
      if (!Number.isFinite(course.marks)) throw new TypeError(`Marks for ${course.code} must be a number`);
      if (course.marks < 0 || course.marks > 100) throw new RangeError(`Marks for ${course.code} must be between 0 and 100`);
      return { code: course.code, marks: course.marks, grade: gradeForMarks(course.marks) };
    });

    const marks = courses.map(course => course.marks);
    return {
      ...new Student(record.id, record.name.trim(), courses),
      average: calculateAverage(marks),
      gpa: calculateGPA(marks)
    };
  });

  return { generatedAt: new Date().toISOString(), studentCount: students.length, students };
}

export function transcriptToJSON(report) {
  return JSON.stringify(report, null, 2);
}
