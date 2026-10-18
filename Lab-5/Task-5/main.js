import Student from './Student.js';
import { calculateAverage, calculateGPA, calculateGrade as gradeForMarks } from './gradeUtils.js';
import { processTranscriptJSON, transcriptToJSON } from './transcriptService.js';

const rawData = `
[
  {
    "id": 101,
    "name": "Ali",
    "courses": [
      { "code": "CS301", "marks": 81 },
      { "code": "CS302", "marks": 74 }
    ]
  },
  {
    "id": 102,
    "name": "Sara",
    "courses": [
      { "code": "CS301", "marks": 91 },
      { "code": "CS302", "marks": 88 }
    ]
  }
]
`;

try {
  const report = processTranscriptJSON(rawData);
  console.log('Report object:', report);
  console.log('Report JSON:', transcriptToJSON(report));
  console.log('Grade utility:', gradeForMarks(81));
  console.log('Average utility:', calculateAverage([81, 74]));
  console.log('GPA utility:', calculateGPA([81, 74]));
  console.log('Default import:', new Student(999, 'Test Student', [{ code: 'CS101', marks: 80 }]));
} catch (error) {
  console.error(`${error.name}: ${error.message}`);
} finally {
  console.log('Transcript processing finished.');
}

for (const invalidJSON of ['{invalid json}', '[{"name":"Missing ID","courses":[{"code":"CS101","marks":80}]}]', '[{"id":1,"name":"A","courses":[{"code":"CS101","marks":50}]},{"id":1,"name":"B","courses":[{"code":"CS102","marks":60}]}]', '[{"id":2,"name":"Bad Marks","courses":[{"code":"CS101","marks":101}]}]', '[{"id":3,"name":"No Code","courses":[{"marks":80}]}]']) {
  try {
    processTranscriptJSON(invalidJSON);
  } catch (error) {
    console.log('Expected validation error:', error.name, error.message);
  }
}
