'use strict';

const fakeData = {
  '/users': [
    { id: 101, name: 'Ali', department: 'CS' },
    { id: 102, name: 'Sara', department: 'CS' },
    { id: 103, name: 'Usman', department: 'SE' },
    { id: 104, name: 'Hina', department: 'AI' }
  ],
  '/courses': [
    { id: 'CS301', name: 'Algorithms' },
    { id: 'CS401', name: 'Advanced Programming' },
    { id: 'AI301', name: 'Machine Learning' }
  ],
  '/results': [
    { studentId: 101, marks: 82 },
    { studentId: 102, marks: 91 },
    { studentId: 103, marks: 47 },
    { studentId: 104, marks: 73 }
  ]
};

async function fakeFetch(url, options = {}) {
  const signal = options.signal;
  const behavior = options.behavior ?? 'success';
  const wait = milliseconds => new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, milliseconds);
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timer);
        reject(new DOMException('The request was aborted', 'AbortError'));
        return;
      }
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('The request was aborted', 'AbortError'));
      }, { once: true });
    }
  });

  if (behavior === 'network-error') throw new TypeError('Simulated network failure');
  await wait(behavior === 'slow' ? 1000 : 30);
  if (behavior === '404') return { ok: false, status: 404, json: async () => ({ message: 'Not found' }) };
  if (behavior === '500') return { ok: false, status: 500, json: async () => ({ message: 'Server error' }) };
  if (behavior === 'invalid-json') return { ok: true, status: 200, json: async () => { throw new SyntaxError('Unexpected token in JSON'); } };
  if (!Object.hasOwn(fakeData, url)) return { ok: false, status: 404, json: async () => ({ message: 'Not found' }) };
  return { ok: true, status: 200, json: async () => fakeData[url] };
}

async function getJSON(url, fetchImplementation = fetch) {
  const response = await fetchImplementation(url);
  if (!response || typeof response.ok !== 'boolean') throw new TypeError('Invalid response object');
  if (!response.ok) throw new Error(`HTTP error ${response.status} for ${url}`);
  return response.json();
}

function calculateDashboard(users, courses, results) {
  const studentsWithResults = users.map(user => ({ ...user, marks: results.find(result => result.studentId === user.id)?.marks ?? null }));
  const validResults = results.filter(result => Number.isFinite(result.marks) && result.marks >= 0 && result.marks <= 100);
  const overallAverage = validResults.length ? Number((validResults.reduce((sum, result) => sum + result.marks, 0) / validResults.length).toFixed(2)) : null;
  const highestResult = validResults.length ? validResults.reduce((best, current) => current.marks > best.marks ? current : best) : null;
  const highestPerformingStudent = highestResult ? users.find(user => user.id === highestResult.studentId) ?? null : null;
  const departmentStats = studentsWithResults.reduce((stats, student) => {
    if (!stats[student.department]) stats[student.department] = { students: 0, totalMarks: 0, averageMarks: null, failedStudents: 0 };
    const stat = stats[student.department];
    stat.students++;
    if (Number.isFinite(student.marks) && student.marks >= 0 && student.marks <= 100) {
      stat.totalMarks += student.marks;
      if (student.marks < 50) stat.failedStudents++;
    }
    return stats;
  }, {});
  Object.values(departmentStats).forEach(stat => {
    const countWithMarks = studentsWithResults.filter(student => student.department && Number.isFinite(student.marks) && student.marks >= 0 && student.marks <= 100).length;
    stat.averageMarks = stat.students ? Number((stat.totalMarks / Math.max(1, studentsWithResults.filter(student => Number.isFinite(student.marks) && student.marks >= 0 && student.marks <= 100 && student.department === Object.keys(departmentStats).find(department => departmentStats[department] === stat)).length)).toFixed(2)) : null;
    delete stat.totalMarks;
  });
  return {
    totalStudents: users.length,
    totalCourses: courses.length,
    overallAverageMarks: overallAverage,
    highestPerformingStudent: highestPerformingStudent ? { ...highestPerformingStudent, marks: highestResult.marks } : null,
    failedStudents: validResults.filter(result => result.marks < 50).length,
    departmentStats
  };
}

async function loadDashboard(fetchImplementation = fakeFetch) {
  const [users, courses, results] = await Promise.all([
    getJSON('/users', fetchImplementation),
    getJSON('/courses', fetchImplementation),
    getJSON('/results', fetchImplementation)
  ]);
  return calculateDashboard(users, courses, results);
}

async function fetchWithTimeout(url, milliseconds, fetchImplementation = fakeFetch) {
  if (!Number.isFinite(milliseconds) || milliseconds <= 0) throw new RangeError('milliseconds must be a positive number');
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), milliseconds);
  try {
    const response = await fetchImplementation(url, { signal: controller.signal, behavior: url === '/slow' ? 'slow' : 'success' });
    if (!response || typeof response.ok !== 'boolean') throw new TypeError('Invalid response object');
    if (!response.ok) throw new Error(`HTTP error ${response.status} for ${url}`);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') throw new Error(`Request timed out after ${milliseconds} ms`);
    if (error instanceof SyntaxError) throw new SyntaxError(`Invalid JSON from ${url}: ${error.message}`);
    if (error instanceof TypeError) throw new TypeError(`Network or response failure for ${url}: ${error.message}`);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

loadDashboard().then(report => console.log('Dashboard:', JSON.stringify(report, null, 2))).catch(error => console.error('Dashboard failed:', error.message));

(async () => {
  const tests = [
    ['200 success', () => getJSON('/users', (url) => fakeFetch(url))],
    ['404 response', () => getJSON('/missing', (url) => fakeFetch(url))],
    ['500 response', () => getJSON('/users', (url) => fakeFetch(url, { behavior: '500' }))],
    ['network failure', () => getJSON('/users', (url) => fakeFetch(url, { behavior: 'network-error' }))],
    ['invalid JSON', () => getJSON('/users', (url) => fakeFetch(url, { behavior: 'invalid-json' }))]
  ];
  for (const [label, operation] of tests) {
    try {
      await operation();
      console.log(`${label}: success`);
    } catch (error) {
      console.log(`${label}: ${error.name} - ${error.message}`);
    }
  }

  try {
    await fetchWithTimeout('/slow', 50, fakeFetch);
  } catch (error) {
    console.log('Timeout test:', error.name, error.message);
  }
})();
