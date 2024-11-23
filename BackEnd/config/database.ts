import mongoose from "mongoose";

const dbConnection = (MONGODB_URI: string) => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
    });
};

export default dbConnection;
