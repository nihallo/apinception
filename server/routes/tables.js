import express from 'express';

import { createTable, getTables, uploadTable} from '../controllers/tables.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getTables);
router.post('/',  createTable);
router.post('/upload',  uploadTable);

//router.patch('/:id', auth, updateTable);
//router.delete('/:id', auth, deleteTable);

export default router;