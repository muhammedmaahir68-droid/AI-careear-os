import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Square, Mic, MicOff, Gauge, Sparkles } from "lucide-react";
import { aiVoiceTutor } from "../services/aiVoiceTutor";

interface Props {
  textToRead?: string;
  label?: string;
  onVoiceInput?: (text: string) => void;
  className?: string;
}

export default function AIVoiceTutorBar({ textToRead, label = "AI Voice Tutor", onVoiceInput, className = "" }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [isListening, setIsListening] = useState(false);
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);

  useEffect(() => {
    const unsub = aiVoiceTutor.subscribe(state => {
      setIsSpeaking(state.isSpeaking);
      setIsPaused(state.isPaused);
    });
    return () => { unsub(); };
  }, []);

  const handlePlayToggle = () => {
    if (isSpeaking) {
      if (isPaused) {
        aiVoiceTutor.resume();
      } else {
        aiVoiceTutor.pause();
      }
    } else if (textToRead) {
      aiVoiceTutor.speak(textToRead);
    }
  };

  const handleStop = () => {
    aiVoiceTutor.stop();
  };

  const handleSpeedChange = () => {
    const speeds = [0.85, 1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(rate) + 1) % speeds.length;
    const nextRate = speeds[nextIdx];
    setRate(nextRate);
    aiVoiceTutor.setRate(nextRate);
    if (isSpeaking && textToRead) {
      aiVoiceTutor.speak(textToRead);
    }
  };

  const handleMicToggle = () => {
    if (isListening) {
      stopListeningFn?.();
      setIsListening(false);
      setStopListeningFn(null);
    } else {
      setIsListening(true);
      const stopFn = aiVoiceTutor.listen(
        (transcript) => {
          setIsListening(false);
          setStopListeningFn(null);
          onVoiceInput?.(transcript);
        },
        (err) => {
          setIsListening(false);
          setStopListeningFn(null);
          console.warn(err);
        }
      );
      setStopListeningFn(() => stopFn);
    }
  };

  return (
    <div className={`p-3 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-blue-950/60 border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg ${className}`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isSpeaking ? "bg-purple-600 text-white animate-pulse" : "bg-purple-500/20 text-purple-300"}`}>
          <Volume2 size={16} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground">{label}</span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
              {isSpeaking ? (isPaused ? "Paused" : "Speaking...") : "Audio Mode"}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">Audio tutor for easy hands-free listening & understanding</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayToggle}
          disabled={!textToRead}
          className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
        >
          {isSpeaking && !isPaused ? <><Pause size={13} /> Pause</> : <><Play size={13} fill="currentColor" /> {isPaused ? "Resume" : "Listen Aloud"}</>}
        </button>

        {/* Stop Button */}
        {isSpeaking && (
          <button
            onClick={handleStop}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Stop Speech"
          >
            <Square size={13} fill="currentColor" />
          </button>
        )}

        {/* Speed Selector */}
        <button
          onClick={handleSpeedChange}
          className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-[11px] font-bold text-slate-200 flex items-center gap-1 transition-colors"
          title="Voice Speed"
        >
          <Gauge size={12} className="text-purple-400" />
          <span>{rate}x</span>
        </button>

        {/* Mic Voice Input */}
        {onVoiceInput && (
          <button
            onClick={handleMicToggle}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isListening
                ? "bg-red-500 text-white animate-bounce shadow-lg shadow-red-500/40"
                : "bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300"
            }`}
            title="Ask question by voice"
          >
            {isListening ? <><MicOff size={13} /> Listening...</> : <><Mic size={13} /> Voice Ask</>}
          </button>
        )}
      </div>
    </div>
  );
}
