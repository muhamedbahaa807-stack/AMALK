import usersRoute from './users.js';
import authRoute from './auth.js';
import departmentRouter from './departments.js';
import bookrouter from './appointment.js';
import { Router } from 'express';

const router = Router();
router.use(authRoute);
router.use(usersRoute);
router.use(departmentRouter);
router.use(bookrouter);
export default router;
