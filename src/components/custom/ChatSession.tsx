import { ArrowLeft, UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import ChatMessages from './ChatMessages';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants';
import { useFacade } from '@/facades/useFacade';
import { ChatMessage, User } from '@/types';

interface ChatSessionProps {
    toUser: User;
    fromUser: User;
    onCloseChat: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChatSession = ({ onCloseChat, toUser, fromUser }: ChatSessionProps) => {
    const [message, setMessage] = useState<string>('');
    const { chats, setChats, sendChatMessage } = useFacade();

    useEffect(() => {
        setChats([]);
        fetch(`${BASE_URL}/chats/${toUser.userId}/${fromUser.userId}`)
            .then((res) => res.json())
            .then((data: ChatMessage[]) => setChats(data));
    }, [toUser, fromUser]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (message.trim()) {
            const newMessage = {
                createdAt: new Date().toISOString(),
                origin: fromUser?.userId,
                destination: toUser?.userId,
                messageValue: message,
            };
            sendChatMessage(newMessage);
            setMessage('');
        }
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (message.trim()) {
                const newMessage = {
                    createdAt: new Date().toISOString(),
                    origin: fromUser?.userId,
                    destination: toUser?.userId,
                    messageValue: message,
                };
                sendChatMessage(newMessage);
                setMessage('');
            }
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex gap-16 border-b-1 pb-2">
                <Button
                    variant={'ghost'}
                    className="cursor-pointer"
                    onClick={onCloseChat}
                >
                    <ArrowLeft />
                </Button>
                <div className="flex gap-2 items-center justify-center">
                    <p>{toUser.userName}</p>
                    <Avatar>
                        <AvatarImage src={toUser.thumbnail} />
                        <AvatarFallback>
                            <UserRound className="w-5 h-5 text-gray-500" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <ChatMessages chats={chats} user={toUser} />
            <form
                onSubmit={handleSubmit}
                className="bottom-0 w-full flex flex-row items-end gap-1"
            >
                <Textarea
                    placeholder="Type your message here."
                    rows={1}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    value={message}
                />
                <Button type="submit">Send</Button>
            </form>
        </div>
    );
};

export default ChatSession;
