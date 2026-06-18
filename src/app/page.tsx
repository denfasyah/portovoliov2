import Navbar from "@/components/layouts/Navbar";
import Hero from "@/features/hero/Hero";
import Portfolio from "@/features/portofolio/Portofolio";
import Experience from "@/features/experience/Experience";
import GetInTouch from "@/features/getInTouch/GetInTouch";
import Footer from "@/components/layouts/Footer";
import About from "@/features/about/About";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Experience />
      <GetInTouch />
      <Footer />
    </main>
  );
}
