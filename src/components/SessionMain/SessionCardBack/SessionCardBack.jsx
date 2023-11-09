import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SESSION_VIEW } from "../../../utils/constants";
import { Button, Container, Stack, Box } from "@mui/material";
import { MainBox, TitleBox } from "../../../utils/boxThemes";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

const SessionCardBack = () => {
  const session = useSelector((state) => state.session.tricks);
  const trickDetail = useSelector((state) => state.session.trickDetail);
  const view = useSelector((state) => state.session.view);
  const currentTrickIndex = useSelector(
    (state) => state.session.currentTrickIndex
  );
  const dispatch = useDispatch();

  const setCurrentView = (view) => {
    dispatch({ type: "SET_SESSION_VIEW", payload: view });
  };

  // useEffect(() => {
  //   console.log(session);
  // }, [session]);

  const MASTERY = {
    ALWAYS: { mastery_level: 5, session_countdown: 5 },
    GENERALLY: { mastery_level: 4, session_countdown: 4 },
    SOMETIMES: { mastery_level: 3, session_countdown: 3 },
    RARELY: { mastery_level: 2, session_countdown: 2 },
    ONLY_ONCE: { mastery_level: 1, session_countdown: 1 },
    IMPOSSIBLE: { mastery_level: 0, session_countdown: 0 },
  };

  const updateTrickRecord = (mastery) => {
    // console.log("updateTrickRecord");
    const trickId = session[currentTrickIndex].trick_id;
    const trickRecord = {
      trick_id: trickId,
      mastery_level: mastery.mastery_level,
      session_countdown: mastery.session_countdown,
    };
    dispatch({ type: "UPDATE_TRICK_MASTERY", payload: trickRecord });

    if (currentTrickIndex === session.length - 1) {
      setCurrentView(SESSION_VIEW.SUMMARY);
      return;
    }

    dispatch({
      type: "SET_CURRENT_TRICK_INDEX",
      payload: currentTrickIndex + 1,
    });

    // console.log("currentTrickIndex", currentTrickIndex);
    setCurrentView(SESSION_VIEW.FRONT);
  };

  return (
    <Container variant="default">
      <MainBox>
        <TitleBox>
          <h2>Record Number of Attempts</h2>
        </TitleBox>
        <Stack
          // spread out items evenly
          spacing={3}
          direction="column"
          justifyContent="center"
        >
          <Button
            variant="cardback"
            onClick={() => updateTrickRecord(MASTERY.ALWAYS)}
          >
            1-2
          </Button>
          <Button
            variant="cardback"
            onClick={() => updateTrickRecord(MASTERY.GENERALLY)}
          >
            3-4
          </Button>
          <Button
            variant="cardback"
            onClick={() => updateTrickRecord(MASTERY.SOMETIMES)}
          >
            5-6
          </Button>
          <Button
            variant="cardback"
            onClick={() => updateTrickRecord(MASTERY.RARELY)}
          >
            7-8
          </Button>
          <Button
            variant="cardback"
            onClick={() => updateTrickRecord(MASTERY.ONLY_ONCE)}
          >
            9-10
          </Button>
          <Button
            variant="cardback"
            onClick={() => updateTrickRecord(MASTERY.IMPOSSIBLE)}
          >
            11+
          </Button>
        </Stack>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Button
            variant="flipcard"
            onClick={() => setCurrentView(SESSION_VIEW.FRONT)}
          >
            Flip Card
            <ReplyAllIcon
              sx={{
                marginLeft: "5px",
                transform: "scaleX(-1)",
                position: "relative",
                top: "-1px",
              }}
            />
          </Button>
        </Box>
      </MainBox>
      {/* <button onClick={() => setCurrentView(SESSION_VIEW.SUMMARY)}>
        Next Trick
      </button> */}
    </Container>
  );
};

export default SessionCardBack;
