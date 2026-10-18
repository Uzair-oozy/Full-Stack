'use strict';

const results = [
  { id: 1, name: 'Ali', department: 'CS', course: 'FSWD', marks: 82 },
  { id: 2, name: 'Sara', department: 'CS', course: 'FSWD', marks: 91 },
  { id: 3, name: 'Usman', department: 'SE', course: 'FSWD', marks: 47 },
  { id: 4, name: 'Hina', department: 'AI', course: 'FSWD', marks: 73 },
  { id: 5, name: 'Ahmed', department: 'SE', course: 'FSWD', marks: 64 },
  { id: 6, name: 'Zoya', department: 'AI', course: 'FSWD', marks: 91 }
];

function getGrade(marks) {
  if (!Number.isFinite(marks) || marks < 0 || marks > 100) return { grade: 'INVALID', gradePoints: null, status: 'INVALID' };
  if (marks >= 85) return { grade: 'A', gradePoints: 4.0, status: 'PASS' };
  if (marks >= 80) return { grade: 'A-', gradePoints: 3.7, status: 'PASS' };
  if (marks >= 75) return { grade: 'B+', gradePoints: 3.3, status: 'PASS' };
  if (marks >= 70) return { grade: 'B', gradePoints: 3.0, status: 'PASS' };
  if (marks >= 65) return { grade: 'B-', gradePoints: 2.7, status: 'PASS' };
  if (marks >= 60) return { grade: 'C+', gradePoints: 2.3, status: 'PASS' };
  if (marks >= 50) return { grade: 'C', gradePoints: 2.0, status: 'PASS' };
  return { grade: 'F', gradePoints: 0, status: 'FAIL' };
}

const processedResults = results.map(student => ({ ...student, ...getGrade(student.marks) }));
const rankedMeritList = [...processedResults].sort((a, b) => b.marks - a.marks || a.name.localeCompare(b.name));

const departmentStats = processedResults.reduce((stats, student) => {
  if (!stats[student.department]) {
    stats[student.department] = { students: 0, totalMarks: 0, average: 0, highest: null, passed: 0 };
  }
  const department = stats[student.department];
  department.students++;
  department.totalMarks += student.marks;
  department.highest = department.highest === null ? student.marks : Math.max(department.highest, student.marks);
  if (student.status === 'PASS') department.passed++;
  return stats;
}, {});

Object.values(departmentStats).forEach(department => {
  department.average = Number((department.totalMarks / department.students).toFixed(2));
  delete department.totalMarks;
});

const overallAverage = results.length ? results.reduce((sum, student) => sum + student.marks, 0) / results.length : 0;
const firstStudentAbove85 = processedResults.find(student => student.marks > 85) ?? null;
const firstFailedIndex = processedResults.findIndex(student => student.status === 'FAIL');
const atLeastOneFailed = processedResults.some(student => student.status === 'FAIL');
const everyMarkValid = processedResults.every(student => Number.isFinite(student.marks) && student.marks >= 0 && student.marks <= 100);
const aboveAverageStudents = processedResults.filter(student => student.marks > overallAverage);
const topThreeStudents = rankedMeritList.slice(0, 3);

console.log('Processed results:', JSON.stringify(processedResults, null, 2));
console.log('Ranked merit list:', JSON.stringify(rankedMeritList, null, 2));
console.log('Department statistics:', JSON.stringify(departmentStats, null, 2));
console.log('Academic queries:', JSON.stringify({ firstStudentAbove85, firstFailedIndex, atLeastOneFailed, everyMarkValid, overallAverage: Number(overallAverage.toFixed(2)), aboveAverageStudents, topThreeStudents }, null, 2));
console.log('Original array unchanged order:', results.map(student => student.name));
console.log('Invalid boundary test:', getGrade(101));
