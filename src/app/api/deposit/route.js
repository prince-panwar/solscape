import prisma from "../../../../utils/prisma";

const json = (param) => {
  return JSON.stringify(
    param,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // Convert BigInt to string
  );
};

export async function POST(request) {
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    const { username, amount, claim, address, userId } = body;

    // Validate the input
    if (!username || amount == null || claim == null || !address || !userId) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Insert the deposit into the database
    const newDeposit = await prisma.tbl_deposit.create({
      data: {
        username,
        amount,
        claim,
        address,
        userId: BigInt(userId),
      },
    });

    // Return the created deposit as JSON
    return new Response(json(newDeposit), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding deposit:", error);

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
