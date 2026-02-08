import { getDB } from "../../database/index.js";

export const addItemToWishlist = async (item) => {
  const db = await getDB();
  const {
    product_id,
    variant_code,
    title,
    size,
    color,
    price,
    selling_price,
    discount,
    image,
    average_rating = null, // optional field
  } = item;

  try {
    // Step 1: Check if item already exists in wishlist
    const [selectResult] = await db.executeSql(
      `SELECT id FROM wishlist WHERE variant_code = ?`,
      [variant_code],
    );

    if (selectResult.rows.length > 0) {
      console.log("⭐ Item already in wishlist");
    } else {
      // Step 2: Insert new item
      await db.executeSql(
        `INSERT INTO wishlist (
          product_id,
          variant_code,
          title,
          size,
          color,
          price,
          selling_price,
          image,
          discount,
          average_rating,
          added_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          product_id,
          variant_code,
          title,
          size,
          color,
          price,
          selling_price,
          image,
          discount,
          average_rating,
          Date.now(),
        ],
      );
      console.log("💖 Item added to wishlist");
    }
  } catch (error) {
    console.log("❌ Wishlist operation error", error);
  }
};

export const removeItemFromWishlist = async (variant_code) => {
  const db = await getDB();
  try {
    await db.executeSql(`DELETE FROM wishlist WHERE variant_code = ?`, [
      variant_code,
    ]);
    console.log("🗑️ Item removed from wishlist");
  } catch (error) {
    console.log("❌ Wishlist remove error", error);
  }
};

export const getWishlistItems = async () => {
  const db = await getDB();
  try {
    const [results] = await db.executeSql(
      `SELECT * FROM wishlist ORDER BY added_at DESC`,
    );
    const items = [];
    for (let i = 0; i < results.rows.length; i++) {
      items.push(results.rows.item(i));
    }
    console.log("📦 Wishlist items fetched:", items);
    return items;
  } catch (error) {
    console.log("❌ Wishlist fetch error", error);
    return [];
  }
};

// Remote sync function
export const replaceWishlistItemInSQLite = async (item) => {
  const db = await getDB(); // same helper you use in addItemToWishlist

  const {
    product_id,
    title,
    size,
    color,
    image,
    price,
    selling_price,
    discount,
    average_rating,
    id,
    variant_code,
  } = item;

  try {
    await db.executeSql(
      `UPDATE wishlist 
       SET product_id = ?, title = ?, size = ?, color = ?, image = ?, price = ?, selling_price = ?, discount = ?, average_rating = ?, sync_status = ?, server_id = ?
       WHERE variant_code = ?`,
      [
        product_id,
        title,
        size,
        color,
        image,
        price,
        selling_price,
        discount,
        average_rating,
        "synced",
        id,
        variant_code,
      ],
    );

    console.log("✅ Wishlist item updated in SQLite");
  } catch (error) {
    console.error("❌ SQLite update error:", error);
  }
};

export const markWishlistItemPendingSync = async (item) => {
  const db = await getDB();

  try {
    await db.executeSql(
      `UPDATE wishlist 
       SET sync_status = ? 
       WHERE variant_code = ?`,
      ["pending", item.variant_code],
    );

    console.log("📌 Marked wishlist item as pending sync:", item.variant_code);
  } catch (error) {
    console.error("❌ Error marking item pending sync", error);
  }
};

export const markItemPendingRemoval = async (id) => {
  const db = await getDB();
  await db.executeSql(`UPDATE wishlist SET sync_status = ? WHERE id = ?`, [
    "pending_remove",
    id,
  ]);
};
