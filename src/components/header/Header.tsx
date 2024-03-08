import * as S from "@/components/header/Header.styles";
import { Typography, Box } from "@mui/material";
import { HacettepeLogo } from "@/dummyData/dummtData";

export default function Header(): JSX.Element {
  return (
    <>
      <S.StyledAppBar
        position="static"
        color="default"
        elevation={0}
        className="no-print">
        <S.StyledContentContainer>
          <S.StyledImage src={HacettepeLogo} />
          <S.StyledTypography variant="h6">
            <Box fontWeight="bold" display="inline">
              {"Hacettepe University"}
            </Box>
            {"Computer Engineering - Artificial Intelligence Engineering"}
          </S.StyledTypography>
          <S.StyledButtonContainer>
            <Typography variant="h5">{"Home"}</Typography>
            <Typography variant="h5">{"Timelines"}</Typography>
            <Typography variant="h5">{"Projects"}</Typography>
            <Typography variant="h5">{"Visulizations"}</Typography>
          </S.StyledButtonContainer>
        </S.StyledContentContainer>
      </S.StyledAppBar>
    </>
  );
}
