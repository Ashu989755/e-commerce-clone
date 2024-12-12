/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main_gray:  '#787878',
        dark_gray:  '#606060',
        dark_link:  '#303030',
        text_dark:  '#262626',
        light_gray: '#F9F9F9',
        link_color: "#4578DA",
        border_clr: "#DDE7FF",
        main_blue:  "#4578DA",
      },


      backgroundImage: () => ({
       tiles_bg: "url('assets/bg_tile.png')",
       hand: "url('assets/hand.png')",
       notification: "url('assets/pikaso_embed.png')",
      }),
      
    },
  },
  plugins: [],
}