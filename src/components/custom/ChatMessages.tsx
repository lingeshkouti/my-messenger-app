import { useEffect, useRef } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { ChatMessage, User } from '@/types/index';

interface ChatMessageItemProps {
    message: ChatMessage;
    user: User;
}

interface ChatMessagesProps {
    chats: ChatMessage[];
    user: User;
}

const ChatMessageItem = ({ message, user }: ChatMessageItemProps) => {
    return (
        <div
            className={`flex ${
                message.origin !== user.userId ? 'justify-end' : 'justify-start'
            }`}
        >
            <Card className="max-w-xs gap-0 p-2 my-2 rounded-md">
                <CardContent className="p-1">
                    <p className="text-sm">{message.messageValue}</p>
                </CardContent>
                <CardFooter className="justify-end p-0">
                    <p className="text-xs text-right">
                        <span>
                            {new Date(message.createdAt).toLocaleString()}
                        </span>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

const ChatMessages = ({ chats, user }: ChatMessagesProps) => {
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef?.current?.scrollIntoView();
    }, [chats]);

    return (
        <div className="h-[85%] overflow-auto no-scrollbar">
            {chats?.map((el: ChatMessage) => {
                return (
                    <ChatMessageItem
                        message={el}
                        key={el.messageId}
                        user={user}
                    />
                );
            })}
            <div ref={endRef}></div>
        </div>
    );
};

export default ChatMessages;
