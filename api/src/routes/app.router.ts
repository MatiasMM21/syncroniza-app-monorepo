import { Router } from 'express';
import projectRouter from './project.router';
import planificationRouter from './planification.router';
import controlSheetRouter from './control-sheet.router';
import transactionRouter from './transaction.router';

const router = Router();

router.use('/projects', projectRouter);
router.use('/planifications', planificationRouter);
router.use('/controlSheets', controlSheetRouter);
router.use('/transactions', transactionRouter);

export default router;