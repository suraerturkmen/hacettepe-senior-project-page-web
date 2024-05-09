import Header from "@/components/header/Header";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const StyledMain = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "white",
  color: "black",
  gap: "32px",
}));

export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  PROFESSOR = "ROLE_PROFESSOR",
  STUDENT = "ROLE_STUDENT",
  USER = "ROLE_USER",
}

interface Props {
  children: JSX.Element;
}

export default function DefaultLayout(props: Props): JSX.Element {
  const { children } = props;

  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const roles =
    typeof window !== "undefined" ? localStorage.getItem("roles") : null;

  useEffect(() => {
    if (roles) {
      const parsedRoles = JSON.parse(roles) as string[];
      if (parsedRoles.includes(UserRole.ADMIN)) {
        setUserRole(UserRole.ADMIN);
        localStorage.setItem("role", UserRole.ADMIN);
      } else if (parsedRoles.includes(UserRole.PROFESSOR)) {
        setUserRole(UserRole.PROFESSOR);
        localStorage.setItem("role", UserRole.PROFESSOR);
      } else if (parsedRoles.includes(UserRole.STUDENT)) {
        setUserRole(UserRole.STUDENT);
        localStorage.setItem("role", UserRole.STUDENT);
      } else {
        setUserRole(UserRole.USER);
        localStorage.setItem("role", UserRole.USER);
      }
    }
  }, [roles]);

  return (
    <StyledMain>
      <Header role={userRole} />
      <main>{children}</main>
    </StyledMain>
  );
}
