"use client";
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import { TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

dayjs.extend(relativeTime);

interface ITrackCommentProps {
  comments: ITrackComment[];
  track: ITrackTop | null;
}

const formatSecondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const CommentTrack = ({ comments, track }: ITrackCommentProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("check comments", comments);
  console.log("check track", track);
  const [yourComment, setYourComment] = useState("");
  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<ITrackComment>>({
      url: `http://localhost:8000/api/v1/comments`,
      method: "POST",
      body: {
        content: yourComment,
        moment: 10,
        track: track?._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    if (res.data) {
      setYourComment("");
      router.refresh();
    }
  };
  return (
    <>
      <div className="comment-container" style={{ marginTop: "50px" }}>
        <div className="input-comment">
          <TextField
            id="standard-basic"
            style={{ width: "100%" }}
            label="Comment"
            variant="standard"
            value={yourComment}
            onChange={(e) => setYourComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </div>
        <div
          className="content-comment"
          style={{
            width: "100%",
            marginTop: "50px",
            display: "flex",
            gap: "40px",
          }}
        >
          <div
            className="info-tus"
            style={{
              width: "20%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={fetchDefaultImages(track?.uploader.type as string)}
              alt=""
              width={150}
            />
            <p>{track?.uploader.name}</p>
          </div>
          <div
            className="list-comment"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {comments &&
              comments.map((comment) => {
                return (
                  <div
                    className="item-comment"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                    key={comment.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={fetchDefaultImages(comment.user?.type as string)}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div
                        style={{ display: "flex", flexDirection: "column" }}
                        className="name-comment"
                      >
                        <div style={{ opacity: 0.3 }}>
                          <span style={{ marginRight: "10px" }}>
                            {comment?.user?.email as string}
                          </span>
                          <span style={{ cursor: "pointer" }}>
                            at {formatSecondsToTime(comment.moment)}
                          </span>
                        </div>
                        <div>{comment.content}</div>
                      </div>
                    </div>
                    <div style={{ opacity: 0.3 }}>
                      {dayjs(comment.createdAt).fromNow()}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentTrack;
