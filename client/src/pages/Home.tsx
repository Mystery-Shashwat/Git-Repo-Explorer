import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { UserCard } from '../components/UserCard';
import { RepoList } from '../components/RepoList';
import { LanguageChart } from '../components/LanguageChart';
import { useUser, useRepos } from '../hooks/useGithub';
import { Skeleton } from '../components/ui/skeleton';
import { Terminal as Github } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Home() {
  const [username, setUsername] = useState<string | null>(() => localStorage.getItem('lastSearchedUser'));

  const { data: user, isLoading: userLoading, error: userError } = useUser(username);
  const { data: repos } = useRepos(username);

  const handleSearch = (query: string) => {
    setUsername(query);
    localStorage.setItem('lastSearchedUser', query);
  };

  const handleClear = () => {
    setUsername(null);
    localStorage.removeItem('lastSearchedUser');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center space-y-8 mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Discover <span className="text-primary">GitHub</span> Profiles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Enter a username to explore their repositories, statistics, and language usage.
          </p>
        </div>
        
        <SearchBar onSearch={handleSearch} initialValue={username || ''} />
      </div>

      <main className="space-y-12">
        {userLoading && (
          <div className="space-y-6">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {userError && (
          <div className="text-center py-16 bg-destructive/5 border border-destructive/20 rounded-xl">
            <Github className="w-12 h-12 text-destructive mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold text-destructive mb-2">User Not Found</h2>
            <p className="text-muted-foreground">We couldn't find a GitHub user with that username.</p>
            <Button variant="outline" className="mt-4" onClick={handleClear}>
              Clear Search
            </Button>
          </div>
        )}

        {user && !userError && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <UserCard user={user} />
            
            {repos && repos.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 h-fit lg:sticky lg:top-24 z-10">
                  <LanguageChart repos={repos} />
                </div>
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Repositories</h2>
                    <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {user.public_repos} public
                    </span>
                  </div>
                  <RepoList repos={repos} />
                </div>
              </div>
            )}
            
            {repos && repos.length === 0 && (
              <div className="text-center py-16 border rounded-xl bg-card">
                <p className="text-muted-foreground">This user has no public repositories.</p>
              </div>
            )}
          </div>
        )}

        {!username && !userLoading && !userError && (
          <div className="text-center py-24 opacity-50">
            <Github className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <p className="text-xl font-medium text-muted-foreground">Ready to explore.</p>
          </div>
        )}
      </main>
    </div>
  );
}
