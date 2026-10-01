let primeNo = [2, 3, 5, 7, 11, 13];
var int = 7;

console.log("Using for...of loop: ");
for (const num of primeNo)
{
    if(num >= int)
    {
        console.log(num);
    }
}

console.log("Using for...in loop: ");
for (const i in primeNo)
{
    if(primeNo[i] >= int)
    {
        console.log(primeNo[i]);
    }
}