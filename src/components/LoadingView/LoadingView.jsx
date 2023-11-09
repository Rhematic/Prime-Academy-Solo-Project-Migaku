import React from "react";
import "./LoadingView.css";
import { Stack, Container, Box } from "@mui/material/";
import { MainBox, PlainBox } from "../../utils/boxThemes";

const LoadingView = () => {
  return (
    <>
      <Container variant="default">
        <MainBox>
          <PlainBox>
            <Stack>
              <img
                src="/images/kendama_loading.png"
                alt="Kendama"
                className="spin"
              />
              <h1> Loading... </h1>
            </Stack>
          </PlainBox>
        </MainBox>
      </Container>
    </>
  );
};

export default LoadingView;
