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
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchDatabase('Registers')
      .then((data) => {
        const allRegisters = {
          title: data.title,
          category: data.category,
          userName: data.userName,
          password: data.password,
          email: data.email,
          website: data.website,
          comments: data.comments
        };
        setData({ ...allRegisters });
        
      })
      .catch((error) => {
        console.log(error)
      });
      },[])


  return (
    <View style={style.container}>
      <Text style={style.title}>Hola {route.params.name}</Text>
      <Button title="Create new" onPress={()=>navigation.navigate('New Register')} />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('Details', {Password: item.Password})}>
            <Text style={style.item}>{item.ID} {item.Name}</Text>
          </TouchableOpacity>
        )}
      />
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
