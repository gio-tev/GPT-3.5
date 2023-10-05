import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ChatTypes} from '../types/index';

let db: SQLiteDatabase;

export const init = async () => {
  db = await SQLite.openDatabase({name: 'ChatHistory.db'});

  const promise = new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ChatHistory (
                      id INTEGER PRIMARY KEY NOT NULL, 
                      title TEXT NOT NULL, 
                      messages TEXT NOT NULL
          )`,
        [],
        () => resolve(),
        (_, error) => {
          console.log('-------- init');
          reject(error);
        },
      );
    });
  });

  return promise;
};

export const fetchChatHistory = async (): Promise<ChatTypes[]> => {
  const promise = new Promise<ChatTypes[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM ChatHistory',
        [],
        (_, results) => {
          const chatHistory: ChatTypes[] = [];

          for (let i = 0; i < results.rows.length; i++) {
            const row = results.rows.item(i);
            chatHistory.push({
              id: row.id,
              title: row.title,
              messages: JSON.parse(row.messages),
            });
          }

          resolve(chatHistory);
        },
        (_, error) => {
          console.log('-------- fetchChatHistory');
          reject(error);
        },
      );
    });
  });

  return promise;
};

export const addChat = async (
  newChat: ChatTypes,
): Promise<SQLite.ResultSet> => {
  const promise = new Promise<SQLite.ResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO ChatHistory (id, title, messages) VALUES (?, ?, ?)',
        [newChat.id, newChat.title, JSON.stringify(newChat.messages)],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('-------- addChat');
          reject(error);
        },
      );
    });
  });

  return promise;
};

export const updateChat = async (
  newMessages: ChatTypes,
): Promise<SQLite.ResultSet> => {
  const promise = new Promise<SQLite.ResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE ChatHistory SET title = ?, messages = ? WHERE id = ?',
        [
          newMessages.title,
          JSON.stringify(newMessages.messages),
          newMessages.id,
        ],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('-------- updateChat');
          reject(error);
        },
      );
    });
  });

  return promise;
};

export const deleteChat = async (id: number): Promise<SQLite.ResultSet> => {
  const promise = new Promise<SQLite.ResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM ChatHistory WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => {
          console.log(error, '-------- deleteChat');
          reject(error);
        },
      );
    });
  });

  return promise;
};

export const deleteAllChats = async (): Promise<SQLite.ResultSet> => {
  const promise = new Promise<SQLite.ResultSet>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM ChatHistory',
        [],
        (_, result) => resolve(result),
        (_, error) => {
          console.log('-------- deleteAllChats');
          reject(error);
        },
      );
    });
  });

  return promise;
};
