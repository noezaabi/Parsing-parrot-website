import { Navbar } from "@/components/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default RootLayout;
