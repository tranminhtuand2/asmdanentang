import React from "react";
import { View,StyleSheet,Text } from "react-native";
import { sizes, spacing } from "../constants/theme";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from "./Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Mainheader = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
   //getuser
        const [userDetails, setUserDetails] = React.useState();
            React.useEffect(() => { 
                  getUserDetails();
    },[])
    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };
    const logout = () => {
        AsyncStorage.setItem("user", JSON.stringify({ ...userDetails, loggedIn: false }));
      navigation.navigate('dangki')
      setUserDetails("");
   }



    ///
    return (
        <View style={[styles.container, { marginTop: insets.top }]}>
            <Icon icon="Hamburger" onPress={() => {logout()}}/>
            <Text style={styles.title}>{userDetails?.fullname}</Text>
             <Icon icon="Notification" onPress={() => {}}/>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
  },
});

export default Mainheader;