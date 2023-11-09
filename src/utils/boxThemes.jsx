import { Box } from "@mui/material";

export const MainBox = (props) => (
  <Box
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      border: 2,
      borderRadius: 2,
      bgcolor: "#ffffff",
      width: "100%",
      height: "80vh",
      p: 2,
      marginTop: "50px",
      marginLeft: "auto",
      marginRight: "auto",
      ...props.sx,
    }}
  />
);

export const TitleBox = (props) => (
  <Box
    {...props}
    sx={{
      bgcolor: "#ffdbb8",
      border: 1,
      borderColor: "#000000",
      fontSize: 18,
      fontWeight: "bold",
      width: "95%",
      // height: "10%",
      p: 1,
      mb: 1,
      mt: 2,
      borderRadius: 2,
      textAlign: "center",
      ...props.sx,
    }}
  />
);

export const NameBox = (props) => (
  <Box
    {...props}
    sx={{
      bgcolor: "#ffdbb8",
      border: 1,
      borderColor: "#000000",
      width: "95%",
      height: "90%",
      textAlign: "center",
      p: 1,
      mb: 1,
      mt: 2,
      borderRadius: 2,
    }}
  />
);

export const DetailBox = (props) => (
  <Box
    {...props}
    sx={{
      bgcolor: "#ffdbb8",
      border: 1,
      borderColor: "#000000",
      width: "95%",
      height: "90%",
      p: 1,
      mb: 1,
      mt: 2,
      borderRadius: 2,
    }}
  />
);

export const PlainBox = (props) => (
  <Box
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "95%",
      height: "100%",
      textAlign: "center",
      ...props.sx,
    }}
  />
);
