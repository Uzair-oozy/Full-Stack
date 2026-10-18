'use strict';

class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    return `Hello, my name is ${this.name}. Email: ${this.email}.`;
  }
}

class Student extends Person {
  constructor(name, email, rollNo, marks) {
    super(name, email);
    this.rollNo = rollNo;
    this.marks = marks;
  }

  introduce() {
    return `${super.introduce()} I am a student. Roll number: ${this.rollNo}.`;
  }

  getResult() {
    if (!Number.isFinite(this.marks) || this.marks < 0 || this.marks > 100) return 'INVALID MARKS';
    return this.marks >= 50 ? 'PASS' : 'FAIL';
  }
}

class FacultyMember extends Person {
  constructor(name, email, employeeId, department) {
    super(name, email);
    this.employeeId = employeeId;
    this.department = department;
  }

  introduce() {
    return `${super.introduce()} I am a faculty member. Employee ID: ${this.employeeId}; Department: ${this.department}.`;
  }
}

const student1 = new Student('Ali', 'ali@university.edu', 'CS-101', 82);
const student2 = new Student('Sara', 'sara@university.edu', 'CS-102', 47);
const faculty1 = new FacultyMember('Dr. Hina', 'hina@university.edu', 'F-201', 'AI');
const faculty2 = new FacultyMember('Mr. Ahmed', 'ahmed@university.edu', 'F-202', 'CS');
const users = [student1, faculty1, student2, faculty2];

users.forEach(user => console.log(user.introduce()));

const guest = { name: 'Dr. Ahmed', email: 'ahmed@example.com' };
console.log('call():', Person.prototype.introduce.call(guest));

const fn = student1.introduce;
try {
  console.log('Detached method:', fn());
} catch (error) {
  console.log('Detached method error:', error.name, error.message);
}

const safelyBoundIntroduce = student1.introduce.bind(student1);
console.log('bind():', safelyBoundIntroduce());
console.log('getResult():', student1.getResult(), student2.getResult());
console.log('instanceof:', {
  studentIsStudent: student1 instanceof Student,
  studentIsPerson: student1 instanceof Person,
  facultyIsFacultyMember: faculty1 instanceof FacultyMember,
  facultyIsStudent: faculty1 instanceof Student
});
