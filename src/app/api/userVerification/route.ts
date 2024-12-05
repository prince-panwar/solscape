import prisma from "../../../../utils/prisma";




const json = (param: any): any => {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  };

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    // Check if username is provided
    if (!username) {
      return new Response(JSON.stringify({ error: "username is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(username);

    // Query Prisma to find users with the provided username
    const result = await prisma.user.findMany({
      where: {
        username: {
          equals: username,
        },
      },
    });

    // Return the result as JSON
    return new Response(json(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    // Handle internal server errors
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
