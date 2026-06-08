import { useQuery } from '@tanstack/react-query';
import { getGithubUser, getGithubUserRepos } from '../api/github';

export const useUser = (username: string | null) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getGithubUser(username!),
    enabled: !!username,
    retry: false,
  });
};

export const useRepos = (username: string | null, page: number = 1) => {
  return useQuery({
    queryKey: ['repos', username, page],
    queryFn: () => getGithubUserRepos(username!, page),
    enabled: !!username,
    retry: false,
  });
};
