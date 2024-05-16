import * as S from "@/components/header/Header.styles";
import { Typography, Box } from "@mui/material";
import { HacettepeLogo } from "@/dummyData/dummyData";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserRole } from "@/layouts/DefaultLayouts";
import { useEffect } from "react";

interface Props {
  role: UserRole | null;
}

export default function Header(props: Props): JSX.Element {
  let { role } = props;
  const router = useRouter();

  const handleClick = () => {
    localStorage.clear();
    localStorage.setItem("role", UserRole.USER);
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    console.log("Logged out");
  };

  return (
    <S.StyledAppBar
      position="static"
      color="default"
      elevation={0}
      className="no-print">
      <S.StyledContentContainer>
        <S.StyledImage src={HacettepeLogo} />
        <S.StyledTypography variant="h5TaglineBold">
          <Box fontWeight="bold" display="inline">
            Hacettepe University
          </Box>{" "}
          Computer Engineering - Artificial Intelligence Engineering
        </S.StyledTypography>
        <S.StyledButtonContainer>
          {(role === UserRole.USER || role == null) && (
            <Link href="/">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
          )}
          {role === UserRole.STUDENT && (
            <Link href="/student-home">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
          )}
          {role === UserRole.PROFESSOR && (
            <Link href="/professor-home">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
          )}
          {role === UserRole.ADMIN && (
            <Link href="/admin-home">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
          )}
          {role === UserRole.STUDENT && (
            <Link href="/student-projects">
              <Typography variant="h5TaglineBold" component="span">
                My Projects
              </Typography>
            </Link>
          )}
          {role === UserRole.PROFESSOR && (
            <Link href="/professor-projects">
              <Typography variant="h5TaglineBold" component="span">
                My Projects
              </Typography>
            </Link>
          )}
          {role === UserRole.PROFESSOR && (
            <Link href="/all-projects-professor">
              <Typography variant="h5TaglineBold" component="span">
                Opened Projects
              </Typography>
            </Link>
          )}
          {role === UserRole.PROFESSOR && (
            <Link href="/professor-project-application">
              <Typography variant="h5TaglineBold" component="span">
                Project Applications
              </Typography>
            </Link>
          )}
          {role === UserRole.STUDENT && (
            <Link href="/all-projects-student">
              <Typography variant="h5TaglineBold" component="span">
                Opened Projects
              </Typography>
            </Link>
          )}

          <Link href="/projects">
            <Typography variant="h5TaglineBold" component="span">
              Projects
            </Typography>
          </Link>
          {role === UserRole.STUDENT && (
            <Link href="/student-groups">
              <Typography variant="h5TaglineBold" component="span">
                My Groups
              </Typography>
            </Link>
          )}
          {role !== UserRole.USER && (
            <Link href="/schedule">
              <Typography variant="h5TaglineBold" component="span">
                Timeline
              </Typography>
            </Link>
          )}
          {role === UserRole.ADMIN && (
            <Link href="/admin-project-types">
              <Typography variant="h5TaglineBold" component="span">
                Project Types
              </Typography>
            </Link>
          )}
          {role !== UserRole.USER && role != null && (
            <Link href="/" onClick={handleClick}>
              <Typography variant="h5TaglineBold" component="span">
                Logout
              </Typography>
            </Link>
          )}
          {(role === UserRole.USER || role == null) && (
            <Link href="/login">
              <Typography variant="h5TaglineBold" component="span">
                Login
              </Typography>
            </Link>
          )}
        </S.StyledButtonContainer>
      </S.StyledContentContainer>
    </S.StyledAppBar>
  );
}
