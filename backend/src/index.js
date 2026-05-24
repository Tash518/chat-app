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
export { io };

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
const socketUserMap = {}; //online users chec

io.on("connection", (socket) => {
    console.log("server side user connected on ", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        console.log("mapping socket id with user id: ", {userId, socketId: socket.id})
        socketUserMap[userId] = socket.id;
        console.log("current user socket map: ", socketUserMap)
        //emit user keys that are online to all clients
        io.emit("getOnlineUsers", Object.keys(socketUserMap));
    }
    socket.on("disconnect", () => {
        console.log("a user disconnected ", socket.id);
        delete socketUserMap[userId];
        console.log("on disconnect current user socket map: ", socketUserMap)
        io.emit("getOnlineUsers", Object.keys(socketUserMap));
    }
    )

}
)
//to return selectedUSer socketId
export function getReveiverSocketId(revieverId){
  return socketUserMap[revieverId];
}

//database+server starting
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
    connectDB();
});
