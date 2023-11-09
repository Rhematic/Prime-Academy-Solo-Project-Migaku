import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../RegisterForm/RegisterForm";
import LogoMain from "../../LogoMain/LogoMain";
import { Button, Container, Stack } from "@mui/material";

function RegisterPage() {
  const dispatch = useDispatch();

  const switchView = () => {
    dispatch({ type: "SET_ACCESS_VIEW", payload: "LOGIN" });
  };
  return (
    <Container>
      <Stack alignItems="center">
        <LogoMain />
        <RegisterForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              switchView();
            }}
          >
            Login
          </button>
        </center>
      </Stack>
    </Container>
  );
}

export default RegisterPage;
