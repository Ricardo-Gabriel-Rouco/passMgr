import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("MainDb.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Configs (ID INTEGER PRIMARY KEY AUTOINCREMENT, option TEXT, value TEXT )",
      [],
      () => {},
      (error) => {
        console.log(error);
      }
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Registers (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Category TEXT, Username TEXT, Password TEXT, Website TEXT, Comments TEXT)",
      [],
      () => {},
      (error) => {
        console.log(error);
      }
    );
  });
};

export const dropDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DROP TABLE IF EXISTS Configs",
      [],
      () => {
        console.log("tablas eliminadas");
      },
      (error) => {
        console.log(error);
      }
    );
  });
};

export const fetchDatabase = (dbName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * from ${dbName}`,
        [],
        (tx, result) => {
          const rows = result.rows;
          let data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          // console.log(data)
          resolve(data);
        },
        (error) => {
          console.log(error);
          reject(error); // Rechazamos la promesa en caso de error
        }
      );
    });
  });
}

export const populateDb = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT COUNT(*) as count FROM Configs",
      [],
      (tx, result) => {
        const rowCount = result.rows.item(0).count;
        if(rowCount === 0){
          const insertQuery =  'INSERT INTO Configs (option, value) VALUES (?,?)'
          const defaultData = [
            ['dataUser','' ],
            ['selfDestruction', 'false'],
            ['tries', 0],
            ['mode', 'light'],
            ['email', ''],
            ['notify', 'false'],
          ]
          defaultData.forEach((data) => {
            tx.executeSql(insertQuery, data, null, (error)=>{
              console.log('error al insertar los datos', error)
            })
          })
        }
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export const saveToDatabase = (wordToHash) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Configs SET value=? WHERE option=?",
      [wordToHash, 'dataUser'],
      () => {
        console.log('Hash created succesfully') 
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export const saveRegisters = (newRegister) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Registers (Title, Category, Username, Password, Website, Comments) VALUES (?,?,?,?,?,?)',
        [newRegister.title, newRegister.category, newRegister.userName, newRegister.password, newRegister.website, newRegister.comments],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};
