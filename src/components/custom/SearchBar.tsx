import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
    return (
        <div className="relative w-full">
            <Input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search contacts"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
            </button>
        </div>
    );
};

export default SearchBar;
