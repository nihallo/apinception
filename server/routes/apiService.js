import express from 'express';

import { apiService } from '../controllers/apiService.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/',auth,  apiService);

export default router;