import db from "./index"

const DB_VERSION = 1

export const runMigrations = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "PRAGMA user_version;",
      [],
      (_, result) => {
        const currentVersion = result.rows.item(0).user_version

        if (currentVersion < 1) {
          tx.executeSql(`ALTER TABLE cart ADD COLUMN size TEXT;`)
          tx.executeSql(`PRAGMA user_version = 1;`)
        }
      }
    )
  })
}
