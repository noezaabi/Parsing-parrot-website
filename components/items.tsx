"use client";

import { Item } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import prismadb from "@/lib/prismadb";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ItemsProps {
  data: Item[];
}

const Items = ({ data }: ItemsProps) => {
  const router = useRouter();
  const onClickDelete = async (itemId: string | undefined) => {
    await axios.delete(`/api/items/${itemId}`);
    router.refresh();
  };
  return (
    <div className="grid gap-8 w-full px-24 pt-40 grid-cols-5">
      {data.map((item) => (
        <Card className=" col-span-1" key={item.id}>
          <CardHeader>
            <div className="relative h-44 w-full">
              <Image
                fill={true}
                objectFit="cover"
                src={item.imageUrl}
                alt="item"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between items-center">
              <CardTitle>{item.name}</CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  onClickDelete(item.id);
                }}
              >
                <Trash className="text-red-600 h-4 w-4" />
              </Button>
            </div>
            <CardDescription>{`Price: $${item.price}`}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Items;
