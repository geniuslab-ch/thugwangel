'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

interface AudioPlayerProps {
  tracks: Track[];
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  // const progressBarRef = useRef<HTMLInputElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackEnded = () => {
    handleNext();
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    // Auto-play next track if already playing
  };

  const handlePrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
        // If more than 3 seconds in, restart the song
        audioRef.current.currentTime = 0;
    } else {
        // Otherwise go to previous track
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-black/80 border border-primary/30 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnded}
        onLoadedMetadata={handleTimeUpdate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Column: Controls & Info */}
        <div className="p-6 md:p-8 flex flex-col justify-between h-full border-b md:border-b-0 md:border-r border-white/5">
            <div>
                {/* Track Info */}
                <div className="flex flex-row items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-black border border-accent/20 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                        <Music className="w-10 h-10 text-accent/50 animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-1 truncate">{currentTrack.title}</h3>
                        <p className="text-accent uppercase tracking-widest text-xs">{currentTrack.artist}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-accent hover:accent-primary transition-colors"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div>
                <div className="flex items-center justify-center gap-6 mb-6">
                    <button
                        onClick={handlePrev}
                        className="text-gray-400 hover:text-white transition-colors p-2"
                        aria-label="Previous Track"
                    >
                        <SkipBack size={24} />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-red-900 transition-colors shadow-lg shadow-primary/30 border border-accent/20"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                    </button>

                    <button
                        onClick={handleNext}
                        className="text-gray-400 hover:text-white transition-colors p-2"
                        aria-label="Next Track"
                    >
                        <SkipForward size={24} />
                    </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-accent transition-colors">
                        {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-500 hover:accent-white"
                    />
                </div>
            </div>
        </div>

        {/* Right Column: Playlist */}
        <div className="bg-black/20 p-4 max-h-[400px] overflow-y-auto custom-scrollbar flex flex-col">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2 sticky top-0 bg-black/80 backdrop-blur-md py-2 z-10">Playlist</h4>
              <div className="space-y-1 flex-1">
                {tracks.map((track, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentTrackIndex(index)}
                        className={`w-full text-left px-3 py-3 rounded-md flex items-center justify-between group transition-colors ${
                            index === currentTrackIndex
                            ? 'bg-primary/10 text-accent border border-primary/20'
                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span className="text-xs w-4 font-mono opacity-50 flex-shrink-0">{(index + 1).toString().padStart(2, '0')}</span>
                            <span className="font-medium text-sm truncate">{track.title}</span>
                        </div>
                        {index === currentTrackIndex && isPlaying && (
                            <div className="flex gap-0.5 items-end h-3 flex-shrink-0 ml-2">
                                <div className="w-0.5 bg-accent h-full animate-[music-bar_0.5s_ease-in-out_infinite]"></div>
                                <div className="w-0.5 bg-accent h-2/3 animate-[music-bar_0.6s_ease-in-out_infinite]"></div>
                                <div className="w-0.5 bg-accent h-1/2 animate-[music-bar_0.7s_ease-in-out_infinite]"></div>
                            </div>
                        )}
                    </button>
                ))}
              </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes music-bar {
            0%, 100% { transform: scaleY(0.5); }
            50% { transform: scaleY(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
