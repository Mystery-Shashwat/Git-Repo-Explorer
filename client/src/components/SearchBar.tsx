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
    <div className="relative w-full max-w-2xl mx-auto group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-muted-foreground">
        <Search className="h-5 w-5" />
      </div>
      <Input
        type="text"
        className="pl-12 h-14 text-lg rounded-2xl shadow-sm bg-background/50 backdrop-blur-xl border-muted-foreground/20 focus-visible:ring-primary/50 transition-all duration-300 hover:border-muted-foreground/40"
        placeholder="Search GitHub username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
