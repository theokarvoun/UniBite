import express from 'express';

import {
  login,
  getUsers,
  createUser,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

// POST /api/users/login
router.post('/login', login);

// GET /api/users
router.get('/', getUsers);

// POST /api/users
router.post('/', createUser);

export default router;

// Get user by id
router.get('/:id', getUserById); // 👈 add this