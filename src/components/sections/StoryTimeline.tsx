import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Capybara } from "../illustrations/Capybara";
import { DoodleHeart } from "../illustrations/Doodles";

const timelineEvents = [
  {
    year: "Chapter 1",
    title: "How it Started",
    description: "A simple hello that turned into late-night conversations and endless laughter.",
    align: "left"
  },
  {
    year: "Chapter 2",
    title: "First Adventure",
    description: "Getting lost together but not caring because the company was perfect.",
    align: "right"
  },
  {
    year: "Chapter 3",
    title: "Comfort Silence",
    description: "Realizing we don't always need to talk to understand each other.",
    align: "left"
  }
];

export const StoryTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="story-timeline" ref={containerRef} className="relative py-32 overflow-hidden px-6">
      <div className="container max-w-4xl mx-auto relative">
        
        <div className="text-center mb-24 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-4xl md:text-6xl text-chocolate"
          >
            Our Timeline
          </motion.h2>
          <div className="absolute right-10 md:right-32 top-0 opacity-30 pointer-events-none hidden md:block">
            <Capybara variant="walking" className="w-24 h-16 opacity-50" />
          </div>
        </div>

        {/* Timeline Line */}
        <div className="absolute left-[20px] md:left-1/2 top-48 bottom-0 w-[4px] -translate-x-1/2 overflow-hidden">
          <div className="w-full h-full bg-warm-beige/50" />
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-muted-gold to-soft-brown origin-top"
            style={{ scaleY: pathLength }}
          />
        </div>

        <div className="relative z-10 flex flex-col gap-24 md:gap-32">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                event.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${event.align === "left" ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <span className="text-muted-gold font-medium tracking-widest text-sm uppercase mb-2 block">
                  {event.year}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-chocolate mb-4">{event.title}</h3>
                <p className="text-soft-brown text-lg font-light leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Node */}
              <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-cream border-4 border-muted-gold rounded-full z-20" />
              
              {/* Empty space for alternate layout */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* Ending Doodle */}
        <div className="mt-32 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring" }}
          >
            <DoodleHeart className="w-16 h-16 text-chocolate" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
