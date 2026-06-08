import { useMemo } from 'react';
import type { GithubRepo } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface LanguageChartProps {
  repos: GithubRepo[];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-1, 220 70% 50%))',
  'hsl(var(--chart-2, 160 60% 45%))',
  'hsl(var(--chart-3, 30 80% 55%))',
  'hsl(var(--chart-4, 280 65% 60%))',
  'hsl(var(--chart-5, 340 75% 55%))',
];

export function LanguageChart({ repos }: LanguageChartProps) {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    
    repos.forEach((repo) => {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5 languages
  }, [repos]);

  if (data.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Top Languages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  backgroundColor: 'hsl(var(--popover))', 
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--popover-foreground))'
                }} 
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
