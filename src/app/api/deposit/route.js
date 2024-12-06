import prisma from "../../../../utils/prisma";
export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Incoming request body:", body);

    if (!body) {
      return new Response(
        JSON.stringify({ error: "Request body cannot be null" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { username, amount, address, id } = body;

    // Validate inputs
    if (!username || amount == null || !address || !id) {
      return new Response(
        JSON.stringify({
          error: "All fields are required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate userId
    const user = await prisma.user.findUnique({
      where: { id: BigInt(id) },
    });

    if (!user) {
      console.error("User not found for userId:", id);
      return new Response(
        JSON.stringify({ error: "Invalid userId. User does not exist." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Insert into the database
    const newDeposit = await prisma.tbl_deposit.create({
      data: {
        username,
        amount,
        address,
        claim: false,
        userId: BigInt(id),
      },
    });

    // Serialize BigInt fields before returning the response
    return new Response(
      JSON.stringify({
        ...newDeposit,
        id: newDeposit.id.toString(),
        userId: newDeposit.userId.toString(),
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding deposit:", error);

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
        stack: error.stack,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
