import db from '../config/db.js';

export const requestAdvert = async (req, res) => {
  console.log('Request body:', req.body);
  const { postId } = req.body;

  // 🔴 Hardcoded for now — replace with req.user.id once you add auth
  const studentId = req.body.studentId; // 👈 for testing, allow studentId from body
  console.log('Student ID:', studentId);
  
  if (!postId) {
    return res.status(400).json({ error: 'postId is required' });
  }

  try {
    // 1. Check the advert exists and has portions left
    const [rows] = await db.query(
      'SELECT * FROM advertisment WHERE advert_id = ? AND state_of_ad = "ACTIVE"',
      [postId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Advert not found or inactive' });
    }

    const advert = rows[0];

    if (advert.food_amount <= 0) {
      return res.status(400).json({ error: 'No portions left' });
    }

    // 2. Insert a request into request_ad
    await db.query(
      'INSERT INTO request_ad (student_id, advert_id, request_accepted) VALUES (?, ?, 0)',
      [studentId, postId]
    );

    // 3. Decrement food_amount by 1
    await db.query(
      'UPDATE advertisment SET food_amount = food_amount - 1 WHERE advert_id = ? AND food_amount > 0',
      [postId]
    );

    // 4. Decrease points of user
    await db.query(
        'UPDATE student SET points = points - 1 WHERE student_id = ?',
        [studentId]
    );

    // 5. Return updated advert
    const [updated] = await db.query(
      'SELECT * FROM advertisment WHERE advert_id = ?',
      [postId]
    );

    res.status(200).json({
      message: 'Advert requested successfully',
      post: {
        portions: updated[0].food_amount  // 👈 maps to what frontend expects
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};