import Header from "@/components/header/Header";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledMain = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "white",
  color: "black",
  gap: "32px",
}));

interface Props {
  children: JSX.Element;
}

export default function DefaultLayout(props: Props): JSX.Element {
  const { children } = props;

  return (
    <StyledMain>
      <Header />
      <main>{children}</main>
    </StyledMain>
  );
}
