import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { getGithubUser, getGithubUserRepos } from '../api/github';

export const useUser = (username: string | null) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getGithubUser(username!),
    enabled: !!username,
    retry: false,
  });
};

export const useRepos = (username: string | null) => {
  return useInfiniteQuery({
    queryKey: ['repos', username],
    queryFn: ({ pageParam }) => getGithubUserRepos(username!, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 30) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: !!username,
    retry: false,
  });
};
