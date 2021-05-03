import express from 'express';

import { apiStructure,updateApiStructure,deleteApiStructure, getApiListing} from '../controllers/apiStructure.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getApiListing);
router.post('/',auth,  apiStructure);
router.patch('/:id', auth, updateApiStructure);
router.delete('/:id', auth, deleteApiStructure);

export default router;