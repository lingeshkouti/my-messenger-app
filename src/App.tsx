import Login from './components/custom/Login';
import Messenger from './components/custom/Messenger';
import { useAppContext } from './hooks/useAppContext';

function App() {
    const { state } = useAppContext();
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
                Messenger App
            </h1>
            <div className="h-[75vh] w-full max-w-md mx-auto m-6 px-4 py-6 bg-white shadow-md rounded-lg border border-gray-300 overflow-y-auto">
                {state.isAuthenticated ? <Messenger /> : <Login />}
            </div>
        </div>
    );
}

export default App;
