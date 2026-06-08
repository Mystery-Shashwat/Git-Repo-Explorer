import React from 'react';
import { Terminal as Github, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <Github className="w-6 h-6" />
          <span>RepoExplorer</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
