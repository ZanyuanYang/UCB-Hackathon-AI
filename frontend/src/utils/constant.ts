export const BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://yonder-backend.vercel.app/api" 
  : process.env.REACT_APP_BACKEND_URL;
