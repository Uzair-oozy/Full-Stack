'use strict';

const students = [
  { id: 101, name: 'Ali', completedPrerequisites: ['CS301'], registeredCourses: [] },
  { id: 102, name: 'Sara', completedPrerequisites: [], registeredCourses: [] },
  { id: 103, name: 'Usman', completedPrerequisites: ['CS301'], registeredCourses: ['CS401'] }
];

const courses = {
  CS401: { code: 'CS401', prerequisite: 'CS301', capacity: 2, registeredStudentIds: [201] },
  CS402: { code: 'CS402', prerequisite: 'CS300', capacity: 5, registeredStudentIds: [] },
  CS403: { code: 'CS403', prerequisite: 'CS301', capacity: 1, registeredStudentIds: [201] }
};

function loadStudent(studentId, callback) {
  setTimeout(() => {
    const student = students.find(item => item.id === studentId);
    if (!student) return callback(new Error(`Student ${studentId} does not exist`));
    callback(null, { ...student, completedPrerequisites: [...student.completedPrerequisites], registeredCourses: [...student.registeredCourses] });
  }, 30);
}

function checkPrerequisites(student, course, callback) {
  setTimeout(() => {
    if (!student.completedPrerequisites.includes(course.prerequisite)) return callback(new Error(`Prerequisite ${course.prerequisite} is not completed`));
    callback(null, { student, course });
  }, 30);
}

function checkAvailableSeats(student, course, callback) {
  setTimeout(() => {
    if (course.registeredStudentIds.length >= course.capacity) return callback(new Error(`Course ${course.code} is full`));
    callback(null, { student, course });
  }, 30);
}

function registerCourse(student, course, callback) {
  setTimeout(() => {
    if (student.registeredCourses.includes(course.code)) return callback(new Error(`Student ${student.id} is already registered in ${course.code}`));
    course.registeredStudentIds.push(student.id);
    student.registeredCourses.push(course.code);
    callback(null, { studentId: student.id, course: course.code, status: 'REGISTERED' });
  }, 30);
}

function registerStudentForCourse(studentId, courseCode, callback) {
  let callbackCalled = false;
  const finish = (error, value) => {
    if (callbackCalled) return;
    callbackCalled = true;
    callback(error, value);
  };

  const course = courses[courseCode];
  if (!course) return setTimeout(() => finish(new Error(`Course ${courseCode} does not exist`)), 0);

  loadStudent(studentId, (studentError, student) => {
    if (studentError) return finish(studentError);
    checkPrerequisites(student, course, (prerequisiteError, prerequisiteData) => {
      if (prerequisiteError) return finish(prerequisiteError);
      checkAvailableSeats(prerequisiteData.student, prerequisiteData.course, (seatError, seatData) => {
        if (seatError) return finish(seatError);
        registerCourse(seatData.student, seatData.course, (registrationError, confirmation) => {
          if (registrationError) return finish(registrationError);
          finish(null, confirmation);
        });
      });
    });
  });
}

registerStudentForCourse(101, 'CS401', (error, result) => {
  if (error) console.error('Registration failed:', error.message);
  else console.log('Registration success:', result);
});
registerStudentForCourse(999, 'CS401', (error, result) => console.log('Missing student test:', error?.message ?? result));
registerStudentForCourse(102, 'CS401', (error, result) => console.log('Prerequisite test:', error?.message ?? result));
registerStudentForCourse(103, 'CS401', (error, result) => console.log('Already registered test:', error?.message ?? result));
registerStudentForCourse(101, 'CS403', (error, result) => console.log('Course full test:', error?.message ?? result));

console.log('Dependent callback operations require nested callbacks; as stages increase, the nesting becomes harder to read, maintain, and debug. Each stage must separately check and propagate errors, making it easy to miss a failure path.');
