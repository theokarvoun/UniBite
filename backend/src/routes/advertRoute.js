import express from 'express';
import { requestAdvert } from '../controllers/advertController.js'; // 👈 .js extension required in ES modules

const router = express.Router();

router.post('/request', requestAdvert);

export default router; // 👈 export default instead of module.exports