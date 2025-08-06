import dbConnect from "@/lib/dbConnect"
import { NextResponse } from "next/server"

export const GET = async () => {
  const productsCollection = dbConnect('products');

  // Run aggregation directly on collection
 const filteredProducts = await productsCollection.aggregate([
  {
    $addFields: {
      priceNum: { $toDouble: "$price" },
      offerPriceNum: { $toDouble: "$offerPrice" }
    }
  },
  {
    $addFields: {
      discountDifference: { $subtract: ["$priceNum", "$offerPriceNum"] }
    }
  },
  { $sort: { discountDifference: -1 } },
  { $limit: 5 }
]).toArray();

  return NextResponse.json(filteredProducts);
}