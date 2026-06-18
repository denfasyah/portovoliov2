import Navbar from "@/components/layouts/Navbar";
import Background from "@/components/layouts/Background";
import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Portfolio from "@/components/sections/portofolio/Portofolio";
import Experience from "@/components/sections/experience/Experience";
import GetInTouch from "@/components/sections/getInTouch/GetInTouch";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* <Background />
      <Navbar /> */}
      <Hero />
      <About />
      <Portfolio />
      <Experience />
      <GetInTouch />
      <Footer />
    </main>
  );
}
