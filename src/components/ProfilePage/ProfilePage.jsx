import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoMain from "../LogoMain/LogoMain";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { MainBox, TitleBox } from "../../utils/boxThemes";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import { ReactComponent as SaveIcon } from "../../utils/archive-register.svg";
import CancelIcon from "@mui/icons-material/Cancel";

function InfoPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isEditMode, setIsEditMode] = useState(false);
  const [favoriteTrick, setFavoriteTrick] = useState(user.favorite_trick || "");
  const [favoriteKendama, setFavoriteKendama] = useState(
    user.favorite_kendama || ""
  );
  const [deleteConfirmUsername, setDeleteConfirmUsername] = useState("");

  const handleSubmit = () => {
    dispatch({
      type: "UPDATE_USER",
      payload: { id: user.id, favoriteTrick, favoriteKendama },
    });

    setIsEditMode(false);
  };

  const handleCancel = () => {
    setFavoriteTrick(user.favorite_trick || "");
    setFavoriteKendama(user.favorite_kendama || "");

    setIsEditMode(false);
  };

  useEffect(() => {
    if (deleteConfirmUsername === user.username) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (confirmDelete) {
        dispatch({ type: "DELETE_USER", payload: user.id });
        history.push("/access");
      }
    }
  }, [deleteConfirmUsername]);

  const proficiencyLevel = Math.round(user.proficiency_level * 100) / 100;

  return (
    <Container variant="default">
      <MainBox>
        <LogoMain />
        <Stack>
          <TitleBox>{user.username}'s Profile</TitleBox>
        </Stack>
        <h3>Proficiency Level: {proficiencyLevel}</h3>

        {isEditMode ? (
          <>
            <div style={{ marginBottom: "15px" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "transparent",
                  },
                }}
                required
                id="outlined-required"
                label="Favorite Trick"
                type="text"
                name="trick"
                value={favoriteTrick}
                onChange={(e) => setFavoriteTrick(e.target.value)}
              />
            </div>
            <div>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "transparent",
                  },
                }}
                required
                id="outlined-required"
                label="Favorite Kendama"
                type="text"
                name="kendama"
                value={favoriteKendama}
                onChange={(e) => setFavoriteKendama(e.target.value)}
              />
            </div>

            <Stack direction="row" spacing={2}>
              <Button variant="editProfile" onClick={handleSubmit}>
                <span style={{ marginRight: "10px" }}>Save</span>
                <SaveIcon style={{ height: "24px", width: "24px" }} />
              </Button>
              <Button variant="editProfile" onClick={handleCancel}>
                Cancel
                <CancelIcon
                  sx={{
                    marginLeft: "5px",
                    fontSize: "1.2rem",
                    position: "relative",
                    top: "-1px",
                  }}
                />
              </Button>
            </Stack>

            <Button
              variant="deleteAccount"
              onClick={() => {
                const inputUsername = window.prompt(
                  "Please enter your username to confirm account deletion."
                );
                setDeleteConfirmUsername(inputUsername);
              }}
            >
              Delete Account
              <DeleteForeverRoundedIcon
                sx={{
                  marginLeft: "5px",
                  fontSize: "1.2rem",
                  position: "relative",
                  top: "-1px",
                }}
              />
            </Button>
          </>
        ) : (
          <>
            <Stack alignItems="left">
              <h3>Favorite Trick: {user.favorite_trick}</h3>
              <h3>Favorite Kendama: {user.favorite_kendama}</h3>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="viewProfile"
                  onClick={() => setIsEditMode(true)}
                >
                  <span style={{ fontSize: "0.75rem" }}>Edit Profile</span>
                  <EditIcon
                    sx={{
                      marginLeft: "5px",
                      fontSize: "1.2rem",
                      position: "relative",
                      top: "-1px",
                    }}
                  />
                </Button>
                <Button
                  variant="viewProfile"
                  onClick={() => history.push("/home")}
                >
                  Home
                  <HomeIcon
                    sx={{
                      marginLeft: "5px",
                      fontSize: "1.2rem",
                      position: "relative",
                      top: "-1px",
                    }}
                  />
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </MainBox>
    </Container>
  );
}

export default InfoPage;
