import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { FONT_GILROY, FONT_DAXPRO } from "@/utils/fonts";

interface AirAstanaColors {
  colors: {
    brand: {};
    neutral: {};

    semantic: {
      info: {};
      success: {};
      error: {};
    };
    overlay: {
      image: string;
      blue: string;
    };
    shadow: {
      cardShadow: string;
      cardHoverShadow: string;
      tooltipShadow: string;
    };
    linearGradient: {
      white: {
        rightToLeft: string;
        leftToRight: string;
      };
      blueToGrey: string;
    };
  };
}

// For Custom Colors
declare module "@mui/material/styles" {
  interface Theme extends AirAstanaColors {}
  interface ThemeOptions extends AirAstanaColors {}
}

// For Custom Button Variants
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    test: true;
    submitButton: true;
  }
}

// For Custom Breakpoints
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true;
    tablet: true;
    desktop: true;
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

// For Custom Typography
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1DisplayLargeBold: true;
    h1DisplayBold: true;
    h2HeadlineBold: true;
    h3TitleBold: true;
    h4SubtitleBold: true;
    h5TaglineBold: true;
    h6BodyTitleBold: true;
    h6BodyTitleSemibold: true;
    h6BodyTitleMedium: true;
    h7Bold: true;
    bodyBold: true;
    bodySemiboldUnderline: true;
    bodyMedium: true;
    formButtonLargeLabel: true;
    formButtonMediumLabel: true;
    formButtonSmallLabel: true;
    formDropdownCellTitle: true;
    formDropdownCellSupportingText: true;
    formDropdownCellPrefix: true;
    formDropdownCellSeparator: true;
    formTextfieldInput: true;
    formTextfieldLabel: true;
    formTextfieldSupportingText: true;
    formCheckRadioSupportingText: true;
    captionBold: true;
    captionMedium: true;
    captionRegular: true;
    captionTitleBold: true;
    footnoteBold: true;
    footnoteMedium: true;
    footnoteSmall: true;
    footnoteSmallBold: true;
    footnoteSemiboldUnderline: true;
    bodyTextLinkSemibold: true;
    captionTitleRegular: true;
    navigationMenu: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    menuListWithScrollbar: true;
    menuListWithoutScrollbar: true;
  }
}

// Created theme object
const Theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1366,
      xl: 1366,

      mobile: 360,
      tablet: 768,
      desktop: 1366, // TODO test 1280 width for desktop
    },
  },
  palette: {
    primary: {
      main: "#A48656", // Brand Gold
    },
    secondary: {
      main: "#506270", // Brand Grey
    },
    error: {
      main: "#BC3137",
    },
  },
  typography: {
    fontFamily: ["DaxPro", "Gilroy", "Roboto", "sans-serif"].join(","),

    // When you need to change h1-h6, body and other default typography variants
    h1: {},
    // When you need to change default button typography properties
    button: {
      color: "#000000",
    },
  },
  colors: {
    brand: {
      gold: "#A48656",
      blue: "#1C2B4F",
      grey: "#506270",
      red: "#900216",
      green: "#026251",
      gold25: "#FBF5EB",
      gold50: "#EDE0CA",
      gold600: "#9E732E",
      plus: "#A49986",
      yellow: "#C6951F",
    },
    neutral: {
      25: "#F9FAFB",
      50: "#F5F5F5",
      100: "#F4F5F7",
      200: "#EEEEF0",
      300: "#D0D5DD",
      400: "#98A2B3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1D2939",
      900: "#101828",
      white: "#FFFFFF",
      black: "#000000",
    },
    semantic: {
      info: {
        200: "#93C6F3",
        300: "#317BBC",
        500: "#004D90",
      },
      success: {
        200: "#D0F393",
        300: "#89BC31",
        500: "#5C9002",
      },
      error: {
        200: "#F3A093",
        300: "#BC3137",
        500: "#900216",
      },
    },
    overlay: {
      image: "rgba(28, 43, 79, 0.4)",
      blue: "rgba(28, 43, 79, 0.4)",
    },
    shadow: {
      cardShadow: "rgba(28, 43, 79, 0.08)",
      cardHoverShadow: "rgba(28, 43, 79, 0.24)",
      tooltipShadow: "rgba(0, 0, 0, 0.12)",
    },
    linearGradient: {
      white: {
        rightToLeft:
          "linear-gradient(90deg, #FFF -15.05%, rgba(255, 255, 255, 0.00) 102.22%)",
        leftToRight:
          "linear-gradient(270deg, #FFF -15.05%, rgba(255, 255, 255, 0.00) 102.22%)",
      },
      blueToGrey: "linear-gradient(116deg, #1C2B4F 0%, #506270 100%)",
    },
  },

  components: {
    // Project Typography Variants

    MuiTypography: {
      variants: [
        {
          props: { variant: "h1DisplayLargeBold" },
          style: {
            fontFamily: FONT_DAXPRO.style.fontFamily,
            fontSize: "56px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.29",
            letterSpacing: "-0.56px",
          },
        },

        {
          props: { variant: "h1DisplayBold" },
          style: {
            fontFamily: FONT_DAXPRO.style.fontFamily,
            fontSize: "50px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.28",
            letterSpacing: "-0.5px",
          },
        },

        {
          props: { variant: "h2HeadlineBold" },
          style: {
            fontFamily: FONT_DAXPRO.style.fontFamily,
            fontSize: "42px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "-0.42px",
          },
        },

        {
          props: { variant: "h3TitleBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "35px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.37",
            letterSpacing: "-0.35px",
          },
        },

        {
          props: { variant: "h4SubtitleBold" },
          style: {
            fontFamily: FONT_DAXPRO.style.fontFamily,
            fontSize: "29px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.38",
            letterSpacing: "-0.29px",
          },
        },

        {
          props: { variant: "h5TaglineBold" },
          style: {
            fontFamily: FONT_DAXPRO.style.fontFamily,
            fontSize: "24px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "-0.24px",
          },
        },

        {
          props: { variant: "h6BodyTitleBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "20px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.2",
            letterSpacing: "-0.2px",
          },
        },

        {
          props: { variant: "h6BodyTitleSemibold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "20px",
            fontWeight: "600",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.2",
            letterSpacing: "-0.2px",
          },
        },

        {
          props: { variant: "h6BodyTitleMedium" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "20px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.2",
            letterSpacing: "-0.2px",
          },
        },

        {
          props: { variant: "h7Bold" },
          style: {
            fontFamily: FONT_DAXPRO.style.fontFamily,
            fontSize: "20px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.2",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "bodyBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "17px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.41",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "bodySemiboldUnderline" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "17px",
            fontWeight: "600",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.41",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "bodyMedium" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "17px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.41",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formButtonLargeLabel" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "17px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.41",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formButtonMediumLabel" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "600",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.71",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formButtonSmallLabel" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "600",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formDropdownCellTitle" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "16px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.14",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formDropdownCellSupportingText" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.14",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formDropdownCellPrefix" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formDropdownCellSeparator" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formTextfieldInput" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "16px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formTextfieldLabel" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formTextfieldSupportingText" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "formCheckRadioSupportingText" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "14px",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "captionBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.71",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "captionMedium" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.71",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "captionRegular" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "normal",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.71",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "captionTitleBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "16px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.71",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "footnoteBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "footnoteMedium" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "footnoteSmall" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "10px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "footnoteSmallBold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "10px",
            fontWeight: "700",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "footnoteSemiboldUnderline" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "12px",
            fontWeight: "600",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.33",
            letterSpacing: "normal",
          },
        },

        {
          props: { variant: "bodyTextLinkSemibold" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "17px",
            fontWeight: "600",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "24px",
            letterSpacing: "normal",
            textDecoration: "underline",
          },
        },

        {
          props: { variant: "captionTitleRegular" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "16px",
            fontWeight: "400",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "24px",
            letterSpacing: "normal",
          },
        },
        {
          props: { variant: "navigationMenu" },
          style: {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "14px",
            fontWeight: "700",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "16px",
            letterSpacing: "normal",
          },
        },
      ],
      styleOverrides: {
        root: ({ theme }) => ({
          a: {
            //color: theme.colors.semantic.info[500],
            textDecoration: "underline",
          },
        }),
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&:not(.Mui-disabled):hover": {
            backgroundColor: "transparent",
          },
        },
        input: {
          height: "17px",
        },
      },
    },

    // INFO Example button component
    MuiButton: {
      variants: [
        {
          props: { variant: "test" },
          style: {
            textTransform: "lowercase",
            border: `2px dashed #000000`,
          },
        },
        // First put variant label to the top of the page, then add the variant to the button here
        {
          props: { variant: "submitButton" },
          style: {
            textTransform: "lowercase",
            border: `2px dashed #000000`,
          },
        },
        // Change default behaviour of the button contained or outlined, etc.
        // {
        //   props: { variant: 'contained', color: 'secondary' },
        //   style: {
        //     textTransform: 'lowercase',
        //     border: `10px dashed #000000`,
        //   },
        // },
        {
          props: { variant: "contained" },
          style: ({ theme }) => ({
            textTransform: "uppercase",

            "&:not(.Mui-disabled):hover": {
              //backgroundColor: theme.colors.brand.gold600,
            },
          }),
        },
      ],

      styleOverrides: {
        root: () => ({
          boxShadow: "none",
        }),
      },
    },

    MuiPaper: {
      variants: [
        {
          props: { variant: "menuListWithScrollbar" },
          style: ({ theme }) => ({
            padding: "16px",
            overflow: "hidden",
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);",

            ".MuiList-root": {
              maxHeight: "290px",
              [theme.breakpoints.down("tablet")]: {
                maxHeight: "100%",
                height: "100vh",
                boxShadow: "none",
                paddingRight: "16px",
              },
              overflowY: "scroll",

              "&::-webkit-scrollbar": {
                width: "4px",
                backgroundClip: "padding-box",
              },
              "&::-webkit-scrollbar-track": {
                //border: `4px solid ${theme.colors.neutral[200]}`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundClip: "padding-box",
                //backgroundColor: theme.colors.neutral[400],
                borderRadius: "8px",
              },
            },
          }),
        },
        {
          props: { variant: "menuListWithoutScrollbar" },
          style: ({ theme }) => ({
            overflow: "hidden",
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);",

            ".MuiList-root": {
              maxHeight: "290px",
              [theme.breakpoints.down("tablet")]: {
                maxHeight: "100%",
                height: "100vh",
                boxShadow: "none",
              },
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            },
          }),
        },
      ],

      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiAutocomplete-paper": {
            fontFamily: `${FONT_GILROY.style.fontFamily}`,
            fontSize: "16px",
            fontWeight: "500",
            //color: theme.colors.neutral[800],

            ".MuiAutocomplete-listbox": {
              overflow: "auto",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",

              ".MuiAutocomplete-option": {
                "&:hover": {
                  //backgroundColor: theme.colors.brand.gold25,
                },
              },
            },
          },
        }),
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&:hover": {
            //backgroundColor: theme.colors.brand.gold25,
          },
        }),
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },

    MuiTextField: {
      variants: [
        {
          props: { variant: "filled" },
          style: ({ theme }) => ({
            height: "52px",
            ".MuiInputBase-root": {
              //border: `1px solid ${theme.colors.neutral[400]}`,
              borderRadius: "4px",
              [theme.breakpoints.down("desktop")]: {
                width: "100%",
              },

              "&.Mui-disabled, &.Mui-readOnly": {
                cursor: "pointer",
              },
            },
            ".MuiFilledInput-root": {
              background: "transparent !important",
              "&:hover, &.Mui-focused": {
                //borderColor: theme.colors.brand.gold,
              },

              "&.Mui-error": {
                //borderColor: theme.colors.semantic.error[300],
              },
            },
          }),
        },
      ],
      styleOverrides: {
        root: ({ theme }) => ({
          ".MuiInputBase-input, .MuiInputLabel-root": {
            fontFamily: FONT_GILROY.style.fontFamily,
            fontSize: "16px",
            fontWeight: "500",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
            letterSpacing: "normal",
          },

          ".MuiInputLabel-root.Mui-error": {
            //color: theme.colors.brand.grey,

            "&.MuiInputLabel-shrink": {
              //color: theme.colors.semantic.error[300],
            },
          },
        }),
      },
    },
  },
});

export default Theme;
