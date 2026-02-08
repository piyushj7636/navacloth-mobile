import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDB = async () => {
  return await SQLite.openDatabase({ name: 'tshirt_app.db', location: 'default' });
};