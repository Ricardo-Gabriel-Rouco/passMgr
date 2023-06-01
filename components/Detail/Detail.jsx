import React from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { deleteRegister } from "../dbFunctions/dbFunctions";
const Detail = ({ route, navigation }) => {
  const id = route.params.ID;

  const deleteRegisterFromDB = () => {
    Alert.alert("You are going to delete a Register");
    deleteRegister(1)
      .then((result) => {
        console.log("Registro eliminado correctamente");
      })
      .catch((error) => {
        console.log("Error al eliminar el registro:", error);
      });
    navigation.goBack();
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Title</Text>
      <Text style={style.item}>{route.params.item.Title}</Text>
      <Text style={style.title}>Username</Text>
      <Text style={style.item}>{route.params.item.Username}</Text>
      <Text style={style.title}>Password</Text>
      <Text style={style.item}>{route.params.item.Password}</Text>
      <Text style={style.title}>Category</Text>
      <Text style={style.item}>{route.params.item.Category}</Text>
      <Text style={style.title}>Website</Text>
      <Text style={style.item}>{route.params.item.Website}</Text>
      <Text style={style.title}>Comments</Text>
      <Text style={style.item}>{route.params.item.Comments}</Text>
      <Button title="Edit" onPress={() => {}} />
      <Button
        title="Delete"
        onPress={() => {
          deleteRegisterFromDB();
        }}
      />
    </View>
  );
};

export default Detail;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    alignItems: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 25,
  },
  item: {
    padding: 10,
    fontSize: 20,
    height: 45,
  },
});
