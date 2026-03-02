import { getDB } from "../../database/index.js";

export const userLocalData = async (user) => {
  const db = await getDB();
  try {
    await db.executeSql(
      `INSERT OR REPLACE INTO user_profile 
        (user_id, name, phone, phone_verified, email, email_verified, house_number, street_address, city, state, country, landmark, postal_code, image_url, is_default, address_type)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.user_id,
        user.name,
        user.phone,
        user.phone_verified ? 1 : 0,
        user.email,
        user.email_verified ? 1 : 0,
        user.house_number,
        user.street_address,
        user.city,
        user.state,
        user.country,
        user.landmark,
        user.postal_code,
        user.image_url,
        user.is_default,
        user.address_type
      ],
    );
    console.log("✅ User saved to SQLite");
  } catch (error) {
    console.error("❌ Error saving user to SQLite", error);
  }
};
