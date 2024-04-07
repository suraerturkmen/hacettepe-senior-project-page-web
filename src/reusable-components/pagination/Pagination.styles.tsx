import { Pagination, styled, Box, PaginationItem } from "@mui/material";

export const StyledWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifySelf: "center",
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.down("desktop")]: {
    maxWidth: "100%",
  },

  [theme.breakpoints.down("tablet")]: {
    flexDirection: "column-reverse",
    gap: "12px",
  },
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  [theme.breakpoints.down("tablet")]: {
    "&.MuiPagination-root": {
      width: "100%",
    },

    ".MuiPagination-ul": {
      justifyContent: "space-between",

      "li:has(button.next)": {
        marginLeft: "auto",
      },

      "li:has(button.previous)": {
        marginRight: "auto",
      },
    },
  },
}));

export const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  border: "none",
  margin: "0 4px",

  "&:hover": {
    backgroundColor: "transparent",
  },

  "&.Mui-selected": {
    backgroundColor: "transparent",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
