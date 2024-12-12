import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config(); 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  define: {
    // Inject environment variables at build time
    "process.env": {
       VITE_GOOGLE_API_KEY: process.env.VITE_GOOGLE_API_KEY,
      // STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      // STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      REACT_APP_STRIPE_KEY_TEST: process.env.REACT_APP_STRIPE_KEY_TEST,
      REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      
    },
  },
})
