import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const globalStyles = extendTheme({
  colors: {
    brand: {
      100: "#FFFCF3",
      200: "#FFF4CA",
      300: "#FFDC97",
      400: "#FFC464",
      500: "#FFAC31",
      600: "#E5982B",
      700: "#B0711F",
      800: "#61350C",
      900: "#472206",
    },
    brandScheme: {
      100: "#E9E3FF",
      200: "#7551FF",
      300: "#7551FF",
      400: "#7551FF",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    brandTabs: {
      100: "#E9E3FF",
      200: "#422AFB",
      300: "#422AFB",
      400: "#422AFB",
      500: "#422AFB",
      600: "#3311DB",
      700: "#02044A",
      800: "#190793",
      900: "#02044A",
    },
    secondaryGray: {
      100: "#E0E5F2",
      200: "#E1E9F8",
      300: "#F4F7FE",
      400: "#E9EDF7",
      500: "#8F9BBA",
      600: "#A3AED0",
      700: "#707EAE",
      800: "#707EAE",
      900: "#1B2559",
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: "#d0dcfb",
      100: "#aac0fe",
      200: "#a3b9f8",
      300: "#728fea",
      400: "#3652ba",
      500: "#1b3bbb",
      600: "#24388a",
      700: "#1B254B",
      800: "#111c44",
      900: "#0b1437",
    },
    gray: {
      100: "#FAFCFE",
    },
    grass: {
      50: "#E3FAD6",
      100: "#C2F6AE",
      200: "#93E380",
      300: "#66C95B",
      400: "#2FA52D",
      500: "#208D28",
      600: "#167625",
      700: "#0E5F21",
      800: "#084F1F",
      900: "#074119",
    },
    black: {
      50: "#E7E7E9",
      100: "#CFCFD3",
      200: "#A0A0A7",
      300: "#71717A",
      400: "#45454A",
      500: "#18181A",
      600: "#141415",
      700: "#0F0F10",
      800: "#0A0A0B",
      900: "#050505",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("gray.50", "navy.900")(props),
        fontFamily: "Inter",
        letterSpacing: "wide",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "Inter",
      },
    }),
  },
});

export default globalStyles;
