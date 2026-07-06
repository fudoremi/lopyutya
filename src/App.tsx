import { CustomCursor } from "./components/ui/CustomCursor";
import { FloatingParticles } from "./components/ui/FloatingParticles";
import { Navbar } from "./components/layout/Navbar";
import { MusicPlayer } from "./components/layout/MusicPlayer";
import { HeroSection } from "./components/sections/HeroSection";
import { StoryTimeline } from "./components/sections/StoryTimeline";
import { LoveLetter } from "./components/sections/LoveLetter";
import { MemoryGallery } from "./components/sections/MemoryGallery";
import { ReasonsCarousel } from "./components/sections/ReasonsCarousel";
import { MiniGame } from "./components/sections/MiniGame";
import { CatMemory } from "./components/sections/CatMemory";
import { SurpriseSection } from "./components/sections/SurpriseSection";

function App() {
  return (
    <>
      <CustomCursor />
      <FloatingParticles />
      <Navbar />
      <MusicPlayer />
      
      <main>
        <HeroSection />
        <StoryTimeline />
        <LoveLetter />
        <MemoryGallery />
        <ReasonsCarousel />
        <MiniGame />
        <CatMemory />
        <SurpriseSection />
      </main>
    </>
  );
}

export default App;
