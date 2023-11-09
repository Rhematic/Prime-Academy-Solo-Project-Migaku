import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LogoMain from "../LogoMain/LogoMain";
import {
  Container,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TitleBox, MainBox } from "../../utils/boxThemes";

function AboutPage() {
  const history = useHistory();
  const [openList, setOpenList] = useState(null);

  const handleClick = (listName) => {
    setOpenList(openList === listName ? null : listName);
  };

  const CustomListItem = ({ children }) => (
    <ListItem sx={{ my: -1, fontSize: "0.8rem" }}>{children}</ListItem>
  );

  const CustomDescriptionItem = ({ children }) => (
    <Box
      sx={{
        overflow: "auto",
        maxHeight: "100px",
      }}
    >
      <ListItem
        sx={{
          fontSize: "0.8rem",
          // textAlign: "left",
          // lineHeight: "normal",
          // padding: "8px 0",
        }}
      >
        {children}
      </ListItem>
    </Box>
  );

  return (
    <Container variant="default">
      <MainBox>
        <LogoMain />
        <TitleBox>Developed by Adam Myhand</TitleBox>
        <Stack alignItems="left">
          <List dense={true}>
            <ListItemButton onClick={() => handleClick("tech")}>
              <ListItemIcon>
                {openList === "tech" ? (
                  <ChevronRightIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemIcon>
              <ListItemText primary="Technologies Used" sx={{ ml: -4 }} />
            </ListItemButton>
            <Collapse in={openList === "tech"} timeout="auto" unmountOnExit>
              <Box>
                <List component="div" disablePadding>
                  <CustomListItem sx={{ my: -4 }}>Node</CustomListItem>
                  <CustomListItem>Express</CustomListItem>
                  <CustomListItem>React</CustomListItem>
                  <CustomListItem>Redux</CustomListItem>
                  <CustomListItem>Sagas</CustomListItem>
                  <CustomListItem>Postgressql</CustomListItem>
                  <CustomListItem>Heroku</CustomListItem>
                </List>
              </Box>
            </Collapse>
            <ListItemButton onClick={() => handleClick("about")}>
              <ListItemIcon>
                {openList === "about" ? (
                  <ChevronRightIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemIcon>
              <ListItemText primary="What is Migaku?" sx={{ my: -1, ml: -4 }} />
            </ListItemButton>
            <Collapse in={openList === "about"} timeout="auto" unmountOnExit>
              <Box>
                <List component="div" disablePadding>
                  <CustomDescriptionItem>
                    Migaku (磨く) is an app to help you progress, organize, and
                    track your improvement playing kendama. “Migaku” is the
                    Japanese word meaning: to refine (a skill, etc.); to
                    improve; to hone; to polish (up). The Migaku app will help
                    you hone your kendama skills by creating play sessions based
                    on your current proficiency level, where you will be given
                    ten tricks in a flash card like format, and take into
                    account how well you perform the set of tricks and increase
                    or decrease your level accordingly. The next set of tricks
                    you get will be dependent on your updated proficiency level;
                    this ensures you are always practicing tricks that are
                    neither too easy, nor too hard as you move beyond learning
                    the foundational skills in playing kendama.
                  </CustomDescriptionItem>
                </List>
              </Box>
            </Collapse>
          </List>
        </Stack>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Button variant="default" onClick={() => history.push("/home")}>
            Home
          </Button>
        </Box>
      </MainBox>
    </Container>
  );
}

export default AboutPage;
