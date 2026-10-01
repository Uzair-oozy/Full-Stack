const Person = {
    name: 'Uzair',
    age: '21',
    address: {
        city: 'Islamabad',
        country: 'Pakistan',
    },
    phoneNo: '0300-1234567'
}

for(const [key, value] of Object.entries(Person))
{
    console.log(key, value);
}