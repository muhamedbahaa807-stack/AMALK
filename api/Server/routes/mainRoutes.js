import usersRoute from './users.js';
import { Router } from 'express';

const router = Router();

router.use(usersRoute);
export default router;
