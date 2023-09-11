import Items from "@/components/items";
import prismadb from "@/lib/prismadb";

const RootPage = async () => {
  const items = await prismadb.item.findMany();
  return (
    <div>
      <Items data={items} />
    </div>
  );
};

export default RootPage;
