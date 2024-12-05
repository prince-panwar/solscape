import prisma from "../../../../utils/prisma";

const json = (param) => {
  return JSON.stringify(
    param,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // Convert BigInt to string
  );
};

export async function GET(request) {
  try {
    // Fetch all deposits from the database
    const deposits = await prisma.tbl_deposit.findMany({
      include: {
        user: true, // Include user information
      },
    });

    // Return the deposits as JSON
    return new Response(json(deposits), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching deposits:", error);

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
