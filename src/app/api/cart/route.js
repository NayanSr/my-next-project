// /app/api/cart/route.js

import { postToCart } from "@/app/actions/post/postToCart";

export async function POST(request) {
  const data = await request.json();
  // pass data to your server function
  const result = await postToCart(data);
  return new Response(JSON.stringify(result), { status: 200 });
}