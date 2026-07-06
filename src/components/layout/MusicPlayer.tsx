import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import YouTube from "react-youtube";
import type { YouTubeEvent, YouTubePlayer } from "react-youtube";

// Event payload type
export type TrackInfo = {
  videoId: string;
  title: string;
  artist: string;
  start: number;
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [track, setTrack] = useState<TrackInfo>({
    videoId: "ytMxh-_6EcI", // Foto Kita Blur
    title: "Foto Kita Blur",
    artist: "Sal Priadi",
    start: 60, // approximate chorus
  });

  useEffect(() => {
    const handleTrackChange = (e: CustomEvent<TrackInfo>) => {
      const newTrack = e.detail;
      // Only change if different
      if (newTrack.videoId !== track.videoId) {
        setTrack(newTrack);
        if (player) {
          if (isPlaying) {
            player.loadVideoById({ videoId: newTrack.videoId, startSeconds: newTrack.start });
          } else {
            player.cueVideoById({ videoId: newTrack.videoId, startSeconds: newTrack.start });
          }
        }
      }
    };

    window.addEventListener("changeMusic" as any, handleTrackChange);
    return () => window.removeEventListener("changeMusic" as any, handleTrackChange);
  }, [player, isPlaying, track.videoId]);

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
    event.target.cueVideoById({ videoId: track.videoId, startSeconds: track.start });
  };

  const togglePlay = () => {
    if (!player) return;
    
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!player) return;

    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="absolute opacity-0 pointer-events-none -left-[9999px]">
        <YouTube
          opts={{
            height: "10",
            width: "10",
            playerVars: {
              autoplay: 0,
              loop: 1,
            },
          }}
          onReady={onReady}
          onEnd={(e) => {
            e.target.seekTo(track.start);
            e.target.playVideo();
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="fixed bottom-6 right-6 z-40 glass-panel p-3 flex items-center gap-3"
      >
        <div className="flex flex-col mx-2 hidden sm:flex">
          <span className="text-xs font-semibold text-chocolate">{track.artist}</span>
          <span className="text-[10px] text-soft-brown">{track.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-hazelnut text-cream flex items-center justify-center hover:bg-soft-brown transition-colors"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full text-soft-brown flex items-center justify-center hover:bg-warm-beige transition-colors"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {isPlaying && (
          <div className="absolute -top-2 -right-2 flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-muted-gold rounded-full"
                animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
};
