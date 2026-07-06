import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Story", href: "#story" },
  { name: "Letter", href: "#letter" },
  { name: "Memories", href: "#memories" },
  { name: "Angel", href: "#angel" },
  { name: "Reasons", href: "#reasons" },
  { name: "Play", href: "#play" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300 py-4 px-6 md:px-12 flex justify-between items-center",
          scrolled ? "glass-panel rounded-none border-t-0 border-x-0 border-white/20 py-3" : "bg-transparent"
        )}
      >
        <a href="#" className="font-serif text-2xl font-bold text-chocolate tracking-wide">
          Our<span className="text-muted-gold italic">Journey</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-chocolate font-medium hover:text-soft-brown transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-muted-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-chocolate z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-cream/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="font-serif text-4xl text-chocolate hover:text-muted-gold transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
