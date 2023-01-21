import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Navbar, SideBar, Videos } from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [hamburger, setHamburger] = useState(false);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);
  //console.log(videos?.statistics);
  return (
    <>
      <Navbar setHamburger={setHamburger} hamburger={hamburger} />
      <Stack sx={{ flexDirection: "row" }}>
        <Box
          sx={{
            height: { sx: "auto", md: "92vh" },
            borderRight: "1px solid #3d3d3d",
            px: { sx: 0, md: 2 },
            width: hamburger ? "200px" : "50px",
          }}
        >
          <SideBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setHamburger={setHamburger}
            hamburger={hamburger}
          />
          <Typography
            className="copyright"
            variant="body2"
            sx={{ mt: 1.5, color: "#fff" }}
          >
            Copyright 2023 Yash Gandhi
          </Typography>
        </Box>
        <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "white" }}
          >
            {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
          </Typography>
          <Videos videos={videos} />
        </Box>
      </Stack>
    </>
  );
};

export default Feed;
