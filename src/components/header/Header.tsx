import * as S from "@/components/header/Header.styles";
import { Typography, Box } from "@mui/material";
import { HacettepeLogo } from "@/dummyData/dummyData";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserRole } from "@/layouts/DefaultLayouts";
import Cookies from "js-cookie";

interface Props {
  role: UserRole | null;
}

const Header = ({ role }: Props): JSX.Element => {
  const router = useRouter();

  const handleClick = () => {
    const clearAllCookies = () => {
      const cookies = Cookies.get();
      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
    };

    clearAllCookies();
    Cookies.set("role", UserRole.USER);
    router.push("/").then(() => window.location.reload());
    console.log("Logged out");
  };

  const roleBasedLinks = () => {
    switch (role) {
      case UserRole.STUDENT:
        return (
          <>
            <Link href="/student-home">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
            <Link href="/student-projects">
              <Typography variant="h5TaglineBold" component="span">
                My Projects
              </Typography>
            </Link>
            <Link href="/all-projects-student">
              <Typography variant="h5TaglineBold" component="span">
                Active Projects
              </Typography>
            </Link>
            <Link href="/student-groups">
              <Typography variant="h5TaglineBold" component="span">
                My Groups
              </Typography>
            </Link>
          </>
        );
      case UserRole.PROFESSOR:
        return (
          <>
            <Link href="/professor-home">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
            <Link href="/professor-projects">
              <Typography variant="h5TaglineBold" component="span">
                My Projects
              </Typography>
            </Link>
            <Link href="/all-projects-professor">
              <Typography variant="h5TaglineBold" component="span">
                Active Projects
              </Typography>
            </Link>
            <Link href="/professor-project-application">
              <Typography variant="h5TaglineBold" component="span">
                Project Applications
              </Typography>
            </Link>
          </>
        );
      case UserRole.ADMIN:
        return (
          <>
            <Link href="/admin-home">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
            <Link href="/all-projects-admin">
              <Typography variant="h5TaglineBold" component="span">
                Active Projects
              </Typography>
            </Link>
            <Link href="/admin-project-types">
              <Typography variant="h5TaglineBold" component="span">
                Project Terms
              </Typography>
            </Link>
          </>
        );
      default:
        return (
          <>
            <Link href="/">
              <Typography variant="h5TaglineBold" component="span">
                Home
              </Typography>
            </Link>
            <Link href="/projects">
              <Typography variant="h5TaglineBold" component="span">
                Projects
              </Typography>
            </Link>
          </>
        );
    }
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
          {roleBasedLinks()}
          {(role === UserRole.USER || role === null) &&
            < Link href="/schedule">
              <Typography variant="h5TaglineBold" component="span">
                Timeline
              </Typography>
            </Link>
          }
          {role !== UserRole.USER && role != null ? (
            <Link href="/" onClick={handleClick}>
              <Typography variant="h5TaglineBold" component="span">
                Logout
              </Typography>
            </Link>
          ) : (
            <Link href="/login">
              <Typography variant="h5TaglineBold" component="span">
                Login
              </Typography>
            </Link>
          )}
        </S.StyledButtonContainer>
      </S.StyledContentContainer>
    </S.StyledAppBar >
  );
};

export default Header;
