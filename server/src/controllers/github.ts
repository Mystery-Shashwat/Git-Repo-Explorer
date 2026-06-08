import { Request, Response, NextFunction } from 'express';
import { getGithubUser, getGithubUserRepos } from '../services/github';
import cache from '../cache';
import { AppError } from '../utils/error';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.params.username as string;
    const cacheKey = `user_${username}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const userData = await getGithubUser(username);
    cache.set(cacheKey, userData);

    res.json(userData);
  } catch (error: any) {
    if (error.response?.status === 404) {
      return next(new AppError('User not found', 404));
    }
    if (error.response?.status === 403) {
      return next(new AppError('GitHub API rate limit exceeded', 403));
    }
    next(error);
  }
};

export const getUserRepos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.params.username as string;
    const page = parseInt(req.query.page as string) || 1;
    const cacheKey = `repos_${username}_${page}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const reposData = await getGithubUserRepos(username, page);
    cache.set(cacheKey, reposData);

    res.json(reposData);
  } catch (error: any) {
    if (error.response?.status === 404) {
      return next(new AppError('User not found', 404));
    }
    if (error.response?.status === 403) {
      return next(new AppError('GitHub API rate limit exceeded', 403));
    }
    next(error);
  }
};
