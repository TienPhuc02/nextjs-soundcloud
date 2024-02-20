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

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
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
    const subscription = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
      wavesurfer.on("play", () => setIsPlaying(true)),
    ];
    return () => {
      subscription.forEach((unsub)=>unsub());
    };
  }, [wavesurfer]);
  const onPlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer?.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);
  return (
    <div>
      <div ref={containerRef}>WaveTrack</div>
      <button onClick={onPlayPause}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default WaveTrack;
