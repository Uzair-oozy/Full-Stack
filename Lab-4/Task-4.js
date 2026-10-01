

function roundMe(...args)
{
    if(args.length === 0) return 0;
    if(args.length === 1) return Math.round(args[0]);

    let rounded = [];

    for(const num of args)
    {
        rounded.push(Math.round(num));
    }
    return rounded;
}

console.log(roundMe());
console.log(roundMe(4.7));
console.log(roundMe(5.5, 7.9));