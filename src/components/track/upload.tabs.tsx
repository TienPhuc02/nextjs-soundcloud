"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PageTab1 from "./tabs/pageTab1";
import UploadPage from "./tabs/pageTab2";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
type Props = {};
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UploadTabs = (props: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [trackUpload, setTrackUpload] = React.useState({
    fileName: "",
    percent: 0,
  });
  return (
    <div>
      <Box sx={{ width: "100%", border: "1px solid #ccc", mt: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Track" {...a11yProps(0)} />
            <Tab label="Basic Information" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PageTab1 setValue={setValue} setTrackUpload={setTrackUpload} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <UploadPage trackUpload={trackUpload} />
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default UploadTabs;
