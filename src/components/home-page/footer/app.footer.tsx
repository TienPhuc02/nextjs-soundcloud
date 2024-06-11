"use client";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
const Footer = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>; //fragment
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
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
            layout="horizontal-reverse"
            // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
            volume={0.5}
            style={{ boxShadow: "unset", backgroundColor: "#f2f2f2" }}
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
            <div style={{ color: "#ccc" }}>Phuc</div>
            <div style={{ color: "black" }}>Who am I ?</div>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default Footer;
