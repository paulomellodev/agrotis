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
        boxShadow: 1,
        backgroundColor: "#fff",
      }}
    >
      <img
        src={agrotisLogo}
        alt="Logo Agrotis"
        style={{
          height: "25px",
          margin: "5px",
        }}
      />
    </Box>
  );
};

export default Header;
