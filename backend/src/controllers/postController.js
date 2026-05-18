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
      portions,
      location,
      time,
      allergies
    } = req.body;

    // Validation
    if (!title || !description || !portions) {
      console.log("Missing required fields:", { title, description, portions });
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Get the image filename if uploaded
    const imageFilename = req.file ? req.file.filename : null;

    // TODO: Get creator_student_id from authenticated user session
    // For now using a placeholder value
    const creatorStudentId = 1;

    console.log("Creating post with data:", { title, description, portions, location, time, imageFilename });

    const [result] = await pool.query(`
      INSERT INTO advertisment
      (creator_student_id, food_name, food_description, food_amount, food_photo, delivery_location, delivery_time, state_of_ad, date_of_creation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())
    `, [
      creatorStudentId,
      title,
      description,
      portions,
      imageFilename,
      location || null,
      time || null,
      'ACTIVE'
    ]);

    const advertId = result.insertId;
    console.log("Post created with ID:", advertId);

    // Handle allergies if provided
    if (allergies) {
      try {
        let allergyList = allergies;
        if (typeof allergies === 'string') {
          allergyList = JSON.parse(allergies);
        }
        
        if (Array.isArray(allergyList) && allergyList.length > 0) {
          for (const allergyName of allergyList) {
            // Get or create allergy type
            const [typeResult] = await pool.query(`
              SELECT type_id FROM allergy_type WHERE name = ?
            `, [allergyName]);

            let typeId;
            if (typeResult.length > 0) {
              typeId = typeResult[0].type_id;
            } else {
              const [insertResult] = await pool.query(`
                INSERT INTO allergy_type (name) VALUES (?)
              `, [allergyName]);
              typeId = insertResult.insertId;
            }

            // Insert allergy relationship
            await pool.query(`
              INSERT INTO allergy (advert_id, type_id) VALUES (?, ?)
            `, [advertId, typeId]);
          }
        }
      } catch (allergyError) {
        console.error("Error processing allergies:", allergyError);
        // Continue even if allergies fail
      }
    }

    res.status(201).json({
      id: advertId,
      image: imageFilename
    });

  } catch (error) {

    console.error("Error creating post:", error.message);

    res.status(500).json({
      error: "Server error: " + error.message
    });
  }
}