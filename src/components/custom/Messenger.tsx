import ContactList from './ContactList';
import SearchBar from './SearchBar';
import ChatSession from './ChatSession';
import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { BASE_URL } from '@/constants';
import { useFacade } from '@/facades/useFacade';
import { User } from '@/types';

const Messenger = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [isOpenChatSession, setIsOpenChatSession] = useState(false);
    const [selectedContact, setSelectedContact] = useState<User | null>(null);
    const { user, contacts, setContacts, addChat } = useFacade();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);
        const handleChatUpdate = (value: any) => addChat(value);

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('update_chat', handleChatUpdate);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('update_chat', handleChatUpdate);
        };
    }, []);

    useEffect(() => {
        if (user) {
            fetch(`${BASE_URL}/contacts/${user.userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setContacts(data);
                });
        }
    }, [user]);

    const filteredContacts = contacts?.filter((el) =>
        el.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenChat = (contact: User) => {
        setSelectedContact(contact);
        setIsOpenChatSession(true);
    };

    const handleCloseChat = () => {
        setIsOpenChatSession(false);
        setSelectedContact(null);
    };

    return (
        <div className="h-full">
            {isOpenChatSession && user && selectedContact ? (
                <ChatSession
                    toUser={selectedContact}
                    fromUser={user}
                    onCloseChat={handleCloseChat}
                />
            ) : (
                <>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <ContactList
                        contacts={filteredContacts}
                        onOpenChat={handleOpenChat}
                    />
                </>
            )}
        </div>
    );
};

export default Messenger;
