import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { MainBox, PlainBox } from "../../../utils/boxThemes";
import TitleBoxSessionSummary from "../TitleBoxSessionSummary.jsx";

const SessionResultView = () => {
  const history = useHistory();
  const netProficiency = useSelector((state) => state.session.proficiency);
  const userProficiencyLevel = useSelector(
    (state) => state.user.proficiency_level
  );

  const dispatch = useDispatch();

  return (
    <Container variant="default">
      <MainBox>
        <TitleBoxSessionSummary />

        <PlainBox>
          <h3>
            Proficiency:
            {Number(netProficiency) > 0 ? (
              <span style={{ color: "green" }}>
                {" "}
                +{Number(netProficiency).toFixed(2)}
              </span>
            ) : (
              <span style={{ color: "red" }}>
                {" "}
                {Number(netProficiency).toFixed(2)}
              </span>
            )}
          </h3>

          <h3>
            Updated Proficiency Level: {Number(userProficiencyLevel).toFixed(2)}
          </h3>
        </PlainBox>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Button variant="flipcard" onClick={() => history.push("/")}>
            <span style={{ marginRight: "5px" }}>Return Home</span>
            <HomeIcon
              sx={{
                marginLeft: "5px",
                fontSize: "1.2rem",
                position: "relative",
                top: "-1px",
              }}
            />
          </Button>
        </Box>
      </MainBox>
    </Container>
  );
};

export default SessionResultView;
