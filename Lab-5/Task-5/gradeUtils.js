export function calculateGrade(marks) {
  if (!Number.isFinite(marks) || marks < 0 || marks > 100) throw new RangeError('Marks must be between 0 and 100');
  if (marks >= 85) return 'A';
  if (marks >= 80) return 'A-';
  if (marks >= 75) return 'B+';
  if (marks >= 70) return 'B';
  if (marks >= 65) return 'B-';
  if (marks >= 60) return 'C+';
  if (marks >= 50) return 'C';
  return 'F';
}

export function calculateAverage(values) {
  if (!Array.isArray(values) || values.length === 0) throw new TypeError('values must be a non-empty array');
  if (!values.every(value => Number.isFinite(value) && value >= 0 && value <= 100)) throw new RangeError('All marks must be between 0 and 100');
  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2));
}

export function calculateGPA(marksArray) {
  if (!Array.isArray(marksArray) || marksArray.length === 0) throw new TypeError('marksArray must be a non-empty array');
  const points = marksArray.map(marks => {
    calculateGrade(marks);
    if (marks >= 85) return 4.0;
    if (marks >= 80) return 3.7;
    if (marks >= 75) return 3.3;
    if (marks >= 70) return 3.0;
    if (marks >= 65) return 2.7;
    if (marks >= 60) return 2.3;
    if (marks >= 50) return 2.0;
    return 0;
  });
  return Number((points.reduce((sum, point) => sum + point, 0) / points.length).toFixed(2));
}
