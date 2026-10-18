'use strict';

const student = {
  id: 101,
  name: 'Ali',
  marks: 0,
  scholarship: false,
  address: { city: 'Islamabad', sector: 'F-10' },
  contact: { email: 'ali@university.edu' }
};

const update = {
  name: 'Ali Khan',
  marks: 0,
  scholarship: false,
  address: { city: 'Rawalpindi' },
  contact: { phone: '03001234567' }
};

const { name: originalName, marks: originalMarks = 0, ...otherStudentFields } = student;
const { address: originalAddress = {}, contact: originalContact = {} } = student;
const { city: originalCity, sector: originalSector = 'Not provided' } = originalAddress;
const { email: originalEmail = 'No email' } = originalContact;
const [firstMark = 0, secondMark = 0] = [student.marks];

function mergeObjects(target = {}, source = {}, ...additionalSources) {
  return Object.assign({}, target, source, ...additionalSources);
}

function updateStudentProfile(currentStudent, changes = {}) {
  if (!currentStudent || typeof currentStudent !== 'object') throw new TypeError('currentStudent must be an object');
  if (!changes || typeof changes !== 'object') throw new TypeError('changes must be an object');

  const {
    address: addressUpdate = {},
    contact: contactUpdate = {},
    ...topLevelUpdates
  } = changes;

  const nextAddress = { ...(currentStudent.address ?? {}), ...(addressUpdate ?? {}) };
  const nextContact = { ...(currentStudent.contact ?? {}), ...(contactUpdate ?? {}) };

  return {
    ...currentStudent,
    ...topLevelUpdates,
    address: nextAddress,
    contact: nextContact
  };
}

const updatedStudent = updateStudentProfile(student, update);
const missingCity = updatedStudent.address?.city ?? 'Unknown city';
const missingPhone = updatedStudent.contact?.phone ?? 'No phone';
const summary = { name: updatedStudent.name, city: missingCity, phone: missingPhone };
const { name: updatedName, ...updatedRest } = updatedStudent;
const combinedPreview = mergeObjects({ originalName, originalCity, originalSector, originalEmail, originalMarks, firstMark, secondMark }, summary, { updatedName });

console.log('Updated student:', JSON.stringify(updatedStudent, null, 2));
console.log('Original student:', JSON.stringify(student, null, 2));
console.log('Destructuring and shorthand preview:', JSON.stringify(combinedPreview, null, 2));
console.log('References:', {
  originalVsUpdated: student === updatedStudent,
  originalAddressVsUpdated: student.address === updatedStudent.address,
  originalContactVsUpdated: student.contact === updatedStudent.contact
});
console.log('Falsy values preserved:', { marks: updatedStudent.marks, scholarship: updatedStudent.scholarship, emptyString: updateStudentProfile(student, { name: '' }).name });
console.log('Rest fields:', Object.keys(otherStudentFields));
console.log('Object rest fields:', Object.keys(updatedRest));
