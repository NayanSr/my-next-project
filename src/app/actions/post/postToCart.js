// /app/actions/post/postToCart.js
'use server'
import dbConnect from "@/lib/dbConnect"

export const postToCart = async ({ product, email, quantity }) => {
  const cartProductsCollection = await dbConnect('productCart');

  // Check if this product exists in cart
  const existing = await cartProductsCollection.findOne({ productId: product._id });
  if (!existing) {
    // insert new
    const data = {
      productId: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      orders: [{ email, quantity }],
    };
    const result = await cartProductsCollection.insertOne(data);
    result.insertedId = result.insertedId.toString();
    return result;
  } else {
    // update existing
    const existingOrder = existing.orders.find(order => order.email === email);
    if (existingOrder) {
      // update quantity
      await cartProductsCollection.updateOne(
        { _id: existing._id },
        { $set: { 'orders.$[elem].quantity':quantity } },
        { arrayFilters: [{ 'elem.email': email }] }
      );
    } else {
      // add new order for user
      await cartProductsCollection.updateOne(
        { _id: existing._id },
        { $push: { orders: { email, quantity } } }
      );
    }
    return { success: true };
  }
};