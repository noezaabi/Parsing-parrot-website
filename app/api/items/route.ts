import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";
import type { Item } from "@prisma/client";
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-08-16",
});

export const POST = async (request: Request) => {
  const body: Item = await request.json();
  console.log(`Image url : ${body}`);
  const product = await prisma.item.create({
    data: {
      imageUrl: body.imageUrl,
      name: body.name,
      price: body.price,
    },
  });
  const stripeProduct = await stripe.products.create({
    images: [body.imageUrl],
    id: product.id,
    name: body.name,
  });

  const stripePrice = await stripe.prices.create({
    unit_amount: body.price * 100, // Stripe uses cents, not dollars
    currency: "usd",
    product: stripeProduct.id,
  });

  const updatedProduct = await prisma.item.update({
    where: {
      id: product.id,
    },
    data: {
      stripeProdId: stripeProduct.id,
      stripePriceId: stripePrice.id,
    },
  });

  return NextResponse.json(updatedProduct, { status: 201 });
};
