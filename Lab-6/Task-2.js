function getUser()
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(() => 
        {
            resolve({
                id: 1,
                name: "Uzair",
                email: "uzair@gmail.com"
            });
        }, 1000);
    });
}

function getUserDetails()
{
    return new Promise((resolve, reject) => 
    {
        setTimeout(() => 
        {
            resolve({
            age: 21,
            course: "Computer Science"
            });
        }, 1000);
    });
}

async function getCompleteUser() 
{
    try 
    {
        const [user, details] = await Promise.all([
            getUser(),
            getUserDetails()
        ]);

        if(
            user &&
            user.id &&
            user.name &&
            user.email &&
            details &&
            details.age &&
            details.course
        )
        {
            return {
                ...user,
                ...details
            };
        }
        else
        {
            throw new Error(error.message);
        }
    }
    catch (error)
    {
        throw new Error(error.message);
    }
}

async function main() 
{
    try
    {
        const user = await getCompleteUser();
        console.log("Valid user:", user);
    }
    catch (error)
    {
        console.log("Error:", error.message);
    }
}

main();