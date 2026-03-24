const path = require('path');
const express = require('express');
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://nexgo-new.onrender.com",
        methods: ["GET", "POST"],
    }
})

const _dirname = path.resolve();

require('./connection');
require('dotenv').config({ path: "./config.env" });

const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "https://nexgo-new.onrender.com"
}))

io.on("connection", (socket) => {
    console.log("A user connected with id")

    socket.on("joinConverssation", (conversationId) => {
        console.log(`User joined conversation: ${conversationId}`)
        socket.join(conversationId);
    })
    socket.on("sendMessage", (convId, messageDetail) => {
        console.log(`Message sent to conversation: ${convId}`)
        io.to(convId).emit("recieveMessage", messageDetail);
    })

})

const UserRoutes = require('./routes/user');
const PostRoutes = require('./routes/post');
const NotificationRoutes = require('./routes/notification')
const CommentRoutes = require('./routes/comment')
const ConversationRoutes = require('./routes/conversation');
const MessageRoutes = require('./routes/message');

app.use('/api/auth', UserRoutes);
app.use('/api/post', PostRoutes);
app.use('/api/notification', NotificationRoutes)
app.use('/api/comment', CommentRoutes)
app.use('/api/conversation', ConversationRoutes)
app.use('/api/message', MessageRoutes)

app.use(express.static(path.join(_dirname, '/linkedin-frontend/dist')));
app.use((req, res) => {
    res.sendFile(path.join(_dirname, '/linkedin-frontend', 'dist', 'index.html'));
});

server.listen(PORT, () => {
    console.log("Backend Server is running on PORT", PORT)
})