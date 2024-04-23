import { useWavesurfer } from "@/utils/customHook";
import { useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";
import "./wave.scss";
import { time } from "console";
const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState<string>("0:00");
  const [duration, setDuration] = useState<string>("0:00");
  const hoverRef = useRef<HTMLDivElement>(null);
  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    let gradient;
    let progressGradient;
    if (typeof window !== "undefined") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
    }

    // Define the waveform gradient
    gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)!;
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // Define the progress gradient
    progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)!;
    progressGradient.addColorStop(0, "#EE772F"); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7) / canvas.height,
      "#EB4926"
    ); // Top color
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 1) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 2) / canvas.height,
      "#ffffff"
    ); // White line
    progressGradient.addColorStop(
      (canvas.height * 0.7 + 3) / canvas.height,
      "#F6B094"
    ); // Bottom color
    progressGradient.addColorStop(1, "#F6B094"); // Bottom color

    return {
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 2,
      height: 150,
      url: `/api?audio=${fileName}`,
    };
  }, []);
  const wavesurfer = useWavesurfer(containerRef, optionsMemo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  useEffect(() => {
    if (!wavesurfer) {
      return;
    }
    setIsPlaying(false);
    const hover = hoverRef.current!;
    const waveform = containerRef.current!;
    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );
    const subscription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("decode", (duration) => {
        setDuration(formatTime(duration));
      }),
      wavesurfer.on("timeupdate", (currentTime) => {
        setTime(formatTime(currentTime));
      }),
    ];
    return () => {
      subscription.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);
  const onPlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer?.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
  return (
    <div style={{ marginTop: 50 }}>
      <div ref={containerRef} 
      //co the lam voi ref
      className="wave-form-container">
        <div className="time">{time}</div>
        <div className="duration" id="duration">
          {duration}
        </div>
        <div ref={hoverRef} className="hover-wave"></div>
      </div>
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default WaveTrack;
