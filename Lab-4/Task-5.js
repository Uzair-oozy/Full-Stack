


function abs(...args)
{
    if(args.length === 0) return 0;
    if(args.length === 1) return Math.abs(args[0]);

    let result = [];

    for (const num of args)
    {
        result.push(Math.abs(num));
    }

    return result;
}

function ceil(...args)
{
    if(args.length === 0) return 0;
    if(args.length === 1) return Math.ceil(args[0]);

    let result = [];

    for (const num of args)
    {
        result.push(Math.ceil(num));
    }

    return result;
}

function floor(...args)
{
    if(args.length === 0) return 0;
    if(args.length === 1) return Math.floor(args[0]);

    let result = [];

    for (const num of args)
    {
        result.push(Math.floor(num));
    }

    return result;
}

console.log(abs());
console.log(abs(-5));
console.log(abs(-5, 3.5, -10));

console.log(ceil());
console.log(ceil(4.2));
console.log(ceil(4.2, 5.7, 8.1));

console.log(floor());
console.log(floor(4.8));
console.log(floor(4.8, 5.7, 8.1));

