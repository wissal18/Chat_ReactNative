import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import initfirebase from "../../config";
import * as ImagePicker from "expo-image-picker";
export default function Profile() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [pseudos, setPseudos] = useState("");
  const storage = initfirebase.storage();
  const database = initfirebase.database();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("Get", uri, true);
      xhr.send(null);
    });
    return blob;
  };
  const uploadImage = async (uri) => {
    // convert image to blob
    const blob = await imageToBlob(uri);
    // save blob to reference image
    const ref_img = storage.ref().child("imageprofiles").child("image2.jpg");
    await ref_img.put(blob);
    // get url
    const url = await ref_img.getDownloadURL();
    return url;
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.titre}>Profile</Text>
        <TouchableOpacity
          onPress={async () => {
            await pickImage();
          }}
        >
          <Image
            source={
              image === null
                ? require("../../assets/profil.png")
                : { uri: image }
            }
            style={{
              width: 130,
              height: 130,
              borderRadius: 63,
              borderWidth: 4,
              borderColor: "white",
              marginBottom: 10,
              alignSelf: "center",

              marginTop: 20,
            }}
          ></Image>
        </TouchableOpacity>
        <TextInput
          style={styles.TextInput}
          placeholder="firstname"
          onChangeText={(text) => {
            setFirstName(text);
          }}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder="lastname"
          onChangeText={(text) => {
            setLastName(text);
          }}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder="pseudos"
          onChangeText={(text) => {
            setPseudos(text);
          }}
        ></TextInput>
        <Button
          title={"save"}
          style={styles.button}
          onPress={async () => {
            try {
              if (image != null) {
                const url = await uploadImage(image);
                const ref_profils = database.ref("profils");
                const key = ref_profils.push().key;
                ref_profils.child("profil" + key).set({
                  prenom: firstName,
                  nom: lastName,
                  pseudos: pseudos,
                  uri: url,
                });
              }
            } catch (e) {
              alert(e);
            }
          }}
        ></Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    textAlign: "center",
    borderRadius: 5,
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    marginTop: 20,
    width: 250,
    alignSelf: "center",
  },
  titre: {
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#a03",
    textAlign: "center",
  },
  container: {
    flex: 1,
    //backgroundColor: "#DBD3D8",
     alignItems:"center",
    justifyContent: "flex-start",
  },
  button: {
    width: "50%",
    borderRadius: 5,
    backgroundColor: "#e38b73",
    height: 40,
    width: 100,
    justifyContent: "center",
    marginTop: 80,
    alignSelf: "center",
  },
});
