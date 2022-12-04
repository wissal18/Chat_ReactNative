import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import initfirebase from "../config";

export default function Auth(props) {
  const [email, setEmail] = useState("wissallamouchi@gmail.com");
  const [pwd, setPwd] = useState("1234567");
  const auth = initfirebase.auth();
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
            Authentification
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
            style={styles.textinput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPwd(text);
            }}
          ></TextInput>
          <Button
            onPress={() => {
              if (email.length > 0 && email.includes("@")) {
                if (pwd.length > 5) {
                  auth
                    .signInWithEmailAndPassword(email, pwd)
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
            <Text
              onPress={() => {
                props.navigation.navigate("signup");
              }}
              style={{ color: "white" }}
            >
              Create new user !
            </Text>
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
