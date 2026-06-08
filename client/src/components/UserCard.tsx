import type { GithubUser } from '../types';
import { Card, CardContent } from './ui/card';
import { Users, BookMarked, MapPin, Building2, Link as LinkIcon, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface UserCardProps {
  user: GithubUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="w-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-border">
      <CardContent className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-sm"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{user.name || user.login}</h1>
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary/80 hover:text-primary transition-colors text-lg font-medium inline-flex mt-1"
              >
                @{user.login}
              </a>
            </div>
            
            {user.bio && (
              <p className="text-muted-foreground/90 max-w-2xl text-lg leading-relaxed">{user.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span className="font-medium text-foreground">{user.followers}</span> followers
                <span className="mx-1">·</span>
                <span className="font-medium text-foreground">{user.following}</span> following
              </div>
              
              <div className="flex items-center gap-1.5">
                <BookMarked className="w-4 h-4" />
                <span className="font-medium text-foreground">{user.public_repos}</span> repos
              </div>
              
              {user.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {user.location}
                </div>
              )}
              
              {user.company && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {user.company}
                </div>
              )}

              {user.blog && (
                <div className="flex items-center gap-1.5">
                  <LinkIcon className="w-4 h-4" />
                  <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">
                    {user.blog}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Joined {format(new Date(user.created_at), 'MMMM yyyy')}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
