import { useCallback, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { socket } from '@/socket';
import type { ChatMessage, User } from '@/types';

export const useFacade = () => {
    const store = useContext(AppContext);
    const { state, dispatch } = store || {};

    const login = useCallback(
        (user: User) => {
            dispatch({ type: 'LOGIN', payload: user });
        },
        [dispatch]
    );

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
    }, [dispatch]);

    const setContacts = useCallback(
        (contacts: User[]) => {
            dispatch({ type: 'SET_CONTACTS', payload: contacts });
        },
        [dispatch]
    );

    const setChats = useCallback(
        (chats: ChatMessage[]) => {
            dispatch({ type: 'SET_CHATS', payload: chats });
        },
        [dispatch]
    );

    const addChat = useCallback(
        (chat: ChatMessage) => {
            dispatch({ type: 'ADD_CHAT', payload: chat });
        },
        [dispatch]
    );

    const sendChatMessage = useCallback(
        (message: ChatMessage) => {
            socket.emit('chat', message);
        },
        [dispatch]
    );

    return {
        ...state,
        login,
        logout,
        setContacts,
        setChats,
        sendChatMessage,
        addChat,
    };
};
