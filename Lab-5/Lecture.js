const marks = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];

console.log(marks.find(mark => mark > 50));
marks.forEach((mark, index) => {console.log(`Mark at index ${index} is ${mark}`)});
console.log(marks.filter(mark => mark > 50));

//console.log(marks.find(mark => mark > 50) ,mark);


console.log([100, 5, 20, 3].sort());
// Ascending order
console.log([100, 20, 5, 3].sort((a, b) => a-b));
// Descending order
console.log([100, 20, 5, 3].sort((a, b) => b-a));

