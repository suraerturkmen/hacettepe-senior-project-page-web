import { useState } from "react";
import * as S from "./ErrorDrawer.styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";

export interface ErrorDrawerProps {
  errorMessage: string;
  isError: boolean;
  handleErrorMessageClose: () => void;
}

function ErrorDrawer(props: ErrorDrawerProps) {
  const { errorMessage, isError, handleErrorMessageClose } = props;

  return (
    <S.StyledDialog open={isError} onClose={handleErrorMessageClose}>
      <S.StyledDialogContent>
        <ErrorOutlineIcon style={{ color: "#F44334" }} />
        <Typography variant="h5TaglineBold" style={{ color: "#F44334" }}>
          {errorMessage}
        </Typography>
      </S.StyledDialogContent>
    </S.StyledDialog>
  );
}

export default ErrorDrawer;
