import { useState, useEffect } from 'react';

interface SearchProps {
    onSearch: (city: string) => void;
}

interface CitySuggestion {
    name: string;
    country: string;
    state?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const fetchSuggestions = async () => {
            try {
                const suggestionResponse = await fetch(`/api/suggestions/${query}`);
                const data = await suggestionResponse.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        };
        const debounceTimer = setTimeout(() => {
            fetchSuggestions();
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSuggestionClick = (suggestion: CitySuggestion) => {
        const cityQuery = `${suggestion.name},${suggestion.country}`;
        setQuery(cityQuery);
        setShowSuggestions(false);
        onSearch(cityQuery);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="p-4 bg-white border-b">
            <form onSubmit={handleSubmit} className="relative flex items-center">
                <div className="w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by city or ZIP code (e.g., 90210,US)"
                        className="w-full bg-transparent focus:outline-none text-lg text-black"
                        autoComplete="off"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto">
                            {suggestions.map((city, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(city)}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                >
                                    {city.name}, {city.state ? `${city.state}, ` : ''}{city.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className="text-black" aria-label="search">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </form>
        </div>
    );
};

export default Search;