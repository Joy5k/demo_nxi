import Footer from "@/src/components/Footer/Footer";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div >{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;