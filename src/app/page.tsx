import Navbar from "@/components/layouts/Navbar";
import Background from "@/components/layouts/Background";
import Hero from "@/components/sections/hero/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Background />
      <Navbar />
      <Hero />
    </main>
  );
}
