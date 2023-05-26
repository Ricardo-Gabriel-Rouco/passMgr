import React from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
const Detail = ({ route }) => {
  return <View>
    <Text>{route.params.Password}</Text>

  </View>;
};

export default Detail;
