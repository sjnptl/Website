import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/Chat";
import { useState } from "react";

const Index = () => {
 const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default Index;