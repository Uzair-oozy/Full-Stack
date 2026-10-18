'use strict';

const studentDatabase = new Map([
  [101, { id: 101, name: 'Ali', completedPrerequisites: ['CS301'], registeredCourses: [] }],
  [102, { id: 102, name: 'Sara', completedPrerequisites: [], registeredCourses: [] }]
]);
const courseDatabase = new Map([
  ['CS401', { code: 'CS401', prerequisite: 'CS301', seats: 2, registeredStudentIds: [] }],
  ['CS402', { code: 'CS402', prerequisite: 'CS300', seats: 0, registeredStudentIds: [] }]
]);

function delay(value, milliseconds = 40) {
  return new Promise(resolve => setTimeout(() => resolve(value), milliseconds));
}

function getStudent(studentId) {
  return delay(studentDatabase.get(studentId) ?? null).then(student => {
    if (!student) throw new Error(`Student ${studentId} does not exist`);
    return student;
  });
}

function getCourse(courseCode) {
  return delay(courseDatabase.get(courseCode) ?? null).then(course => {
    if (!course) throw new Error(`Course ${courseCode} does not exist`);
    return course;
  });
}

function checkPrerequisites(student, course) {
  return delay({ student, course }).then(data => {
    if (!data.student.completedPrerequisites.includes(data.course.prerequisite)) throw new Error(`Prerequisite ${data.course.prerequisite} is not completed`);
    return data;
  });
}

function checkSeats(student, course) {
  return delay({ student, course }).then(data => {
    if (data.course.registeredStudentIds.length >= data.course.seats) throw new Error(`Course ${data.course.code} is full`);
    return data;
  });
}

function registerStudent(student, course) {
  return delay(null).then(() => {
    if (student.registeredCourses.includes(course.code)) throw new Error(`Student ${student.id} is already registered in ${course.code}`);
    student.registeredCourses.push(course.code);
    course.registeredStudentIds.push(student.id);
    return { studentId: student.id, course: course.code, status: 'REGISTERED' };
  });
}

function sendEmail(confirmation) {
  return delay({ service: 'Email', recipient: `${confirmation.studentId}@university.edu` }).then(result => result);
}

function sendSMS(confirmation) {
  return delay(null).then(() => {
    if (confirmation.studentId === 101) throw new Error('SMS gateway unavailable');
    return { service: 'SMS', status: 'sent' };
  });
}

function writeAuditLog(confirmation) {
  return delay({ service: 'Audit', event: `Registered ${confirmation.studentId} in ${confirmation.course}` });
}

function register(studentId, courseCode) {
  return getStudent(studentId)
    .then(student => getCourse(courseCode).then(course => ({ student, course })))
    .then(({ student, course }) => checkPrerequisites(student, course))
    .then(({ student, course }) => checkSeats(student, course))
    .then(({ student, course }) => registerStudent(student, course))
    .then(confirmation => {
      const postRegistrationTasks = [
        { service: 'Email', promise: sendEmail(confirmation) },
        { service: 'SMS', promise: sendSMS(confirmation) },
        { service: 'Audit', promise: writeAuditLog(confirmation) }
      ];
      return Promise.allSettled(postRegistrationTasks.map(task => task.promise)).then(outcomes => ({
        confirmation,
        services: outcomes.map((outcome, index) => ({ service: postRegistrationTasks[index].service, status: outcome.status }))
      }));
    })
    .catch(error => ({ error: error.message }))
    .finally(() => console.log(`Registration workflow finished for student ${studentId}, course ${courseCode}`));
}

register(101, 'CS401').then(result => console.log('Registration report:', JSON.stringify(result, null, 2)));
register(102, 'CS401').then(result => console.log('Prerequisite failure test:', result));

function serverOne() {
  return delay(null, 20).then(() => { throw new Error('Server one unavailable'); });
}
function serverTwo() {
  return delay({ code: 'CS401', title: 'Advanced Programming' }, 50);
}
Promise.any([serverOne(), serverTwo()])
  .then(course => console.log('First successful server result:', course))
  .catch(error => console.error('All servers failed:', error.errors));

Promise.race([delay('Slow server result', 100), delay('Fast server result', 20)]).then(result => console.log('First settled result using race():', result));
Promise.all([delay('Student loaded'), delay('Course loaded')]).then(values => console.log('All required services succeeded:', values));
