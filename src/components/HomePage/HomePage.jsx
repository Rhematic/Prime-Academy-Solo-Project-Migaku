import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoMain from "../LogoMain/LogoMain";
import { Button, Container, Box, Stack } from "@mui/material";
import { MainBox, TitleBox } from "../../utils/boxThemes";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Container variant="default">
      <MainBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <LogOutButton sx={{ alignSelf: "flex-end" }} />
        </Box>
        <LogoMain />
        <TitleBox>
          <h4>Welcome, {user.username}!</h4>
        </TitleBox>
        <Stack>
          <Button
            variant="default"
            onClick={() => {
              dispatch({ type: "SET_SESSION_VIEW", payload: "FRONT" });
              history.push("/session");
            }}
          >
            Start Session
          </Button>
          <Button
            variant="default"
            onClick={() => {
              dispatch({ type: "FETCH_USER" });
              history.push("/profile");
            }}
          >
            View Profile
          </Button>
          <Button variant="default" onClick={() => history.push("/about")}>
            About Migaku
          </Button>
        </Stack>
      </MainBox>
    </Container>
  );
}

export default HomePage;
