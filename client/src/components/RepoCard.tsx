import type { GithubRepo } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Star, GitFork, Book, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RepoCardProps {
  repo: GithubRepo;
}

// Map languages to colors for visual flair
const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-blue-400',
  Java: 'bg-red-500',
  'C++': 'bg-pink-500',
  'C#': 'bg-green-600',
  Ruby: 'bg-red-600',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
  HTML: 'bg-orange-600',
  CSS: 'bg-blue-600',
  Vue: 'bg-emerald-500',
  Shell: 'bg-green-400',
  PHP: 'bg-indigo-500',
};

export function RepoCard({ repo }: RepoCardProps) {
  const languageColor = repo.language && languageColors[repo.language] ? languageColors[repo.language] : 'bg-gray-400';

  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors group">
      <CardHeader className="flex-1 pb-4">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 break-all">
              <Book className="w-4 h-4 shrink-0 text-muted-foreground" />
              {repo.name}
            </a>
          </CardTitle>
          <div className="flex gap-2 shrink-0">
            {repo.archived && <Badge variant="secondary">Archived</Badge>}
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-full px-2 py-0.5">
              <Star className="w-3 h-3" />
              {repo.stargazers_count}
            </a>
          </div>
        </div>
        <CardDescription className="line-clamp-2 mt-2 text-sm">
          {repo.description || 'No description provided.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs bg-muted/50 font-normal">
              {topic}
            </Badge>
          ))}
          {repo.topics.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted/50 font-normal">
              +{repo.topics.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${languageColor}`} />
              <span>{repo.language}</span>
            </div>
          )}
          {repo.forks_count > 0 && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <GitFork className="w-3.5 h-3.5" />
              {repo.forks_count}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
        </div>
      </CardFooter>
    </Card>
  );
}
