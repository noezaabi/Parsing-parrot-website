import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-08-16",
});

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = req.query.id;

  if (req.method === "DELETE") {
    console.log(itemId);
    const item = await prisma.item.delete({
      where: { id: String(itemId) },
    });

    // Delete the Stripe product
    await stripe.products.del(item.id);
    res.json(item);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const product = await prisma.item.delete({
    where: {
      id: String(params.id),
    },
  });
  return NextResponse.json(product, { status: 200 });
};
