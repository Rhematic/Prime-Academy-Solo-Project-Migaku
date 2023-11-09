import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function LogOutButton(props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="logout"
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => dispatch({ type: "LOGOUT" })}
    >
      Log Out
      <LogoutRoundedIcon
        sx={{
          marginLeft: "5px",
          fontSize: ".8rem",
        }}
      />
    </Button>
  );
}

export default LogOutButton;
