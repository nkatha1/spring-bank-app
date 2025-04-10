import express from "express";
import bodyParser from "body-parser";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import followRoutes from "./routes/followRoutes"; // assuming this already exists

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Register the routes
app.use("/api", commentRoutes);
app.use("/api", likeRoutes);
app.use("/api", followRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});