import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const safelist = [{ pattern: /^grid-cols-/ }];
export const theme = {
  extend: {
    keyframes: {
      progress: {
        "0%": { width: "0%" },
        "100%": { width: "100%" },
      },
      character: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(40%)" },
      },
      blink: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
      },
    },
    animation: {
      enter: "fadeIn 0.3s ease-out",
      leave: "fadeOut 0.3s ease-in",
      progress: "progress 1s linear infinite",
      character: "character 1s linear infinite",
      blink: "blink 2s infinite",
    },
    fontFamily: {
      sans: ["Poppins", ...fontFamily.sans],
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      chart: {
        1: "hsl(var(--chart-1))",
        2: "hsl(var(--chart-2))",
        3: "hsl(var(--chart-3))",
        4: "hsl(var(--chart-4))",
        5: "hsl(var(--chart-5))",
      },
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
