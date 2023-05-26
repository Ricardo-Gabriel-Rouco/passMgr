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
import * as SQlite from 'expo-sqlite'

const db = SQlite.openDatabase("MainDb.db");

function Main({ route, navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Registers',
        [],
        (tx, result) => {
          const rows = result.rows;
          const newData = [];

          for (let i = 0; i < rows.length; i++) {
            newData.push(rows.item(i));
          }

          setData(newData);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  };


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
