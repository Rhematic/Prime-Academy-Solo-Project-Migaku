import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ATTEMPTS } from "../../../utils/constants";
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  Stack,
  Box,
} from "@mui/material";
import { MainBox } from "../../../utils/boxThemes";
import { ReactComponent as SaveIcon } from "../../../utils/archive-register.svg";
import TitleBoxSessionSummary from "../TitleBoxSessionSummary.jsx";
import LoadingView from "../../LoadingView/LoadingView";

const SessionSummaryView = () => {
  const session = useSelector((state) => state.session.tricks);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const saveSession = async () => {
    dispatch({ type: "START_LOADING" });
    dispatch({ type: "UPDATE_SESSION_DATA", payload: session });
    dispatch({ type: "CLEAR_TRICKS" });
    dispatch({ type: "CLEAR_CURRENT_TRICK_INDEX" });
  };

  if (loading) {
    return <LoadingView />;
  } else {
    return (
      <Container variant="default">
        <MainBox>
          <Stack>
            <TitleBoxSessionSummary />

            <TableContainer
              sx={{
                maxHeight: "40vh",
                overflow: "auto",
              }}
            >
              <Table
                sx={{ minWidth: 300 }}
                size="small"
                aria-label="a dense table"
                stickyHeader
              >
                <TableHead>
                  <TableRow align="center">
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Trick Name</TableCell>
                    <TableCell align="center">Attempts to Land</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {session.map((trick, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(54, 214, 94, 0.5)"
                            : "rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{trick.name}</TableCell>
                      <TableCell align="center">
                        {ATTEMPTS[trick.mastery_level]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Button
              variant="flipcard"
              onClick={() => {
                saveSession();
              }}
            >
              <span style={{ marginRight: "5px" }}>Save Session</span>
              <SaveIcon />
            </Button>
          </Box>
        </MainBox>
      </Container>
    );
  }
};

export default SessionSummaryView;
