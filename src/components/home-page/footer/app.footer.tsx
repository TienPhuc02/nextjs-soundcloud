"use client";
import { TrackContext, useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Footer = () => {
  const playerRef = useRef(null);
  const hasMounted = useHasMounted();
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  useEffect(() => {
    if (currentTrack?.isPlaying === false) {
      //@ts-ignore
      playerRef?.current?.audio?.current?.pause();
    }
    if (currentTrack?.isPlaying === true) {
      //@ts-ignore
      playerRef?.current?.audio?.play();
    }
  }, [currentTrack]);
  if (!hasMounted) return <></>; //fragment
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  console.log("check currentTrack>>", currentTrack);
  // //@ts-ignore
  // if (currentTrack?.isPlaying) {
  //   //@ts-ignore
  //   console.log(playerRef?.current?.audio?.current?.play());
  // } else {
  //   //@ts-ignore
  //   console.log(playerRef?.current?.audio?.current?.pause());
  // }
  return (
    <div style={{ marginTop: 50 }}>
      <AppBar
        position="fixed"
        sx={{ top: "auto", bottom: 0, backgroundColor: "#f2f2f2" }}
      >
        <Container
          sx={{ display: "flex", gap: 10, ".rhap_main": { gap: "30px" } }}
        >
          <AudioPlayer
            ref={playerRef}
            layout="horizontal-reverse"
            // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            volume={0.5}
            style={{ boxShadow: "unset", backgroundColor: "#f2f2f2" }}
            onPlay={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: true });
            }}
            onPause={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: false });
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              minWidth: 100,
            }}
          >
            <div style={{ color: "#ccc" }}>{currentTrack.description}</div>
            <div style={{ color: "black" }}>{currentTrack.title}</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default Footer;
