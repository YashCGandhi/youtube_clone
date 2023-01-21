import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const postTime = (dateStr) => {
  const dateString = dateStr.split("T")[0];
  const date = dateString.split("-");
  const firstDate = new Date(
    parseInt(date[0], 10),
    parseInt(date[1], 10) - 1,
    parseInt(date[2], 10)
  );
  const secondDate = new Date();
  const dateDiff = secondDate.getTime() - firstDate.getTime();
  const converted = dateDiff / 1000 / 60 / 60 / 24;

  var uploaded;
  if (converted < 1) {
    uploaded = "few hours ago";
  } else if (converted > 1 && converted < 2) {
    uploaded = "1 day ago";
  } else if (converted > 2 && converted < 31) {
    var daysAgo = Math.floor(converted);
    uploaded = daysAgo + " days ago";
  } else if (converted > 31 && converted < 61) {
    uploaded = "1 month ago";
  } else if (converted > 61 && converted < 365) {
    var monthsAgo = Math.floor(converted / 31);
    uploaded = monthsAgo + " months ago";
  } else if (converted > 365 && converted < 730) {
    uploaded = "1 year ago";
  } else {
    var yearsAgo = Math.floor(converted / 31 / 12);
    uploaded = yearsAgo + " years ago";
  }

  return uploaded;
};

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  const [videoDetails, setvideoDetails] = useState([]);
  // const [channelDetail, setChannelDetail] = useState([]);
  // const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`).then((data) =>
      setvideoDetails(data.items[0])
    );

    // fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) =>
    //   setChannelDetail(data?.items[0])
    // );
  }, []);
  if (!videoDetails) return "Loading...";
  //console.log(videoDetails);
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
        <CardMedia
          image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
          alt={snippet?.title}
          sx={{ width: { xs: "100%", sm: "358px", md: "320px" }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#000", height: "106px" }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="#FFF"
            marginBottom="8px"
          >
            {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>
        </Link>
        <Link
          to={
            snippet?.channelId
              ? `/channel/${snippet?.channelId}`
              : demoChannelUrl
          }
        >
          <Typography variant="subtitle2" color="gray">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="gray">
          {videoDetails?.statistics?.viewCount?.toLocaleString() + " views | "}
          {snippet ? postTime(snippet.publishedAt) : null}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
