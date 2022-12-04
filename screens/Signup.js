import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {ImageBackground,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import initfirebase from "../config";
export default function Signup(props) {
  const auth = initfirebase.auth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwdC, setPwdC] = useState("");
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View
        style={{
          height: 300,
          width: "90%",
          backgroundColor: "#0005",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          SignUp
        </Text>
        <TextInput
          onChangeText={(text) => {
            setEmail(text);
          }}
          keyboardType="email-address"
          placeholder="mai@site.com"
          style={styles.textinput}
        ></TextInput>
        <TextInput
          onChangeText={(text) => {
            setPwd(text);
          }}
          style={styles.textinput}
          placeholder="Password"
          secureTextEntry={true}
        ></TextInput>
        <TextInput
          onChangeText={(text) => {
            setPwdC(text);
          }}
          style={styles.textinput}
          placeholder="Confirm Password"
          secureTextEntry={true}
        ></TextInput>
        <Button
          onPress={() => {
            if (email.length > 0 && email.includes("@")) {
              if (pwd.length > 5 && pwdC == pwd) {
                auth
                  .createUserWithEmailAndPassword(email, pwd)
                  .then(() => {
                    props.navigation.replace("home");
                  })
                  .catch((err) => {
                    alert(err);
                  });
              }
            } else {
              alert("verifiez vos donnée");
            }
          }}
          title={"Submit"}
        ></Button>
        <TouchableOpacity>
          <Text style={{ color: "white" }}>I have an account !</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  textinput: {
    backgroundColor: "white",
    width: "90%",
    height: 40,
    textAlign: "center",
    borderRadius: 8,
    margin: 10,
  },
  container: {
    flex: 1,
    //backgroundColor: "#a37",
    alignItems: "center",
    justifyContent: "center",
  },
});
