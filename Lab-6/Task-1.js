async function getUser() 
{
    try 
    {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

        if(!response.ok)
        {
            throw new Error("Failed to fetch user");
        }

        const user = await response.json();
        return user;
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
        const user = await getUser();
        console.log("User fetched successfully:", user);
    }
    catch (error)
    {
        console.log("Error:", error.message);
    }
}

main();