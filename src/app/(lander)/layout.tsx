import { ScrollProgress } from "@/magicui/scroll-progress";
import Navbar from "@/components/root/navbar";
import Footer from "@/components/root/footer";
// import ThemeToggleButton from "@/components/ui/theme-toggle-button";

export default function LanderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex justify-center items-center px-5 md:px-10 lg:px-20">
        <div className="container mt-30">
          {/* <ThemeToggleButton
            className="fixed bottom-5 right-5 z-10 cursor-pointer"
            start="bottom-right"
          /> */}
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
