import pool from '../config/db.js';

// GET users
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users'
    );

    res.json(rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

// CREATE user
export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const [result] = await pool.query(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};