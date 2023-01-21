import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

const SideBar = ({ selectedCategory, setSelectedCategory, hamburger }) => (
  <Stack
    direction="row"
    sx={{
      overflow: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
      position: "sticky",
    }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        display="flex"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#0E0D0D",
          color: "white",
        }}
        key={category.name}
      >
        <span
          style={{
            color: "white",
            opacity: category.name === selectedCategory ? "1" : "0.7",
            marginRight: "15px",
          }}
        >
          {category.icon}
        </span>
        {hamburger ? (
          <span
            style={{
              opacity: category.name === selectedCategory ? "1" : "0.7",
              color: "white",
            }}
          >
            {category.name}
          </span>
        ) : null}
      </button>
    ))}
  </Stack>
);

export default SideBar;
