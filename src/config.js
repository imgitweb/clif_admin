const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://clif.ai:5001" // Production IP and port
    : "http://localhost:5001"; // Local development server

export default API_URL;
