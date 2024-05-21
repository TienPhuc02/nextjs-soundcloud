"use client";
import { useDropzone, FileWithPath } from "react-dropzone";
import "./upload.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback, useState } from "react";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { useSession } from "next-auth/react";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload() {
  return (
    <Button
      onClick={(event) => event.preventDefault()}
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

interface IProps {
  setValue: (v: number) => void;
  setTrackUpload: any;
  trackUpload: any;
}

const PageTab1 = (props: IProps) => {
  const { trackUpload } = props;
  const { data: session } = useSession();
  //useMemo => variable
  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      if (acceptedFiles && acceptedFiles[0]) {
        props.setValue(1);
        const audio = acceptedFiles[0];
        const formData = new FormData();
        formData.append("fileUpload", audio);
        try {
          const res = await axios.post(
            "http://localhost:8000/api/v1/files/upload",
            formData,
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
                target_type: "tracks",
                delay: 5000,
              },
              onUploadProgress: (progressEvent) => {
                let percentCompleted = Math.floor(
                  (progressEvent.loaded * 100) / progressEvent.total!
                );

                props.setTrackUpload({
                  ...trackUpload,
                  fileName: acceptedFiles[0].name,
                  percent: percentCompleted,
                });
              },
            }
          );
          props.setTrackUpload((prevState: any) => ({
            ...prevState,
            uploadedTrackName: res.data.data.fileName,
          }));
        } catch (error) {
          //@ts-ignore
          alert(error?.response?.data?.message);
        }
      }
    },
    [session]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/mp4": [".mp4"],
      "audio/wav": [".wav"],
      "audio/x-m4a": [".m4a"],
    },
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Click hoặc Drag/Drop để upload file track!</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

export default PageTab1;
