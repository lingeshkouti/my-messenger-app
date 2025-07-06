import { createContext, useReducer, type ReactNode, Dispatch } from 'react';
import { reducer, initialState, AppState, Action } from './reducer';

type AppProviderProps = {
    children: ReactNode;
};

type AppContextType = {
    state: AppState;
    dispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppContextType>({
    state: initialState,
    dispatch: () => undefined,
});

export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
