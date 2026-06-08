import { useState, useMemo, useEffect } from 'react';
import type { GithubRepo } from '../types';
import { RepoCard } from './RepoCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Filter, ArrowUpDown } from 'lucide-react';

interface RepoListProps {
  repos: GithubRepo[];
}

type SortType = 'updated' | 'stars' | 'name';

export function RepoList({ repos }: RepoListProps) {
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('updated');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);
    return () => clearTimeout(timer);
  }, [filter]);

  const filteredAndSortedRepos = useMemo(() => {
    let result = repos.filter((repo) =>
      repo.name.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
      repo.language?.toLowerCase().includes(debouncedFilter.toLowerCase())
    );

    result = result.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    return result;
  }, [repos, debouncedFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name or language..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant={sortBy === 'updated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('updated')}
            className="flex-1 sm:flex-none"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Updated
          </Button>
          <Button
            variant={sortBy === 'stars' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('stars')}
            className="flex-1 sm:flex-none"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Stars
          </Button>
          <Button
            variant={sortBy === 'name' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('name')}
            className="flex-1 sm:flex-none"
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Name
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      
      {filteredAndSortedRepos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl">
          No repositories found matching your criteria.
        </div>
      )}
    </div>
  );
}
