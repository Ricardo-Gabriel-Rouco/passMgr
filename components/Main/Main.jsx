import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchDatabase } from "../dbFunctions/dbFunctions";

function Main({ route, navigation }) {
  const [registers, setRegisters] = useState([]);

    useEffect(() => {
      fetchDatabase('Registers')
        .then((data) => {
          setRegisters(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  return (
    <View style={style.container}>
      <Text style={style.title}>Hola {route.params.name}</Text>
      <Button
        title="Create new"
        onPress={() => navigation.navigate("NewRegister")}
      />
      {registers ? (
        <FlatList
          data={registers}
          keyExtractor={(item) => item.ID.toString()} // Agregar keyExtractor para evitar advertencias de clave única
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", { password: item.Password })
              }
            >
              <Text style={style.item}>
                {item.ID} {item.Username}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No Registers yet...!</Text>
      )}
    </View>
  );
}

export default Main;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 30,
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 45,
  },
});
