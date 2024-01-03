import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { StyledButton } from "./customComponents";

function GreyButton({ link = false, sx = {}, ...props }) {
  return (
    <>
      {link === false ? (
        <StyledButton
          onClick={props?.onClick}
          {...props}
          sx={{
            color: "text.grey",
            borderRadius: 3,
            px: { xs: 1, sm: 2 },
            py: 0,
            "&:hover": {
              color: "text.white",
              bgcolor: "buttonbg.grey",
            },
            ...sx,
          }}
        >
          <Typography variant="p" sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
            {props.children}
          </Typography>
        </StyledButton>
      ) : (
        <Link to={link}>
          <StyledButton
            onClick={props?.onClick}
            {...props}
            sx={{
              color: "text.grey",
              borderRadius: 3,
              px: { xs: 1, sm: 2 },
              py: 0,
              "&:hover": {
                color: "text.white",
                bgcolor: "buttonbg.grey",
              },
              ...sx,
            }}
          >
            <Typography variant="p" sx={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
              {props.children}
            </Typography>
          </StyledButton>
        </Link>
      )}
    </>
  );
}

export default GreyButton;
