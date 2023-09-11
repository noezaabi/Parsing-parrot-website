import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-08-16",
});

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const product = await prisma.item.delete({
    where: {
      id: String(params.id),
    },
  });
  // Delete the Stripe product
  await stripe.products.del(product.id);
  return NextResponse.json(product, { status: 200 });
};
