import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

export async function GET(req) {
  const session = await getServerSession(); // get current logged-in user
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
console.log(session)
  const { email } = session?.user; // or use email or other identifier
  console.log(email)

  try {
    const cartItems = await dbConnect("productCart").find({"orders.email":email}).toArray();
    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
}
