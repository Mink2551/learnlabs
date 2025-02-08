import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        SC1: "#1c202e",
        SC2: "#872341",
        SC3: "#BE3144",
        SC4: "#E17564",
        SC5: "#8E1616",
        SC6: "#D84040",
      },
    },
  },
  plugins: [],
} satisfies Config;
