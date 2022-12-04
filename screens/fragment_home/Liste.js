import { View, Text, StyleSheet, FlatList, Image, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import initfirebase from "../../config";

export default function Liste(props) {
  const [data, setData] = useState([]);
  const database = initfirebase.database();
  const ref_profils = database.ref("profils");

  useEffect(() => {
    ref_profils.on("value", (dataSnapshot) => {
      let d = [];
      dataSnapshot.forEach((profil) => {
        d.push(profil.val());
      });
      setData(d);
    });

    return () => {
      ref_profils.off();
    };
  }, []);
  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
    <View style={styles.container}>
      <Text style={{ color: "#47a", fontWeight: "bold", fontSize: 34,textAlign:"center" }}>
        Liste de profils
      </Text>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.viewitem}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                }}
              ></Image>
              <Text
                style={{ fontSize: 22, fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("chat");
                }}
              >
                {item.pseudos}
              </Text>
              <Text>{" " + item.nom + " "}</Text>
              <Text>{item.prenom}</Text>
            </View>
          );
        }}
        style={{ width: "100%", height: "100%" }}
      ></FlatList>
    </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItemes: "center",
    //justifyContent: "flex-start",
  },
  viewitem: {
    flexDirection: "row",
    height: 65,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
