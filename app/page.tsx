import About from "@/components/organisms/About";
import Contact from "@/components/organisms/Contact";
import Experience from "@/components/organisms/Experience";
import Footer from "@/components/organisms/Footer";
import Hero from "@/components/organisms/Hero";
import Navbar from "@/components/organisms/Navbar";
import Projects from "@/components/organisms/Projects";
import Skills from "@/components/organisms/Skills";
import Testimonials from "@/components/organisms/Testimonials";
import PortfolioTemplate from "@/components/templates/PortfolioTemplate";

export default function Home() {
  return (
    <PortfolioTemplate navbar={<Navbar />} footer={<Footer />}>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Experience />
      <Contact />
      <Skills />
    </PortfolioTemplate>
  );
}
