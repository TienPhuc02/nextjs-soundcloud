"use client";
import React, { useCallback } from "react";
import "./upload.css";
import { FileWithPath, useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { sendRequest, sendRequestFile } from "@/utils/api";
import { useSession } from "next-auth/react";
type Props = {};
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
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onClick={(event) => event.preventDefault()}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}
const PageTab1 = (props: Props) => {
  const { data: session } = useSession();
  //useMemo -> variable
  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      if (acceptedFiles && acceptedFiles[0]) {
        const audio = acceptedFiles[0];
        console.log(" check audio", audio);
        const formData = new FormData();
        formData.append("fileUpload", audio);
        const res = await sendRequestFile<IBackendRes<ITrackTop[]>>({
          url: "http://localhost:8000/api/v1/files/upload",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: "tracks",
          },
        });
        console.log(">> check accepted File ", audio);
        console.log(">> check session", session?.access_token);
        console.log("check res", res);
      }
    },
    [session]
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      audio: [".mp3", ".mp4", ".wav", ".m4a"],
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
        <p>Click or drap/drop track</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};
export default PageTab1;
