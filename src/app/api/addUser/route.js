import prisma from "../../../../utils/prisma";


const json = (param) => {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
  };

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { username } = body;

    // Validate the input
    if (!username) {
      return new Response(JSON.stringify({ error: "username is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert the user into the database
    const newUser = await prisma.user.create({
      data: {
        username,
      },
    });

    // Return the created user as JSON
    return new Response(json(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding user:", error);

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
