import dotenv from 'dotenv';
dotenv.config();

const config = {
  general : {
    port: process.env.PORT || 3000
  },
  sessions: {
    secret: process.env.SESSIONS_SECRET || "UnsecurePassword"
  }
};

export default config;