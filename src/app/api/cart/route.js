import { postToCart } from "@/app/actions/post/postToCart";
/* import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth"; */



export async function POST(request) {
  const data = await request.json();
  console.log(data)
  // pass data to your server function
  const result = await postToCart(data);
  return new Response(JSON.stringify(result), { status: 200 });
}
