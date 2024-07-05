"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Link from "next/link";
import { convertSlugURL } from "@/utils/api";
interface IProps {
  data: ITrackTop[];
  title: string;
}
const MainSlider = (props: IProps) => {
  // console.log("🚀 ~ MainSlider ~ props:", props.data);
  const NextArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          backgroundColor: "#f2f2f2",
          color: "black",
          border: "unset",
          right: 0,
          top: "30%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
          ":hover": {
            border: "unset",
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };

  const PrevArrow = (props: any) => {
    return (
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "30%",
          backgroundColor: "#f2f2f2",
          color: "black",
          border: "unset",
          zIndex: 2,
          minWidth: 30,
          width: 35,
          ":hover": {
            border: "unset",
            backgroundColor: "#f2f2f2",
          },
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  //box === div
  return (
    <Box
      sx={{
        margin: "0 50px",
        ".track-item": {
          padding: "0 10px",
        },
        h3: {
          border: "1px solid #ccc",
          padding: "20px",
          height: "200px",
        },
        // img: {
        //   height: "200px",
        //   width: "100px",
        // },
      }}
    >
      <h2> {props.title} </h2>

      <Slider {...settings}>
        {props.data.map((track) => {
          return (
            <div className="track-item" key={track._id}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                width={200}
                height={200}
                alt="Picture of the author"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "20px",
                }}
              >
                <Link
                  href={`/track/${convertSlugURL(track.title)}-${
                    track._id
                  }.html?audio=${track.trackUrl}`}
                >
                  <span
                    style={{
                      color: "#958f8f",
                      textDecoration: "unset",
                      // color: "unset",
                    }}
                  >
                    {track.title}
                  </span>
                </Link>
                <span style={{ color: "black", fontWeight: "bold" }}>
                  {track.description}
                </span>
              </div>
            </div>
          );
        })}
      </Slider>
      <Divider />
    </Box>
  );
};

export default MainSlider;
