import { getDB } from "../../database/index.js";

export const addItemToCart = async (item) => {
  const db = await getDB();
  const {
    cart_item_id,
    product_id,
    variant_code,
    title,
    size,
    color,
    price,
    selling_price,
    image,
    discount,
    quantity = 1,
  } = item;

  try {
    const [selectResult] = await db.executeSql(
      `SELECT quantity FROM cart WHERE variant_code = ?`,
      [variant_code],
    );

    if (selectResult.rows.length > 0) {
      const currentQty = selectResult.rows.item(0).quantity;
      await db.executeSql(
        `UPDATE cart SET quantity = ?, updated_at = ? WHERE variant_code = ?`,
        [currentQty + quantity, Date.now(), variant_code],
      );
      console.log("🛒 Cart item updated");
    } else {
      await db.executeSql(
        `INSERT INTO cart (
          cart_item_id, product_id, variant_code, title, size, color, price, selling_price, image, discount, quantity, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cart_item_id,
          product_id,
          variant_code,
          title,
          size,
          color,
          price,
          selling_price,
          image,
          discount,
          quantity,
          Date.now(),
        ],
      );
      console.log("🛒 Cart item added");
    }
  } catch (error) {
    console.log("❌ Cart operation error", error);
  }
};

export const getCartItems = async () => {
  const db = await getDB();

  try {
    const [result] = await db.executeSql(
      `SELECT * FROM cart ORDER BY updated_at DESC`,
    );

    const items = [];
    for (let i = 0; i < result.rows.length; i++) {
      items.push(result.rows.item(i));
    }

    return items;
  } catch (error) {
    console.log("❌ Fetch cart items error", error);
    return [];
  }
};

export const getCartItemCount = async () => {
  const db = await getDB();

  try {
    const [result] = await db.executeSql(
      `SELECT SUM(quantity) as count FROM cart`,
    );

    return result.rows.item(0).count || 0;
  } catch (error) {
    console.log("❌ Cart count error", error);
    return 0;
  }
};

export const removeItemFromCart = async (variant_code) => {
  const db = await getDB();

  try {
    await db.executeSql(`DELETE FROM cart WHERE variant_code = ?`, [
      variant_code,
    ]);
    console.log("🗑️ Cart item removed");
  } catch (error) {
    console.log("❌ Remove cart item error", error);
  }
};

export const updateCartQuantity = async (variant_code, quantity) => {
  const db = await getDB();

  try {
    const [selectResult] = await db.executeSql(
      `SELECT quantity FROM cart WHERE variant_code = ?`,
      [variant_code],
    );

    if (selectResult.rows.length > 0) {
      await db.executeSql(
        `UPDATE cart SET quantity = ?, updated_at = ?, sync_status = ? WHERE variant_code = ?`,
        [quantity, Date.now(), "pending", variant_code],
      );
      console.log("🛒 Cart item updated locally");
    } else {
      console.warn("⚠️ Tried to update a cart item that doesn't exist locally");
    }
  } catch (error) {
    console.log("❌ Update quantity error", error);
  }
};

export const clearCart = async () => {
  const db = await getDB();

  try {
    await db.executeSql(`DELETE FROM cart`);
    console.log("🧹 Cart cleared");
  } catch (error) {
    console.log("❌ Clear cart error", error);
  }
};

export const getCartTotal = async () => {
  const db = await getDB();

  try {
    const [result] = await db.executeSql(`
      SELECT
        SUM(price * quantity) AS total_mrp,
        SUM(selling_price * quantity) AS total_selling
      FROM cart
    `);

    const row = result.rows.item(0);

    return {
      totalMrp: row.total_mrp || 0,
      totalSelling: row.total_selling || 0,
      totalSavings: (row.total_mrp || 0) - (row.total_selling || 0),
    };
  } catch (error) {
    console.log("❌ Cart total error", error);
    return 0;
  }
};

export const isVariantInCart = async (variant_code) => {
  const db = await getDB();

  try {
    const [result] = await db.executeSql(
      `SELECT 1 FROM cart WHERE variant_code = ? LIMIT 1`,
      [variant_code],
    );

    return result.rows.length > 0;
  } catch (error) {
    console.log("❌ Check variant error", error);
    return false;
  }
};

export const updateCartVariant = async (oldVariantId, newVariant) => {
  const db = await getDB();

  const { variant_code, size, color, price, image } = newVariant;

  try {
    await db.executeSql(
      `UPDATE cart 
       SET variant_code = ?, size = ?, color = ?, price = ?, image = ?, updated_at = ?
       WHERE variant_code = ?`,
      [variant_code, size, color, price, image, Date.now(), oldVariantId],
    );
  } catch (error) {
    console.log("❌ Update cart variant error", error);
  }
};

export const replaceCartItemInSQLite = async (item) => {
  const db = await getDB(); // same helper you use in addItemToCart

  const {
    product_id,
    title,
    size,
    color,
    image,
    price,
    selling_price,
    discount,
    quantity,
    id,
    variant_code,
  } = item;

  try {
    await db.executeSql(
      `UPDATE cart 
       SET product_id = ?, title = ?, size = ?, color = ?, image = ?, price = ?, selling_price = ?, discount = ?, quantity = ?, sync_status = ?, server_id = ?
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
        quantity,
        "synced",
        id,
        variant_code,
      ],
    );

    console.log("✅ Cart item updated in SQLite");
  } catch (error) {
    console.error("❌ SQLite update error:", error);
  }
};

export const markCartItemPendingSync = async (item) => {
  const db = await getDB();

  try {
    await db.executeSql(
      `UPDATE cart 
       SET sync_status = ? 
       WHERE variant_code = ?`,
      ["pending", item.variant_code],
    );

    console.log("📌 Marked cart item as pending sync:", item.variant_code);
  } catch (error) {
    console.error("❌ Error marking item pending sync", error);
  }
};

export const markItemPendingRemoval = async (id) => {
  const db = await getDB();
  await db.executeSql(`UPDATE cart SET sync_status = ? WHERE id = ?`, [
    "pending_remove",
    id,
  ]);
};

export const saveCartToSQLite = async (cartItems) => {
  const db = await getDB();

  await db.transaction(async (tx) => {
    await tx.executeSql("DELETE FROM cart");

    for (const item of cartItems) {
      await tx.executeSql(
        `
        INSERT INTO cart (
          product_id,
          variant_code,
          title,
          size,
          color,
          price,
          image,
          quantity,
          selling_price,
          discount,
          updated_at,
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          item.product_id,
          item.variant_code,
          item.title,
          item.size,
          item.color,
          item.price,
          item.image,
          item.quantity,
          item.selling_price,
          item.discount,
          Date.now(),
        ]
      );
    }
  });
};

export const updateCartItemId = async (variantCode, cartItemId) => {
  try {
    const db = await getDB(); // your existing DB connector

    await db.executeSql(
      `
      UPDATE cart
      SET cart_item_id = ?
      WHERE variant_code = ?
      `,
      [cartItemId, variantCode]
    );

    console.log("✅ cart_item_id updated for", variantCode);
  } catch (error) {
    console.error("❌ Failed to update cart_item_id", error);
  }
};

export const mergeBackendCartIntoSQLite = async (backendItems) => {
  try {
    // 1️⃣ Get local cart
    const localItems = await getCartItems();

    // Create fast lookup maps
    const localMap = new Map(
      localItems.map(item => [item.variant_code, item])
    );

    // const backendMap = new Map(
    //   backendItems.map(item => [item.variant_code, item])
    // );

    // 2️⃣ Merge backend → local
    for (const backendItem of backendItems) {
      const localItem = localMap.get(backendItem.variant_code);

      // 🟢 Backend-only item → insert
      if (!localItem) {
        await addItemToCart({
          ...backendItem,
          sync_status: "synced",
        });
        continue;
      }

      if (!localItem.cart_item_id && backendItem.cart_item_id) {
        await updateCartItemId(
          backendItem.variant_code,
          backendItem.cart_item_id
        );
      }
      // 🟡 Locally deleted → do NOT resurrect
      if (localItem.sync_status === "pending_removal") {
        continue;
      }

      // 🔴 Locally modified → do NOT overwrite
      if (localItem.sync_status === "pending") {
        continue;
      }

      // 🔵 Safe to sync quantity
      if (localItem.quantity !== backendItem.quantity) {
        await updateCartQuantity(
          backendItem.variant_code,
          backendItem.quantity
        );
      }
    }

    console.log("✅ Cart merge completed");
  } catch (error) {
    console.error("❌ Cart merge failed", error);
  }
};
