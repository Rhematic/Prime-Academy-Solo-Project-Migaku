const defaultTheme = {
  palette: {
    primary: {
      main: "#36d65e",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "default",
      },
      variants: [
        {
          props: { variant: "default" },
          style: {
            backgroundColor: "#36d65e",
            color: "#000000",
            border: "1px solid #000000",
            width: "180px",
            textAlign: "center",
          },
        },
        {
          props: { variant: "viewProfile" },
          style: {
            backgroundColor: "#36d65e",
            color: "#000000",
            border: "1px solid #000000",
            width: "140px",
            height: "35px",
            textAlign: "center",
          },
        },
        {
          props: { variant: "editProfile" },
          style: {
            backgroundColor: "#36d65e",
            color: "#000000",
            border: "1px solid #000000",
            width: "120px",
            height: "30px",
            textAlign: "center",
          },
        },
        {
          props: { variant: "cardback" },
          style: {
            backgroundColor: "#36d65e",
            color: "#000000",
            border: "1px solid #000000",
            width: "50%",
            height: "5vh",
            textAlign: "center",
          },
        },
        {
          props: { variant: "flipcard" },
          style: {
            backgroundColor: "#36d65e",
            color: "#000000",
            border: "1px solid #000000",
            width: "220px",
            textAlign: "center",

            "&:focus": {
              backgroundColor: "#36d65e",
            },
          },
        },
        {
          props: { variant: "logout" },
          style: {
            color: "#000000",
            backgroundColor: "#FF887D",
            fontSize: ".6rem",
            fontWeight: "bold",
            border: "1.5px solid #000000",
            "&:hover": {
              backgroundColor: "#fff",
            },
          },
        },
        {
          props: { variant: "deleteAccount" },
          style: {
            color: "#000000",
            backgroundColor: "#FF887D",
            fontSize: ".7rem",
            fontWeight: "bold",
            border: "1.5px solid #000000",
            height: "30px",
            width: "165px",
            "&:hover": {
              backgroundColor: "#fff",
            },
          },
        },
      ],
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
      variants: [
        {
          props: { variant: "default" },
          style: {
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "top",
            backgroundImage: "url(/images/kendama_bg.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "25%",
            height: "100vh",
          },
        },
      ],
    },
    MuiStack: {
      defaultProps: {
        variant: "vertical",
        spacing: 2,
        mt: 1,
        alignItems: "center",
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          input: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {},
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#0E5E11",
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        color: "primary",
        variant: "filled",
        spacing: 2,
        mt: 1,
      },
    },
  },
};

// #36d65e

export default defaultTheme;
