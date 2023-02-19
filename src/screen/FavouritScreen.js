import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
  PermissionsAndroid,
} from "react-native";
import { colors } from "../constants/theme";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouritScreen = () => {
  //getuser
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem("user");
    const admin = await AsyncStorage.getItem("admin");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    } else if (admin) {
      setUserDetails(JSON.parse(admin));
    }
  };
  const logout = () => {
    AsyncStorage.setItem(
      "user",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("dangki");
    setUserDetails("");
  };

  //image picker
  const [galleryPhoto, setgalleryPhoto] = useState("");
  const [imagepk, setimagepk] = useState("");
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setgalleryPhoto(galleryStatus.status === "granted");
    })();
  }, []);
  //end
  const [ListDL, setlistDL] = useState([]);
  useEffect(() => {
    getlistDL();
  }, []);
  const [isVisible, setisVisible] = useState(false);
  const handldeCreate = () => {
    setisVisible(!isVisible);
    clearForm();
  };
  //create a new
  const [title, settitle] = useState("");
  const [location, setlocation] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [getid, setgetId] = useState(null);

  const handlesave = () => {
    if (getid == null) {
      fetch("https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          location: location,
          image: image,
          decreptions: description,
        }),

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res + "result creater sussec");
          getlistDL(res);
          setisVisible(!isVisible);
          clearForm();
          console.log(image + "LOAD");
        })
        .catch((err) => {
          console.log(err + "error");
        });
    } else {
      fetch("https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich/" + getid, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          location: location,
          image: image,
          decreptions: description,
        }),

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res + "result creater sussec");
          getlistDL(res);
          setisVisible(!isVisible);
          clearForm();
        })
        .catch((err) => {
          console.log(err + "error");
        });
    }
  };
  const clearForm = () => {
    setdescription("");
    settitle("");
    setlocation("");
    setimage("");
    setgetId(null);
    setimagepk("");
  };

  //end create

  //edit

  const handleEdit = (item) => {
    setgetId(item.id);
    settitle(item.title);
    setdescription(item.decreptions);
    setimage(item.image);
    setlocation(item.location);
    setisVisible(!isVisible);
  };

  //
  const getlistDL = () => {
    fetch("https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("success");
        var response = res;
        setlistDL(response);
      })
      .catch((err) => {
        console.log(err);
      });
    //oke
    //    axios.get('https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich').then((res) => {
    //         console.log(res);
    //          var response = res.data;
    //             setlistDL(response)
    //     }).catch(err => {
    //             console.log(err)
    //         });
  };
  const handleRemove = (item) => {
    fetch("https://63ea15a7811db3d7ef063f49.mockapi.io/dl/dulich/" + item.id, {
      method: "DELETE",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res + "result" + item.id);
        getlistDL(res);
      })
      .catch((err) => {
        console.log(err + "error");
      });
  };
  //open gallery

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setimagepk(result.assets[0].uri);

      console.log("AAA" + imagepk);
      setimage(imagepk);
      console.log("BB" + image);
    }
  };

  // end

  const renderAdmin =
    userDetails?.fullname === "ADMIN" ? (
      <LinearGradient colors={["#E3FDF5", "#FFE6FA"]} style={styles.container}>
        <Modal visible={isVisible}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
              borderBottomWidth: 2,
            }}
          >
            <Text style={{ color: colors.gray }}>NEW PLACE</Text>
            <TouchableOpacity onPress={handldeCreate}>
              <Text style={{ color: colors.red, fontWeight: "800" }}>
                CLOSE PAGE
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <Text>Tiêu đề</Text>
            <TextInput
              placeholder="title"
              style={styles.textinput}
              value={title}
              onChangeText={(text) => {
                settitle(text);
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <Text>Vị trí</Text>
            <TextInput
              placeholder="location"
              style={styles.textinput}
              value={location}
              onChangeText={(text) => {
                setlocation(text);
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <Text>miêu tả</Text>
            <TextInput
              placeholder="decresption"
              style={styles.textinput}
              value={description}
              onChangeText={(text) => {
                setdescription(text);
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 10, marginTop: 20 }}>
            <Text>hình ảnh</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="image"
                style={[styles.textinput, { width: 150 }]}
                value={image}
                //   blurOnSubmit={true}
                onChangeText={(text) => {
                  setimage(image);
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  openGallery();
                }}
              >
                <Text style={{ color: colors.red }}>upload</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <Button onPress={handlesave} title="save" />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {imagepk && (
              <Image
                style={{ width: 200, height: 200 }}
                source={{ uri: imagepk }}
              />
            )}
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            backgroundColor: colors.green,
            padding: 5,
            margin: 10,
            borderWidth: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            handldeCreate();
          }}
        >
          <Text style={{ color: colors.red }}>create </Text>
        </TouchableOpacity>

        {
          ListDL.length > 0 ? (
            <ScrollView style={styles.paddingHorizontal}>
              {ListDL.map((item, index) => {
                return (
                  <View key={index} style={styles.item}>
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: "cover",
                        borderRadius: 50,
                        marginRight: 10,
                      }}
                      source={{ uri: item.image }}
                    />
                    <View>
                      <Text style={{ fontWeight: "bold", color: colors.red }}>
                        id: {item.id}
                      </Text>
                      <Text style={{ fontWeight: "700" }}>
                        tiêu đề: {item.title}
                      </Text>
                      <Text style={{ fontWeight: "bold", color: colors.cyan }}>
                        vị trí: {item.location}
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontWeight: "300",
                          color: colors.gray,
                          overflow: "hidden",
                          width: 150,
                          letterSpacing: 0.8,
                        }}
                      >
                        miêu tả: {item.decreptions}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => handleRemove(item)}>
                        <Text style={{ color: colors.red }}>delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleEdit(item)}>
                        <Text style={{ color: colors.lightGray }}>edit</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 250,
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          )
          //loanding du lieu
        }
      </LinearGradient>
    ) : (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        <Text>Just admin see page</Text>
      </View>
    );

  return <View>{renderAdmin}</View>;
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  scrowview: {
    paddingHorizontal: 10,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textinput: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.green,
    marginTop: 10,
  },
  btncontainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
  },
});
export default FavouritScreen;
