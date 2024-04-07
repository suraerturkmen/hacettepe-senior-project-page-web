//import { useAuth } from "../../hooks/useAuth";
import * as S from "@/components/login/Login.styles";
import { useState } from "react";
import { TextField, Typography } from "@mui/material";
import { LoginLogo } from "@/dummyData/dummyData";
import DefaultLayout from "@/layouts/DefaultLayouts";

export default function Login() {
  //const { signIn } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <S.StyledContainer>
      <S.StyledBannerContainer>
        <S.StyledImage src={LoginLogo} alt="logo" />
        <Typography variant="h4" color="#790606" align="center">
          Project Upload and Organize Login Page
        </Typography>
      </S.StyledBannerContainer>
      <S.StyledVerticalLine />
      <S.StyledInputAreasContainer>
        <S.StyledTextFieldContainer>
          <S.StyledTextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <S.StyledTextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </S.StyledTextFieldContainer>
        <S.StyledSignInButton
          onClick={() => {
            //signIn(username, password);
          }}>
          Sign In
        </S.StyledSignInButton>
        <S.StyledOrArea>
          <S.StyledHorizontalLine />
          <S.StyledOrText>or</S.StyledOrText>
          <S.StyledHorizontalLine />
        </S.StyledOrArea>

        <Typography variant="captionMedium" color="#514347" align="center">
          Forgot Password
        </Typography>
      </S.StyledInputAreasContainer>
    </S.StyledContainer>
  );
}

Login.getLayout = (page: JSX.Element) => <DefaultLayout>{page}</DefaultLayout>;
