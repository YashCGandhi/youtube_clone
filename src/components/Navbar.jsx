import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
// import { useState } from "react";

import menu from "../utils/menu.png";
import logo from "../utils/youtube.png";
import SearchBar from "./SearchBar";

const Navbar = ({ setHamburger, hamburger }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          // className="hamburger-btn"
          src={menu}
          alt="menu"
          height={25}
          style={{ marginRight: "24px", marginLeft: "12px" }}
          onClick={(e) => {
            e.preventDefault();
            setHamburger(!hamburger);
            console.log(hamburger);
          }}
        />
        <img src={logo} alt="logo" height={32} />
        <Typography color="#fff" variant="h6" marginLeft="8px">
          {"Youtube"}
        </Typography>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
