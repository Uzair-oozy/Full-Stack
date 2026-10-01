const Person = {
    name: 'Uzair',
    age: '21',
    DOB: '19-12-2004',
    address: {
        city: 'Islamabad',
        country: 'Pakistan',
    },
    DegreeProgram: {
        type: "Undergraduate",
        classification: "Bachelor's in Science",
        Major: "Computer Science",
        YOG: '2028'
    },
    phoneNo: '0300-1234567',
}

var bio = ["Hi my name is", " I am", " years old, born on",  " and I live in", ",", ".", " I am currently enrolled in a", " program, pursuing a", " in", " and I will graduate in", ". You can reach me at", "."];

var paragraph = "";

var i = 0;
for(const key of Object.keys(Person))
{
    if(typeof Person[key] === "object")
    {
        for(const nestedKey of Object.keys(Person[key]))
        {
            paragraph += bio[i] + " " + Person[key][nestedKey];
            i++;
        }
    }
    else
    {
        paragraph += bio[i] + " " + Person[key];
        i++;
    }
}

console.log(paragraph);