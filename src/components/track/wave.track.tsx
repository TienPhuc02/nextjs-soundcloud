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
const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    // Define the waveform gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)!;
    gradient.addColorStop(0, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
    gradient.addColorStop(1, "#B1B1B1"); // Bottom color

    // Define the progress gradient
    const progressGradient = ctx.createLinearGradient(
      0,
      0,
      0,
      canvas.height * 1.35
    )!;
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
    const timeEl = document.querySelector("#time")!;
    const durationEl = document.querySelector("#duration")!;
    const hover = document.querySelector("#hover") as HTMLElement;
    const waveform = containerRef.current!;
    waveform.addEventListener(
      "pointermove",
      (e) => (hover.style.width = `${e.offsetX}px`)
    );
    const subscription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on(
        "decode",
        (duration) => (durationEl.textContent = formatTime(duration))
      ),
      wavesurfer.on(
        "timeupdate",
        (currentTime) => (timeEl.textContent = formatTime(currentTime))
      ),
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
      <div ref={containerRef} className="wave-form-container">
        <div id="time">0:00</div>
        <div id="duration">0:00</div>
        <div id="hover"></div>
      </div>
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default WaveTrack;
