import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
// import * as SQLite from "expo-sqlite";
import {
  createTable,
  // dropDatabase,
  fetchDatabase,
  populateDb,
  saveToDatabase,
} from "../../components/dbFunctions/dbFunctions";

const Home = ({ navigation }) => {
  // const db = SQLite.openDatabase("MainDb.db");

  const [config, setConfig] = useState({
    dataUser: "",
    selfDestruction: false,
    tries: 0,
    mode: "light",
    email: "",
    notify: false,
  });

  useEffect(() => {
    createTable();
    populateDb();
    // dropDatabase()
    fetchDatabase("Configs")
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
      })
      .catch((error) => {
        console.log("Error al obtener los datos de la base de datos:", error);
      });
  }, []);

  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const firstLogin = () => {
    if (loginData.name.length === 0 || loginData.password.length === 0) {
      Alert.alert("Faltan datos");
    } else {
      const wordToHash = loginData.name + loginData.password;
      saveToDatabase(wordToHash);
      Alert.alert("Welcome Aboard");
      navigation.navigate("Passwords", {
        name: config.dataUser,
      });
      setLoginData({ name: "", password: "" });
    }
  };

  const logIn = () => {
    const credentials = loginData.name + loginData.password;
    if (config.dataUser === credentials) {
      navigation.navigate("Passwords", {
        name: config.dataUser,
      });
      setLoginData({ name: "", password: "" });
    } else {
      Alert.alert("Incorrect credentials");
    }
  };

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
