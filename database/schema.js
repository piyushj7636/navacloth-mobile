import {getDB} from "./index.js";

export const createTables = async () => {
  const db = await getDB();
  try {
    // await db.executeSql(`DROP TABLE IF EXISTS user_profile;`);
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS user_profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL,
        name TEXT,
        phone TEXT,
        phone_verified INTEGER DEFAULT 0,
        email TEXT,
        email_verified INTEGER DEFAULT 0,
        street_address TEXT,
        city TEXT,
        state TEXT,
        country TEXT,
        postal_code TEXT
      );
    `)

    // await db.executeSql(`DROP TABLE IF EXISTS cart;`);
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        variant_code TEXT NOT NULL UNIQUE,
        title TEXT,
        size TEXT,
        color TEXT,
        price REAL,
        selling_price REAL,
        quantity INTEGER,
        image TEXT,
        discount TEXT,
        sync_status TEXT DEFAULT 'synced',
        updated_at INTEGER,
        server_id INTEGER
      );
    `);
    
    // await db.executeSql(`DROP TABLE IF EXISTS wishlist;`);
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT NOT NULL,
        variant_code TEXT NOT NULL UNIQUE,
        title TEXT,
        size TEXT,
        image TEXT,
        color TEXT,
        price REAL,
        selling_price REAL,
        discount TEXT,
        average_rating REAL,
        added_at INTEGER,
        sync_status TEXT DEFAULT 'synced',
        server_id INTEGER
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        action TEXT,
        payload TEXT,
        created_at INTEGER
      );
    `);

    console.log("✅ All tables ready");
  } catch (error) {
    console.log("❌ Table creation error", error);
  }
};