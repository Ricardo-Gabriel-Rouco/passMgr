import {
  ScrollView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  // KeyboardAvoidingScrollView,
  // Platform,
} from "react-native";

// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view'
import React from "react";

const NewRegister = () => {
  const [loginData, setLoginData] = React.useState({
    title: "",
    category: "",
    userName: "",
    password: "",
    website: "",
    comments: "",
  });

  return (
    <KeyboardAvoidingScrollView

    >
      <ScrollView contentContainerStyle={style.container} keyboardShouldPersistTaps="handled">
        <Text>Title</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, title: newValue })
          }
          defaultValue={loginData.title}
          style={style.input}
        />
        <Text>Category</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, category: newValue })
          }
          defaultValue={loginData.category}
          style={style.input}
        />
        <Text>User Name or Email</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, userName: newValue })
          }
          defaultValue={loginData.userName}
          style={style.input}
        />
        <Text>Password</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, password: newValue })
          }
          defaultValue={loginData.password}
          style={style.input}
        />
        <Text>Website</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, website: newValue })
          }
          defaultValue={loginData.website}
          style={style.input}
        />
        <Text>comments</Text>
        <TextInput
          onChangeText={(newValue) =>
            setLoginData({ ...loginData, comments: newValue })
          }
          defaultValue={loginData.comments}
          style={style.input}
        />
        <Button
          title="Save"
          onPress={() => {}}
        />
      </ScrollView>
    </KeyboardAvoidingScrollView>
  );
};

export default NewRegister;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // marginBottom: 2,
    flexGrow: 1,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
