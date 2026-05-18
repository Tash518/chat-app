import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import { Server } from "socket.io"
import http from "http"


dotenv.config();
//app and server init 
const app = express();
const server = http.createServer(app);
//socketio setup
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});


//lobal middleare
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}
))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//socket events
io.on("connection", (socket) => {
  console.log("server side user connected on ", socket.id);

  socket.on("disconnect", () => {
    console.log("a user disconnected ", socket.id)
  }
  )
}
)
//database+server starting
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
    connectDB();
});
