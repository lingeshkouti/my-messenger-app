import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import contacts from "./contacts.json" with {type: 'json'};
import chats from './chats.json' with {type: 'json'};
import { randomUUID } from 'crypto';

//In memory message
const InMemoryChats = chats;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("hello")
})

app.get("/contacts/:userId", (req, res) => {
    const userId = req.params.userId;
    const filteredContacts = contacts.filter(el => el.userId !== userId)
    res.json(filteredContacts)
})

app.post("/login", (req, res) => {
    const { userId } = req.body;
    const user = contacts.find(el => el.userId === userId)
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
})

app.get("/chats/:to/:from", (req, res) => {
    const toUserId = req.params.to;
    const fromUserId = req.params.from;
    const filteredChats = InMemoryChats.filter(el => {
        const participants = [el.origin, el.destination];
        return participants.includes(toUserId) && participants.includes(fromUserId);
    });

    res.json(filteredChats)
})

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat', (msg) => {
        const newChat = storeMessage(msg);
        io.emit('update_chat', newChat);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const storeMessage = (msg) => {
    const messageId = randomUUID();
    const newChatMsg = {
        messageId,
        ...msg
    }
    InMemoryChats.push(newChatMsg)
    return newChatMsg;
}
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
