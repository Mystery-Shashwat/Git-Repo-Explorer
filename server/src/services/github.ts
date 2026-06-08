import axios from 'axios';
import { GithubUser, GithubRepo } from '../types';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

// Interceptor to add auth token if available
githubApi.interceptors.request.use((config) => {
  const token = process.env.GITHUB_API_TOKEN;
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

export const getGithubUser = async (username: string): Promise<GithubUser> => {
  const response = await githubApi.get<GithubUser>(`/users/${username}`);
  return response.data;
};

export const getGithubUserRepos = async (
  username: string,
  page: number = 1,
  perPage: number = 100
): Promise<GithubRepo[]> => {
  const response = await githubApi.get<GithubRepo[]>(`/users/${username}/repos`, {
    params: {
      per_page: perPage,
      page,
      sort: 'updated',
    },
  });
  return response.data;
};
