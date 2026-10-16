// let myPromise = new Promise((resolve, reject) => {

//     let marks = 60

//     if(marks >= 60)
//     {
//         resolve("You Passed")
//     }
//     else
//     {
//         reject("You Failed")
//     }
// })

// myPromise.then((message) => {
//     console.log(message)
// })
// .catch((message) => {
//     console.log(message)
// })

// async awaut function=========================

// async function greet() {
//     return "Hello, World!";
// }

// greet().then((message) => {
//     console.log(message);
// });



// function wait() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Burger is ready!");
//         }, 0);
//     });
// }

// async function main() {
//     console.log("Ordering burger...");

//     let result = await wait();

//     console.log(result);
// }

// main();

// console.log("I am using my phone.");



function getStudent() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;

            if (success) {
                resolve({
                    name: "Uzair",
                    age: 21,
                    course: "Computer Science",
                    marks: 85
                });
            } else {
                reject("Server error!");
            }
        }, 2000);
    });
}

async function main() {
    console.log("Fetching student data...");

    try {
        let student = await getStudent();

        console.log("Name:", student.name);
        console.log("Age:", student.age);
        console.log("Course:", student.course);
        console.log("Marks:", student.marks);

    } catch (error) {
        console.log("Error:", error);
    }

    console.log("Program finished!");
}

main();
