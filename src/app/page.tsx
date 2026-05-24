import { Navbar } from "@/components/layout";
import { Hero, About, Stack, Projects, Experience, Contact } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
