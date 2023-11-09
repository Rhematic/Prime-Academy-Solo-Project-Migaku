import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../LoginForm/LoginForm";
import LogoMain from "../../LogoMain/LogoMain";
import { Button, Container, Stack } from "@mui/material";

function LoginPage() {
  const dispatch = useDispatch();

  const switchView = () => {
    dispatch({ type: "SET_ACCESS_VIEW", payload: "REGISTER" });
  };

  return (
    <Container>
      <Stack alignItems="center">
        <LogoMain />
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              switchView();
            }}
          >
            Register
          </button>
        </center>
      </Stack>
    </Container>
  );
}

export default LoginPage;
