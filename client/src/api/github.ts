import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to our backend proxy
});

export const getGithubUser = async (username: string) => {
  const { data } = await api.get(`/github/${username}`);
  return data;
};

export const getGithubUserRepos = async (username: string, page: number = 1) => {
  const { data } = await api.get(`/github/${username}/repos`, {
    params: { page }
  });
  return data;
};
