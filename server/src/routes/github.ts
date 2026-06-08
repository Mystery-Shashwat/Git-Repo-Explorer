import { Router } from 'express';
import { getUser, getUserRepos } from '../controllers/github';

const router = Router();

router.get('/:username', getUser);
router.get('/:username/repos', getUserRepos);

export default router;
