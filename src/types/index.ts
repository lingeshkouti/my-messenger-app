export interface User {
    userId: string;
    userName: string;
    thumbnail: string;
}

export interface ChatMessage {
    messageId?: string;
    messageValue: string;
    createdAt: string;
    origin: string;
    destination: string;
}
