module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        supershake: "supershake 0.1s linear infinite",
        matrixglitch: "matrixglitch 0.3s steps(2) infinite",
        rainbowboom: "rainbowboom 0.7s linear infinite",
      },
      keyframes: {
        supershake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-10px)" },
          "20%": { transform: "translateX(10px)" },
          "30%": { transform: "translateX(-10px)" },
          "40%": { transform: "translateX(10px)" },
          "50%": { transform: "translateX(0)" },
        },
        matrixglitch: {
          "0%": { transform: "translate(0, 0) skewX(0deg)", opacity: 1 },
          "25%": {
            transform: "translate(-5px, 5px) skewX(5deg)",
            opacity: 0.8,
          },
          "50%": {
            transform: "translate(5px, -5px) skewX(-5deg)",
            opacity: 0.5,
          },
          "75%": {
            transform: "translate(-5px, 5px) skewX(10deg)",
            opacity: 0.8,
          },
          "100%": { transform: "translate(0, 0) skewX(0deg)", opacity: 1 },
        },
        rainbowboom: {
          "0%": { backgroundColor: "red", transform: "scale(1)" },
          "25%": { backgroundColor: "blue", transform: "scale(1.2)" },
          "50%": { backgroundColor: "green", transform: "scale(1.5)" },
          "75%": { backgroundColor: "yellow", transform: "scale(1.8)" },
          "100%": { backgroundColor: "purple", transform: "scale(2)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
