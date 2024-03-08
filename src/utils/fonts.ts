import localFont from "next/font/local";

//TO DO
export const FONT_DAXPRO = localFont({
  src: [
    {
      path: "../../public/fonts/DaxPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const FONT_GILROY = localFont({
  src: [
    {
      path: "../../public/fonts/GilroyW05-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GilroyW05-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GilroyW05-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/GilroyW05-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],
});
