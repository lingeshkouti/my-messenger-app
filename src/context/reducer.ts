import { User, ChatMessage } from '@/types';

export interface AppState {
    isAuthenticated: boolean;
    user: User | null;
    contacts: User[];
    chats: ChatMessage[];
}

export type Action<T = any> = {
    type: string;
    payload?: T;
};

export const initialState = {
    isAuthenticated: false,
    user: null,
    contacts: [],
    chats: [],
};

export const reducer = (state: AppState, action: Action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isAuthenticated: true, user: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null };
        case 'SET_CONTACTS': {
            return { ...state, contacts: action.payload };
        }
        case 'SET_CHATS': {
            return { ...state, chats: action.payload };
        }
        case 'ADD_CHAT': {
            return { ...state, chats: [...state.chats, action.payload] };
        }
        default:
            return state;
    }
};
