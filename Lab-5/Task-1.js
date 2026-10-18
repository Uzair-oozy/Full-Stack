'use strict';

const applicants = [
  { id: 'A101', name: 'Sara Khan', age: '19', matricMarks: '91', intermediateMarks: '87', entryTest: '78', program: 'BSCS', feePaid: 'true' },
  { id: 'A102', name: 'Ahmed Ali', age: 'twenty', matricMarks: '88', intermediateMarks: '', entryTest: '72', program: 'BSSE', feePaid: 'false' },
  { id: 'A103', name: 'Hassan', age: '18', matricMarks: '76', intermediateMarks: '83', entryTest: '91', program: 'BSAI', feePaid: 'true' },
  { id: 'A104', name: 'Noor', age: '17', matricMarks: '70', intermediateMarks: '72', entryTest: '65', program: 'BSCS', feePaid: 'true' },
  { id: 'A105', name: 'Invalid Marks', age: '22', matricMarks: '105', intermediateMarks: '80', entryTest: '70', program: 'BSIT', feePaid: 'true' },
  { id: 'A106', name: 'Unpaid Applicant', age: '20', matricMarks: '90', intermediateMarks: '88', entryTest: '80', program: 'BSSE', feePaid: 'false' }
];

const supportedPrograms = new Set(['BSCS', 'BSSE', 'BSAI']);

function parseNumeric(value, field, errors) {
  if (value === undefined || value === null || String(value).trim() === '') {
    errors.push(`${field} is missing`);
    return NaN;
  }
  const number = Number(value);
  if (!Number.isFinite(number)) errors.push(`${field} is not a valid number`);
  return number;
}

function processApplicant(applicant) {
  const errors = [];
  if (!applicant || typeof applicant !== 'object') {
    return { id: null, name: null, status: 'INVALID DATA', errors: ['Applicant must be an object'] };
  }

  const id = typeof applicant.id === 'string' ? applicant.id.trim() : '';
  const name = typeof applicant.name === 'string' ? applicant.name.trim() : '';
  if (!id) errors.push('id is missing');
  if (!name) errors.push('name is missing');

  const age = parseNumeric(applicant.age, 'age', errors);
  const matricMarks = parseNumeric(applicant.matricMarks, 'matricMarks', errors);
  const intermediateMarks = parseNumeric(applicant.intermediateMarks, 'intermediateMarks', errors);
  const entryTest = parseNumeric(applicant.entryTest, 'entryTest', errors);

  if (Number.isFinite(age) && (age < 17 || age > 30)) errors.push('age must be between 17 and 30');
  for (const [field, value] of Object.entries({ matricMarks, intermediateMarks, entryTest })) {
    if (Number.isFinite(value) && (value < 0 || value > 100)) errors.push(`${field} must be between 0 and 100`);
  }
  if (!supportedPrograms.has(applicant.program)) errors.push('unsupported program');
  if (!['true', 'false', true, false].includes(applicant.feePaid)) errors.push('feePaid must be true or false');

  if (errors.length > 0) {
    return { id: id || null, name: name || null, status: 'INVALID DATA', errors };
  }

  const merit = matricMarks * 0.2 + intermediateMarks * 0.3 + entryTest * 0.5;
  const feePaid = applicant.feePaid === true || applicant.feePaid === 'true';
  const eligible = merit >= 70 && entryTest >= 60 && intermediateMarks >= 60;
  let status;
  if (!eligible || !feePaid) status = 'REJECTED';
  else if (merit >= 80) status = 'SELECTED';
  else status = 'WAITING';

  return { id, name, age, program: applicant.program, feePaid, matricMarks, intermediateMarks, entryTest, merit: Number(merit.toFixed(2)), eligible, status, errors };
}

function createSummary(processed) {
  const valid = processed.filter(applicant => applicant.status !== 'INVALID DATA');
  const invalid = processed.filter(applicant => applicant.status === 'INVALID DATA');
  const withMerit = valid.filter(applicant => Number.isFinite(applicant.merit));
  const highestMeritApplicant = withMerit.length ? withMerit.reduce((best, current) => current.merit > best.merit ? current : best) : null;
  const lowestMerit = withMerit.length ? Math.min(...withMerit.map(applicant => applicant.merit)) : null;
  const averageMerit = withMerit.length ? Number((withMerit.reduce((sum, applicant) => sum + applicant.merit, 0) / withMerit.length).toFixed(2)) : null;
  const applicantsPerProgram = {};
  for (const program of supportedPrograms) applicantsPerProgram[program] = 0;
  for (const applicant of processed) {
    if (applicant.program && Object.hasOwn(applicantsPerProgram, applicant.program)) applicantsPerProgram[applicant.program]++;
  }
  return { validApplicants: valid.length, invalidApplicants: invalid.length, highestMeritApplicant, lowestMeritAmongValid: lowestMerit, averageMerit, applicantsPerProgram };
}

const processedApplicants = applicants.map(processApplicant);
console.log('Processed applicants:', JSON.stringify(processedApplicants, null, 2));
console.log('Summary:', JSON.stringify(createSummary(processedApplicants), null, 2));
console.log('Boundary test:', processApplicant({ id: 'B1', name: 'Boundary', age: '17', matricMarks: '0', intermediateMarks: '60', entryTest: '60', program: 'BSCS', feePaid: 'true' }));
console.log('Invalid input test:', processApplicant(null));
