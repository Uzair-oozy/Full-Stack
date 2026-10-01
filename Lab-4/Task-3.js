
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

function createPhoneNumber(numbers)
{
    let phoneNumber = "(";
    for(let i = 0; i <= 2; i++)
    {
        phoneNumber += numbers[i];
    }

    phoneNumber += ") ";
    
    for(let i = 3; i <= 5; i++)
    {
        phoneNumber += numbers[i];
    }
    
    phoneNumber += "-";
    
    for(let i = 6; i < numbers.length; i++)
    {
        phoneNumber += numbers[i];
    }

    return phoneNumber;
}

console.log(createPhoneNumber(numbers));