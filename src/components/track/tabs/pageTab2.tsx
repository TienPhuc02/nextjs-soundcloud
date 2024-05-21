import {
  Box,
  Button,
  Grid,
  LinearProgress,
  LinearProgressProps,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useSession } from "next-auth/react";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
interface IPropsUploadPage {
  trackUpload: {
    fileName: string;
    percent: number;
    uploadedTrackName: string;
  };
}
interface INewTrack {
  title: string;
  description: string;
  trackUrl: string;
  imgUrl: string;
  category: string;
}
const UploadPage = (props: IPropsUploadPage) => {
  const { trackUpload } = props;

  const [info, setInfo] = useState<INewTrack>({
    title: "",
    description: "",
    trackUrl: "",
    imgUrl: "",
    category: "",
  });
  console.log(props.trackUpload);
  const category = [
    {
      value: "CHILL",
      label: "CHILL",
    },
    {
      value: "WORKOUT",
      label: "WORKOUT",
    },
    {
      value: "PARTY",
      label: "PARTY",
    },
  ];
  useEffect(() => {
    if (trackUpload && trackUpload.uploadedTrackName) {
      console.log(">> check track upload ", trackUpload);
      setInfo({
        ...info,
        trackUrl: trackUpload.uploadedTrackName,
      });
    }
  }, [trackUpload]);
  
  const [selectedCategory, setSelectedCategory] = useState("");

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  function LinearWithValueLabel(props: IPropsUploadPage) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={props.trackUpload.percent} />
      </Box>
    );
  }
  function InputFileUpload(props: any) {
    const { setInfo, info } = props;
    const { data: session } = useSession();
    const handleUpload = async (image: any) => {
      const formData = new FormData();
      formData.append("fileUpload", image);

      try {
        const res = await axios.post(
          "http://localhost:8000/api/v1/files/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
              target_type: "images",
            },
          }
        );
        console.log(res.data.data.fileName);
        setInfo({
          ...info,
          imgUrl: res.data.data.fileName,
        });
      } catch (error) {
        //@ts-ignore
        console.log(error?.response?.data);
      }
    };
    return (
      <Button
        onChange={(e) => {
          const event = e.target as HTMLInputElement;
          if (event.files) {
            console.log("check files", event.files[0]);
            handleUpload(event.files[0]);
          }
        }}
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
    );
  }
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
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleSubmitForm = () => {
    console.log("check info", info);
  };
  return (
    <>
      <div>
        <div>{props.trackUpload.fileName}</div>

        <LinearWithValueLabel trackUpload={props.trackUpload} />
      </div>

      <Grid container spacing={2} mt={5}>
        <Grid
          item
          xs={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ height: 250, width: 250, background: "#ccc" }}>
            <div>
              {info.imgUrl && (
                <img
                  height={250}
                  width={250}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imgUrl}`}
                />
              )}
            </div>
          </div>
          <div>
            <InputFileUpload setInfo={setInfo} info={info} />
          </div>
        </Grid>
        <Grid item xs={6} md={8}>
          <TextField
            name="title"
            value={info?.title}
            onChange={(e) =>
              setInfo({
                ...info,
                title: e.target.value,
              })
            }
            label="Title"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            name="description"
            value={info?.description}
            onChange={(e) =>
              setInfo({
                ...info,
                description: e.target.value,
              })
            }
            label="Description"
            variant="standard"
            fullWidth
            margin="dense"
          />
          <TextField
            name="category"
            value={info?.category}
            onChange={(e) =>
              setInfo({
                ...info,
                category: e.target.value,
              })
            }
            sx={{
              mt: 3,
            }}
            select
            label="Category"
            fullWidth
            variant="standard"
            // value={selectedCategory}
            // onChange={handleCategoryChange}
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="outlined"
            sx={{
              mt: 5,
            }}
            onClick={handleSubmitForm}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadPage;
