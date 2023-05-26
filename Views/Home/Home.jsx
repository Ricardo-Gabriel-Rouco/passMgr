import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React from "react";
import * as SQLite from "expo-sqlite";
import {
  createTable,
  dropDatabase,
  fetchDatabase,
  populateDb,
  saveToDatabase
} from "../../components/dbFunctions/dbFunctions";

const Home = ({ navigation }) => {
  const db = SQLite.openDatabase("MainDb.db");

  const [config, setConfig] = React.useState({
    dataUser: "",
    selfDestruction: false,
    tries: 0,
    mode: "light",
    email: "",
    notify: false,
  });

  React.useEffect(() => {
    createTable();
    populateDb();
    // dropDatabase()
    fetchDatabase()
      .then((data) => {
        const updatedConfig = {
          dataUser: data.find((item) => item.option === "dataUser").value,
          selfDestruction: data.find(
            (item) => item.option === "selfDestruction"
          ).value,
          tries: parseInt(data.find((item) => item.option === "tries").value),
          mode: data.find((item) => item.option === "mode").value,
          email: data.find((item) => item.option === "email").value,
          notify: data.find((item) => item.option === "notify").value,
        };
        setConfig({ ...updatedConfig });
        console.log(config)
      })
      .catch((error) => {
        console.log("Error al obtener los datos de la base de datos:", error);
      });
  }, []);

  const [loginData, setLoginData] = React.useState({
    name: "",
    password: "",
  });

  const firstLogin = () => {
    if (loginData.name.length === 0 || loginData.password.length === 0) {
      Alert.alert("Faltan datos");
    } else {
      const wordToHash = loginData.name + loginData.password;
      saveToDatabase(wordToHash)
      Alert.alert('Welcome Aboard')
      navigation.navigate("Passwords", {
        name: config.dataUser,
      });
    }
  };

  const logIn = () => {
    const credentials = loginData.name + loginData.password
    if(config.dataUser === credentials){
      navigation.navigate("Passwords", {
        name: config.dataUser,
      });
    } else {
      Alert.alert('Incorrect credentials')
    }
  }

  if (!config.dataUser) {
    return (
      <View style={style.container}>
        <Text style={style.title}>Configure Credentials</Text>
        <Text>Name</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, name: newValue })
          }
          defaultValue={loginData.name}
          style={style.input}
        />
        <Text>Password</Text>
        <TextInput
          defaultValue={loginData.password}
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, password: newValue })
          }
          style={style.input}
        />
        <Button
          title="Log In"
          onPress={() => {
            firstLogin();
          }}
        />
      </View>
    );
  } else {
    return (

      <View style={style.container}>
        <Text style={style.title}>Login</Text>
        <Text>Name</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, name: newValue })
          }
          defaultValue={loginData.name}
          style={style.input}
        />
        <Text>Password</Text>
        <TextInput
          defaultValue={loginData.password}
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, password: newValue })
          }
          style={style.input}
        />
        <Button
          title="Log In"
          onPress={() => {
            logIn();
          }}
        />
      </View>
    );
  }
};

export default Home;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// const createTable = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS Configs (ID INTEGER PRIMARY KEY AUTOINCREMENT, option TEXT, value TEXT )",
//       [],
//       () => {
//         console.log("tablas creadas");
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   });
//   db.transaction((tx) => {
//     tx.executeSql(
//       "CREATE TABLE IF NOT EXISTS Registers (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title TEXT, Category TEXT, Username TEXT, Password TEXT, Website TEXT, Comments TEXT)",
//       [],
//       () => {
//         console.log("tablas creadas");
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   });
// };

// const dropDatabase = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "DROP TABLE IF EXISTS Users",
//       [],
//       () => {
//         console.log("tablas eliminadas");
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   });
// };

// const fetchDatabase = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "SELECT * from Configs",
//       [],
//       (tx, result) => {
//         const rows = result.rows
//         let data = [];
//         for (let i = 0; i < rows.length; i++) {
//           data.push(rows.item(i));
//         }
//         setConfig({...config, data})
//         console.log(config)
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   });
// }

// db.transaction((tx) => {
//   tx.executeSql(
//     "INSERT INTO Users (Name, Password) VALUES (?, ?)",
//     [loginData.name, loginData.password],
//     () => {
//       // Éxito
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// });
