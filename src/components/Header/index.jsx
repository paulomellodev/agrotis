import { Box } from "@mui/material";
import agrotisLogo from "../../assets/agrotis.png";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        boxShadow: 3,
      }}
    >
      <img
        src={agrotisLogo}
        alt="Logo Agrotis"
        style={{
          height: "35px",
          margin: "5px",
        }}
      />
    </Box>
  );
};

export default Header;
