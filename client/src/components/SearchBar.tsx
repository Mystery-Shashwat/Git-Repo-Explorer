import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

interface SearchBarProps {
  onSearch: (username: string) => void;
  initialValue?: string;
}

export function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query.trim());
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        className="pl-10 h-12 text-lg rounded-full shadow-sm bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus-visible:ring-primary/50"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
