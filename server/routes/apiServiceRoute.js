import express from 'express';

import { apiServiceController } from '../controllers/apiServiceController.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/',auth,  apiServiceController);

export default router;