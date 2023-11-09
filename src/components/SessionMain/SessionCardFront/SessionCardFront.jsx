import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SESSION_VIEW } from "../../../utils/constants";
import EditIcon from "@mui/icons-material/Edit";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import {
  Button,
  Box,
  Container,
  Stack,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import { MainBox, NameBox, DetailBox } from "../../../utils/boxThemes";
import "../SessionMain.css";

const SessionCardFront = () => {
  const session = useSelector((state) => state.session.tricks);
  const trickDetail = useSelector((state) => state.session.trickDetail);
  const currentTrickIndex = useSelector(
    (state) => state.session.currentTrickIndex
  );
  const dispatch = useDispatch();
  const [note, setNote] = useState("");
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [nameDialogOpen, setNameDialogOpen] = useState(false);

  const setCurrentView = (view) => {
    dispatch({ type: "SET_SESSION_VIEW", payload: view });
  };

  const openVideo = (url) => {
    window.open(url, "_blank");
  };

  const updateTrickNote = (currentTrickIndex) => {
    setNote(session[currentTrickIndex].note || "");
    setNoteDialogOpen(true);
  };

  const handleConfirmDialog = () => {
    const trickId = session[currentTrickIndex].trick_id;
    const trickNote = {
      trick_id: trickId,
      note: note,
    };
    dispatch({ type: "UPDATE_TRICK_NOTE", payload: trickNote });
    setNoteDialogOpen(false);
  };

  return (
    <Container variant="default">
      <MainBox>
        <Stack>
          <NameBox className="NameBox" onClick={() => setNameDialogOpen(true)}>
            <h2>{trickDetail.name}</h2>
          </NameBox>
          <DetailBox onClick={() => setDetailDialogOpen(true)}>
            <h2 className="DetailBox">{trickDetail.description}</h2>
          </DetailBox>
          <h3>
            Notes:{" "}
            {session[currentTrickIndex]
              ? session[currentTrickIndex].note
                ? session[currentTrickIndex].note
                : "No notes yet"
              : "Loading..."}
          </h3>
          <Button onClick={() => updateTrickNote(currentTrickIndex)}>
            Edit Notes{" "}
            <EditIcon
              sx={{
                marginLeft: "5px",
                position: "relative",
                top: "-1px",
              }}
            />
          </Button>
          <Button onClick={() => openVideo(trickDetail.video_url)}>
            Play Video
            <SmartDisplayIcon
              sx={{
                marginLeft: "5px",
                position: "relative",
                top: "-1px",
              }}
            />
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
            onClick={() => setCurrentView(SESSION_VIEW.BACK)}
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

      <Dialog
        open={noteDialogOpen}
        onClose={() => setNoteDialogOpen(false)}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
        }}
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "black",
            p: 2,
          }}
        >
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="outlined-required"
              label="Note"
              type="text"
              fullWidth
              variant="standard"
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmDialog}>OK</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        fullWidth={true}
        open={nameDialogOpen}
        onClose={() => setNameDialogOpen(false)}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "black",
            p: 2,
          }}
        >
          <DialogContent>
            <DialogContentText style={{ color: "black" }}>
              {trickDetail.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={() => setNameDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        fullWidth={true}
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
      >
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "black",
            p: 2,
          }}
        >
          <DialogContent>
            <DialogContentText style={{ color: "black" }}>
              {trickDetail.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};

export default SessionCardFront;
