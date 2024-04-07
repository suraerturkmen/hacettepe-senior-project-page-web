import * as S from "@/components/header/Header.styles";
import { Typography, Box } from "@mui/material";
import { HacettepeLogo } from "@/dummyData/dummyData";
import Link from "next/link";

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
            <Link href="/">
              <Typography variant="h5TaglineBold">{"Home"}</Typography>
            </Link>
            <Typography variant="h5TaglineBold">{"Timelines"}</Typography>
            <Link href="/projects">
              <Typography variant="h5TaglineBold">{"Projects"}</Typography>
            </Link>
            <Typography variant="h5TaglineBold">{"Visualizations"}</Typography>
            <Link href="/login">
              <Typography variant="h5TaglineBold">{"Login"}</Typography>
            </Link>
          </S.StyledButtonContainer>
        </S.StyledContentContainer>
      </S.StyledAppBar>
    </>
  );
}
