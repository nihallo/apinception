import express from 'express';

import { createTable ,getTables} from '../controllers/tables.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getTables);
router.post('/',  createTable);
//router.patch('/:id', auth, updateTable);
//router.delete('/:id', auth, deleteTable);

export default router;