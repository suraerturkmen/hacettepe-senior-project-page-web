import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { LoginLogo } from "@/dummyData/dummyData";
import DefaultLayout, { UserRole } from "@/layouts/DefaultLayouts";
import { SubmitHandler, useForm } from "react-hook-form";
import { login } from "@/redux/features/AuthSlice";
import * as S from "@/components/login/Login.styles";
import { AppDispatch } from "@/redux/store";
import router from "next/router";
import { store } from "@/redux/store";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>();

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      await store.dispatch(
        login({ username: data.username, password: data.password })
      );
      store.getState().auth;
    } catch (error) {
      console.error("Authentication Error:", error);
    }
    const roles =
      typeof window !== "undefined" ? localStorage.getItem("roles") : null;

    if (roles) {
      const parsedRoles = JSON.parse(roles) as string[];
      console.log(parsedRoles);
      if (parsedRoles.includes(UserRole.ADMIN)) {
        router.push("/admin-home");
      } else if (parsedRoles.includes(UserRole.PROFESSOR)) {
        router.push("/professor-home");
      } else if (parsedRoles.includes(UserRole.STUDENT)) {
        router.push("/student-home");
      } else {
        router.push("/");
      }
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.StyledTextFieldContainer>
            <S.StyledTextField
              id="username"
              label="Username"
              variant="outlined"
              {...register("username")}
            />
            <S.StyledTextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              {...register("password")}
            />
          </S.StyledTextFieldContainer>
          <S.StyledSignInButton type="submit">Sign In</S.StyledSignInButton>
        </form>
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
