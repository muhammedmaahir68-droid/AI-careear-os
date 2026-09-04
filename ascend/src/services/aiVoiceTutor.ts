// AI Voice Tutor Service for CARVEX AI Career OS
// Provides Text-to-Speech (TTS) and Speech-to-Text (STT) capabilities

export interface VoiceTutorSettings {
  rate: number;      // 0.8 to 1.5
  pitch: number;     // 0.8 to 1.2
  voiceIndex: number;
  autoRead: boolean;
}

class AIVoiceTutorService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSpeakingState: boolean = false;
  private isPausedState: boolean = false;
  private listeners: Set<(state: { isSpeaking: boolean; isPaused: boolean; currentText: string }) => void> = new Set();
  private currentText: string = "";

  public settings: VoiceTutorSettings = {
    rate: 1.0,
    pitch: 1.0,
    voiceIndex: 0,
    autoRead: false
  };

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Prefer Indian English or natural English voices if available
    const preferredIndex = this.voices.findIndex(v =>
      v.lang.includes("en-IN") || v.name.includes("India") || v.name.includes("Natural") || v.name.includes("Google")
    );
    if (preferredIndex >= 0) {
      this.settings.voiceIndex = preferredIndex;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public subscribe(cb: (state: { isSpeaking: boolean; isPaused: boolean; currentText: string }) => void) {
    this.listeners.add(cb);
    cb({ isSpeaking: this.isSpeakingState, isPaused: this.isPausedState, currentText: this.currentText });
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach(cb => cb({
      isSpeaking: this.isSpeakingState,
      isPaused: this.isPausedState,
      currentText: this.currentText
    }));
  }

  // Clean raw markdown hashtags, code blocks, etc. before speaking aloud
  public cleanTextForSpeech(raw: string): string {
    return raw
      .replace(/#{1,6}\s*/g, "")                   // Remove markdown headers #, ##, ###
      .replace(/`{1,3}[\s\S]*?`{1,3}/g, " Code block omitted. ") // Skip long code
      .replace(/\*\*([^*]+)\*\*/g, "$1")           // Unbold
      .replace(/\*([^*]+)\*/g, "$1")               // Unitalic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")     // Links to plain text
      .replace(/[-*•]\s+/g, ". ")                  // Bullet points to pauses
      .replace(/\n+/g, ". ")                       // Newlines to pauses
      .replace(/\s+/g, " ")                        // Collapse whitespace
      .trim();
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.synth) return;
    this.stop();

    const cleaned = this.cleanTextForSpeech(text);
    if (!cleaned) return;

    this.currentText = cleaned;
    const utterance = new SpeechSynthesisUtterance(cleaned);
    this.currentUtterance = utterance;

    if (this.voices.length > 0 && this.voices[this.settings.voiceIndex]) {
      utterance.voice = this.voices[this.settings.voiceIndex];
    }

    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;

    utterance.onstart = () => {
      this.isSpeakingState = true;
      this.isPausedState = false;
      this.notify();
    };

    utterance.onpause = () => {
      this.isPausedState = true;
      this.notify();
    };

    utterance.onresume = () => {
      this.isPausedState = false;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.currentText = "";
      this.notify();
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.notify();
    };

    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.isSpeakingState && !this.isPausedState) {
      this.synth.pause();
      this.isPausedState = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.isPausedState) {
      this.synth.resume();
      this.isPausedState = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.isPausedState = false;
      this.currentText = "";
      this.notify();
    }
  }

  public setRate(rate: number) {
    this.settings.rate = Math.max(0.7, Math.min(2.0, rate));
  }

  public setVoice(index: number) {
    if (index >= 0 && index < this.voices.length) {
      this.settings.voiceIndex = index;
    }
  }

  // Voice Input (Speech-to-Text)
  public listen(onResult: (transcript: string) => void, onError?: (err: string) => void): () => void {
    if (typeof window === "undefined") return () => {};

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      onError?.("Speech recognition not supported in this browser. Please use Chrome/Edge.");
      return () => {};
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        onError?.(event.error || "Speech recognition error");
      };

      recognition.start();
      return () => {
        try { recognition.stop(); } catch (e) {}
      };
    } catch (e: any) {
      onError?.(e.message || "Could not start voice recognition");
      return () => {};
    }
  }
}

export const aiVoiceTutor = new AIVoiceTutorService();
