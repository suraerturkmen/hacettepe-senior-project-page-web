import { useState } from "react";
import * as S from "./DrawerWithButton.styles";
import { Button, Typography } from "@mui/material";

export interface DrawerWithButtonProps {
  message: string;
  isOpen: boolean;
  buttonName: string;
  handleClose: () => void;
  onClick: () => void;
}

function DrawerWithButton(props: DrawerWithButtonProps) {
  const { message, isOpen, buttonName, handleClose, onClick } = props;

  return (
    <S.StyledDialog open={isOpen} onClose={handleClose}>
      <S.StyledDialogContent>
        <Typography variant="h5TaglineBold" style={{ color: "#" }}>
          {message}
        </Typography>
        <Button onClick={onClick} variant="contained" color="success">
          <Typography variant="formButtonLargeLabel" color="#FFFFFF">
            {buttonName}
          </Typography>
        </Button>
      </S.StyledDialogContent>
    </S.StyledDialog>
  );
}

export default DrawerWithButton;
