import pool from '../config/db.js';

// LOGIN user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      'SELECT student_id, student_name, student_email FROM student WHERE student_email = ? AND student_password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const student = rows[0];
    res.json({
      id: student.student_id,
      name: student.student_name,
      email: student.student_email
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

// GET users
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT student_id, student_name, student_email FROM student'
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
    const { name, email, password } = req.body;

    const [result] = await pool.query(
      'INSERT INTO student (student_name, student_email, student_password) VALUES (?, ?, ?)',
      [name, email, password]
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