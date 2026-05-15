import pool from "../config/db.js";

export async function getPosts(req, res) {

  try {

    const [rows] = await pool.query(`
      SELECT
          a.advert_id,
          a.food_name,
          a.food_photo,
          a.food_description,
          a.food_amount,
          a.delivery_location,
          a.delivery_time,
          a.state_of_ad,

          s.student_name AS creator_name,

          GROUP_CONCAT(at.name) AS allergies

      FROM advertisment a

      JOIN student s
      ON a.creator_student_id = s.student_id

      LEFT JOIN allergy al
      ON a.advert_id = al.advert_id

      LEFT JOIN allergy_type at
      ON al.type_id = at.type_id

      GROUP BY a.advert_id
    `);

    const posts = rows.map(post => ({

      id: post.advert_id,

      title: post.food_name,

      description: post.food_description,

      portions: post.food_amount,

      location: post.delivery_location,

      time: post.delivery_time,

      image: post.food_photo,

      creator: post.creator_name,

      status:
        post.food_amount > 0
          ? "available"
          : "sold-out",

      allergies:
        post.allergies
          ? post.allergies.split(",").map(a => a.trim()).filter(a => a.length)
          : []
    }));

    res.json(posts);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error"
    });
  }
}

export async function createPost(req, res) {

  try {

    const {
      title,
      description,
      portions
    } = req.body;

    const [result] = await pool.query(`
      INSERT INTO advertisment
      (food_name, food_description, food_amount)
      VALUES (?, ?, ?)
    `, [
      title,
      description,
      portions
    ]);

    res.status(201).json({
      id: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server error"
    });
  }
}