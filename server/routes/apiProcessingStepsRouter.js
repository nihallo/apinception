import express from 'express';

import { createApiProcessingSteps,getApiProcessingSteps } from '../controllers/apiProcessingStepsController.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getApiProcessingSteps);
router.post('/',auth,  createApiProcessingSteps);
//router.patch('/:id', auth, updateApiStructure);
//router.delete('/:id', auth, deleteApiStructure);

export default router;